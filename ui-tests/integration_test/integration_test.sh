#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

# # Change to the directory containing this script
cd "$(dirname "$0")"

# Install test dependencies
cd ../tests
npm ci

# Run tests
PAYMENT_MANAGER_ENDPOINT="http://127.0.0.1:3000" npm run test:headless

# Archive test report
cp report.html /path/to/artifacts/test-report.html