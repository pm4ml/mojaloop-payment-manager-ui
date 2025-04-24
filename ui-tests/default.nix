# Want to update dependencies? Go to https://github.com/NixOS/nixpkgs/tree/nixpkgs-unstable and
# replace the commit ref in the following line with the one you're interested in (probably the
# latest).
{ pkgs ? import (fetchTarball https://github.com/NixOS/nixpkgs/archive/23.11.tar.gz) {
    config = {
      allowUnfree = true;
      allowUnsupportedSystem = true;
      allowBroken = true;
      chromium = {
        enableWideVine = false;
      };
    };
  }
}:

let
  # @TODO - If for checking ARM64
  k3d = pkgs.writeShellScriptBin "k3d" ''
    exec ${pkgs.fetchurl {
      url = if pkgs.stdenv.isAarch64 then
        "https://github.com/k3d-io/k3d/releases/download/v5.6.0/k3d-darwin-arm64"
      else
        "https://github.com/k3d-io/k3d/releases/download/v5.6.0/k3d-darwin-amd64";
      sha256 = if pkgs.stdenv.isAarch64 then
        "c0S7tBts7WZ9OEMQdjk0c7W81HxEYHaF+YgYUAhk+AI="
      else
        "0c1e7712b8b63771d3c8c5cbd32da10bded3fd3f89240380bb08c44ff608f345";
    }} "$@"
  '';

in

[
  pkgs.firefox
  pkgs.kubeconform
  pkgs.kustomize
  pkgs.kubectl
  pkgs.nodejs-16_x
  pkgs.minikube
  k3d
  pkgs.skaffold
]
