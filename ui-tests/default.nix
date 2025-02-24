# Want to update dependencies? Go to https://github.com/NixOS/nixpkgs/tree/nixpkgs-unstable and
# replace the commit ref in the following line with the one you're interested in (probably the
# latest).
{ nixpkgs ? import (fetchTarball https://github.com/NixOS/nixpkgs/archive/refs/tags/24.05.tar.gz) { config = { allowUnfree = true; }; } }:

let
  k3d = nixpkgs.stdenv.mkDerivation rec {
    version = "5.4.6";  # Updated version
    pname = "k3d";

    src = builtins.fetchurl {
      url = "https://github.com/rancher/k3d/releases/download/v5.4.6/k3d-linux-amd64";  # Updated URL
      sha256 = "8075d40c74c97d2642f15f535cb48d6d6e82df143f528833a193d87caac6a176";
    };

    dontUnpack = true;

    installPhase = ''
      mkdir -p $out/bin
      cp $src $out/bin/k3d
      chmod +x $out/bin/k3d
    '';

    dontFixup = true;
  };

  skaffold = nixpkgs.stdenv.mkDerivation rec {
    version = "2.13.0";  # Updated version
    pname = "skaffold";
    src = builtins.fetchurl {
      url = "https://github.com/GoogleContainerTools/skaffold/releases/download/v2.13.0/skaffold-linux-amd64";  # Updated URL
      sha256 = "14e5545d5d9b69e3eff1fbfacaf5a9f5e8f33ceca4392bceb81eb27c69966c1a";
    };
    dontUnpack = true;
    installPhase = ''
      mkdir -p $out/bin
      cp $src $out/bin/skaffold
      chmod +x $out/bin/skaffold
      '';
  };

in

[
  nixpkgs.google-chrome
  nixpkgs.kubeconform
  nixpkgs.kustomize
  nixpkgs.kubectl
  nixpkgs.nodejs-16_x
  nixpkgs.minikube
  k3d
  skaffold
]
