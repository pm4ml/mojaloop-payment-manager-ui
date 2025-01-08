# FROM node:16.14.2-alpine3.14
# # First part, build the app
# WORKDIR /app
# COPY package.json yarn.lock ./
# RUN yarn install
# COPY ./ ./

# # Specifies the api base URL
# ARG API_BASE_URL
# ENV API_BASE_URL=$API_BASE_URL

# # Adds the package version and commit hash
# ARG REACT_APP_VERSION
# ENV REACT_APP_VERSION=$REACT_APP_VERSION

# # Exposes the commit in the build
# ARG REACT_APP_COMMIT
# ENV REACT_APP_COMMIT=$REACT_APP_COMMIT

# RUN yarn run build

# # Second part, copy the build and server the app using a node express server

# RUN cp -r /app/build /app/server/

# COPY entrypoint.sh /app/server/entrypoint.sh
# RUN chmod +x /app/server/entrypoint.sh

# WORKDIR /app/server
# RUN npm install

# EXPOSE 3000

# CMD [ "npm", "start" ]

#method 2

# Use a lightweight Node.js base image
FROM node:16.14.2-alpine3.14

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock for dependency installation
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the application source code
COPY ./ ./

# Build the React app
ARG API_BASE_URL
ENV API_BASE_URL=$API_BASE_URL

RUN yarn run build

# Copy the build files to a new directory
RUN cp -r /app/build /app/server/

# Set up the entrypoint script
COPY entrypoint.sh /app/entrypoint.sh

# Verify the entrypoint script was copied
RUN echo "Contents of entrypoint.sh:" && cat /app/entrypoint.sh && ls -l /app/entrypoint.sh

RUN chmod +x /app/entrypoint.sh

# Move to the server directory
WORKDIR /app/server

# Install server dependencies
RUN npm install

# Expose the application port
EXPOSE 3000

# Set the entrypoint script to dynamically create .env and start the app
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["npm", "start"]

