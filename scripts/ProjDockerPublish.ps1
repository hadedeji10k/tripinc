param(
	[Parameter(Position=0,Mandatory=$true)][String]$TpiProjKey,
	[Parameter(Position=1)][String]$TpiVersion=$null
)
$ErrorActionPreference="Stop";

#determine the path where this script was launched from
[String]$TpiInvocationPath = Split-Path $MyInvocation.MyCommand.Path;

$TpiParams = & "$($TpiInvocationPath)/__TenantParams.ps1";

if ([String]::IsNullOrWhitespace($TpiVersion))
{
	$TpiVersion = & "$($TpiInvocationPath)/TripIncVersion.ps1";
}

$TpiProjName = $TpiParams[$TpiProjKey]._ProjName;
$TpiImageName = "$($TpiProjName.ToLower()):$($TpiVersion)";
$TpiRepoImageName = "$($TpiParams.EcrName)/$($TpiImageName)";

$TpiRepoImageCheck = docker image ls --quiet $TpiRepoImageName;

if ([String]::IsNullOrWhitespace($TpiRepoImageCheck))
{
	& "$($TpiInvocationPath)/ProjDockerBuild.ps1" $TpiProjKey; 
}

Write-Host "Deploying application artifacts [$($TpiImageName)] to ecr [$($TpiParams.EcrName)]";
Write-Host;

# connect to Container Registry for push
aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin $TpiParams.EcrName;

docker push $TpiRepoImageName;
