param(
  [Parameter(Mandatory = $true)]
  [string]$TemplateFile,

  [Parameter(Mandatory = $true)]
  [string]$ConfigFile,

  [Parameter(Mandatory = $true)]
  [string]$AwsProfile
)

# Run SAM build and deploy commands with AWS profile
sam build -t "$TemplateFile" -s .
sam deploy --config-file "$ConfigFile" --no-confirm-changeset --no-fail-on-empty-changeset --profile "$AwsProfile"
