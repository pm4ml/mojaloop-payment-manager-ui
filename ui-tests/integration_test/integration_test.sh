#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

# # Change to the directory containing this script
cd "$(dirname "$0")"

# Install test dependencies
cd ../tests
npm ci

# Add on prem deploy before we run the actual integration tests
# checkout payment docker compose

# Start the server in the background
npm run start &
SERVER_PID=$!

# Wait for the server to be ready
echo "Waiting for server to start..."
until curl -s http://127.0.0.1:3000 > /dev/null; do
    sleep 1
done
echo "Server is up and running!"

# Run tests
PM4ML_ENDPOINT="http://127.0.0.1:8083" npm run test:headless

# Clean up - kill the background server process
kill $SERVER_PID

# Archive test report
mkdir -p /tmp/test-results
cp report.html /tmp/test-results/test-report.html