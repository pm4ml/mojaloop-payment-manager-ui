#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

# Change to the directory containing this script
cd "$(dirname "$0")"
# Set Chrome Binary Path
export CHROME_BIN=/usr/bin/google-chrome
export CHROME_PATH=/usr/bin/
export BROWSER_TCAFE=chrome:headless
export DISPLAY=:99
Xvfb :99 -screen 0 1024x768x16 &

# Install required tools
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg

# Add Docker's official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Add Chrome repository
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | sudo tee /etc/apt/sources.list.d/google-chrome.list

# Update package lists
sudo apt-get update

# Install packages
sudo apt-get install -y yarn google-chrome-stable xvfb dbus-x11 fonts-freefont-ttf fonts-noto git docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
yarn --version
docker-compose --version

npm ci
mkdir -p /tmp/test-results

git clone https://github.com/Ujjwal-Izyane/on-premise-deploy-fx
cd on-premise-deploy-fx
git checkout 74346ad
cd docker-compose
env PM4ML_ENABLED=true docker-compose --profile portal up -d

# change directory to project root
cd $CIRCLE_WORKING_DIRECTORY
yarn install
echo "Current directory: $(pwd)"
ls -la
echo "Checking package.json..."
if [ -f "package.json" ]; then
    echo "package.json found"
    cat package.json
else
    echo "package.json not found in current directory"
    exit 1
fi
# run payment manager in background with logs redirected
export NODE_OPTIONS=--openssl-legacy-provider
yarn start > /tmp/app.log 2>&1 &
ps -ef | grep node

# Wait for application to be ready
echo "Waiting for application to start..."
sleep 10
echo "Verifying API is fully responsive..."
tail -n 50 /tmp/app.log
# grep IP from the log file that 8083 is listening on
IP=$(grep -oP 'Project is running at \K[^ ]+' /tmp/app.log | sed 's/\/$//')
echo "IP: $IP"
# Check if the API is responsive
if ! curl -s -f http://$IP:8083/transfers > /dev/null; then
    echo "API is not responding properly"
    tail -n 50 /tmp/app.log
    # exit 1
fi


# Install test dependencies
ls -l
cd ui-tests/tests
ls -l
yarn install
cd $CIRCLE_WORKING_DIRECTORY

yarn test:integration
# stop payment manager
# ps aux | grep "node" | grep -v grep | awk '{print $2}' | xargs kill -9
# stop all docker
ls -l
cd on-premise-deploy-fx/docker-compose
ls -l
docker-compose ps
docker-compose --profile portal down

# Run tests
PM4ML_ENDPOINT="http://127.0.0.1:8083" npm run test:headless || true

# Archive test report
cp report.html /tmp/test-results/test-report.html || true