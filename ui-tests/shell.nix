# Want to update dependencies? Go to https://github.com/NixOS/nixpkgs/tree/nixpkgs-unstable and
# replace the commit ref in the following line with the one you're interested in (probably the
# latest).
{ nixpkgs ? import (fetchTarball https://github.com/NixOS/nixpkgs/archive/22.11.tar.gz) {
    config = {
      allowUnfree = true;
      allowUnsupportedSystem = true;
      allowBroken = true;
      allowUnfreePredicate = pkg: builtins.elem (nixpkgs.lib.getName pkg) [
        "chromium"
      ];
    };
  }
}:
nixpkgs.mkShell {
  nativeBuildInputs = import ./default.nix { pkgs = nixpkgs; };
}
