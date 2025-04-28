#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

# Change to the directory containing this script
cd "$(dirname "$0")"

# Install test dependencies
cd ../tests
npm ci
mkdir -p /tmp/test-results

# Run tests
PM4ML_ENDPOINT="http://127.0.0.1:8083" npm run test:headless || true

# Archive test report
cp report.html /tmp/test-results/test-report.html || true