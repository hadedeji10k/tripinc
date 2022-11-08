param(
	[Parameter(Position=0,Mandatory=$true)][String]$TpiProjKey
)
$ErrorActionPreference="Stop";

#determine the path where this script was launched from
[String]$TpiInvocationPath = Split-Path $MyInvocation.MyCommand.Path;

$TpiParams = & "$($TpiInvocationPath)/__TenantParams.ps1";

$TpiVersion = & "$($($TpiInvocationPath))/TripIncVersion.ps1";

# Write-Host "$TpiInvocationPath/..";

$TpiBuildRoot = $(Resolve-Path "$TpiInvocationPath/..").Path;

Write-Host "TpiBuildRoot - $TpiBuildRoot";

$TpiProjPath = $TpiParams[$TpiProjKey]._ProjPath;
$TpiProjPathIntermediate = if ([String]::IsNullOrWhitespace($TpiProjPath)) { ""; } else { "/$($TpiProjPath)"; };

$TpiDockerFile = "$($TpiBuildRoot)$($TpiProjPathIntermediate)/Dockerfile";

Write-Host "TpiDockerFile - $TpiDockerFile";

$TpiProjName = $TpiParams[$TpiProjKey]._ProjName;
$TpiImageName = "$($TpiProjName.ToLower()):$($TpiVersion)";
$TpiRepoImageName = "$($TpiParams.EcrName)/$($TpiImageName)";

docker build $TpiBuildRoot --file $TpiDockerFile --build-arg NugetPassword=${env:NugetPassword} --tag $TpiImageName;

docker tag $TpiImageName $TpiRepoImageName;

return;
