#!/bin/bash

# Function to display usage instructions
usage() {
  echo "Usage: $0 -t <TEMPLATE_FILE> -c <CONFIG_FILE> -p <AWS_PROFILE>"
  exit 1
}

# Parsing command line arguments
while getopts ":t:c:p:" opt; do
  case $opt in
    t) TEMPLATE_FILE="$OPTARG"
    ;;
    c) CONFIG_FILE="$OPTARG"
    ;;
    p) AWS_PROFILE="$OPTARG"
    ;;
    *) usage
    ;;
  esac
done

# Check if all arguments were provided
if [ -z "$TEMPLATE_FILE" ] || [ -z "$CONFIG_FILE" ] || [ -z "$AWS_PROFILE" ]; then
  usage
fi

# Run SAM build and deploy commands with AWS profile
sam build -t "$TEMPLATE_FILE" -s .
sam deploy --config-file "$CONFIG_FILE" --no-confirm-changeset --no-fail-on-empty-changeset --profile "$AWS_PROFILE"
