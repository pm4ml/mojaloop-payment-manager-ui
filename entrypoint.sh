# #!/bin/sh

# # Log environment variables to verify they're being passed correctly
# echo "REACT_APP_COUNTRY_LOGO: $REACT_APP_COUNTRY_LOGO"
# echo "REACT_APP_SUBTITLE: $REACT_APP_SUBTITLE"
# echo "REACT_APP_PRIMARY_COLOR: $REACT_APP_PRIMARY_COLOR"
# echo "REACT_APP_SECONDARY_COLOR: $REACT_APP_SECONDARY_COLOR"
# echo "REACT_APP_ACCENT_COLOR: $REACT_APP_ACCENT_COLOR"
# # echo "REACT_APP_VERSION: $REACT_APP_VERSION"
# # echo "REACT_APP_COMMIT: $REACT_APP_COMMIT"

# # Ensure the target directory exists
# mkdir -p /app

# # Write the environment variables to the .env file in the correct directory
# cat <<EOF > /app/.env
# REACT_APP_COUNTRY_LOGO=$REACT_APP_COUNTRY_LOGO
# REACT_APP_SUBTITLE=$REACT_APP_SUBTITLE
# REACT_APP_PRIMARY_COLOR=$REACT_APP_PRIMARY_COLOR
# REACT_APP_SECONDARY_COLOR=$REACT_APP_SECONDARY_COLOR
# REACT_APP_ACCENT_COLOR=$REACT_APP_ACCENT_COLOR

# EOF
# # REACT_APP_VERSION=$REACT_APP_VERSION
# # REACT_APP_COMMIT=$REACT_APP_COMMIT
# # #log the .env file
# # echo "Generated .env file:"
# # cat /app/.env
# # Start the app
# exec "$@"

# method 2

#!/bin/sh

# Log environment variables for debugging
echo "Environment Variables:"
echo "REACT_APP_COUNTRY_LOGO: $REACT_APP_COUNTRY_LOGO"
echo "REACT_APP_SUBTITLE: $REACT_APP_SUBTITLE"
echo "REACT_APP_PRIMARY_COLOR: $REACT_APP_PRIMARY_COLOR"
echo "REACT_APP_SECONDARY_COLOR: $REACT_APP_SECONDARY_COLOR"
echo "REACT_APP_ACCENT_COLOR: $REACT_APP_ACCENT_COLOR"

# Create the .env file
cat <<EOF > /app/.env
REACT_APP_COUNTRY_LOGO=$REACT_APP_COUNTRY_LOGO
REACT_APP_SUBTITLE=$REACT_APP_SUBTITLE
REACT_APP_PRIMARY_COLOR=$REACT_APP_PRIMARY_COLOR
REACT_APP_SECONDARY_COLOR=$REACT_APP_SECONDARY_COLOR
REACT_APP_ACCENT_COLOR=$REACT_APP_ACCENT_COLOR
SKIP_PREFLIGHT_CHECK=true
EOF

# Log the .env file contents
echo "Generated .env file:"
cat /app/.env

# Generate the SCSS file using the node script
node /app/generate-env-scss.js

# Start the application
exec "$@"
