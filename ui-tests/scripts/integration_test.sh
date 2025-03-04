#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Clone the repository
git clone https://github.com/pm4ml/mojaloop-payment-manager-ui
cd mojaloop-payment-manager-ui

# Install Nix
curl -L https://nixos.org/nix/install | sh
source ~/.nix-profile/etc/profile.d/nix.sh

# Install dependencies in environment
nix-env -if ui-tests/default.nix

# Validate integration test manifest
kustomize build integration_test | kubeconform -strict -kubernetes-version 1.21.5

# Install dependencies
nix-env -if ui-tests/default.nix

# Install helm
sudo snap install helm --classic

# Start cluster
minikube start --driver=docker --kubernetes-version=v1.21.5

# Add Vault Helm Repo
helm repo add hashicorp https://helm.releases.hashicorp.com

# Install Vault on cluster
helm install vault hashicorp/vault --values ui-tests/manifests/vault/helm-values.yaml

# Wait for kube api server to process and create vault
sleep 60s

# Wait for vault to be initialized
timeout 900 kubectl wait --for=condition=Initialized pod vault-0 --timeout=900s

# Bootstrap Vault
source scripts/bootstrap-vault.sh

# Deploy
skaffold run -p integration-test

# Wait for kube api server to process and create all resources
sleep 30s

# Wait for deployment readiness
timeout 900 kubectl wait --for=condition=Ready pod --all --timeout=900s

# Port-forward the portal frontend ingress
kubectl port-forward -n ingress-nginx --address 0.0.0.0 svc/ingress-nginx-controller 3000:80 &

# Install test dependencies
cd ui-tests/tests
npm ci

# Run tests
PAYMENT_MANAGER_ENDPOINT="http://127.0.0.1:3000" npm run test:headless

# Archive test report
cp report.html /path/to/artifacts/test-report.html

# Print docker containers to check any issues with the cluster
docker ps

# Print resources
kubectl get svc,deploy,sts,pv,pvc,configmap,job,pod -A

# Describe resources
kubectl describe svc,deploy,sts,pv,pvc,configmap,job,pod -A

# Print secret values
kubectl get secrets -o json | jq -r '.items[] | { name: .metadata.name, data: .data | map_values(@base64d) }'