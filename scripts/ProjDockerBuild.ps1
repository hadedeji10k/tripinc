param(
	[Parameter(Position=0,Mandatory=$true)][String]$TpiProjKey
)
$ErrorActionPreference="Stop";

#determine the path where this script was launched from
[String]$TpiInvocationPath = Split-Path $MyInvocation.MyCommand.Path;

$TpiParams = & "$($TpiInvocationPath)/__TenantParams.ps1";

$TpiVersion = & "$($($TpiInvocationPath))/TripIncVersion.ps1";

$TpiProjHome = $TpiParams[$TpiProjKey]._ProjHome;
$TpiProjHomeIntermediate = if ([String]::IsNullOrWhitespace($TpiProjHome)) { ""; } else { "/$($TpiProjHome)"; };

$TpiProjPath = $TpiParams[$TpiProjKey]._ProjPath;
$TpiProjPathIntermediate = if ([String]::IsNullOrWhitespace($TpiProjPath)) { ""; } else { "/$($TpiProjPath)"; };

# $TpiBuildRoot = "$(${env:TRIPINC_PROJDIR})$($TpiProjHomeIntermediate)";
# $TpiDockerFile = "$($TpiBuildRoot)$($TpiProjPathIntermediate)/Dockerfile";

$TpiBuildRoot = "$(${env:TRIPINC_PROJDIR})$($TpiProjHomeIntermediate)";
$TpiDockerFile = "$($TpiBuildRoot)$($TpiProjPathIntermediate)/Dockerfile";

$TpiProjName = $TpiParams[$TpiProjKey]._ProjName;
$TpiImageName = "$($TpiProjName.ToLower()):$($TpiVersion)";
$TpiRepoImageName = "$($TpiParams.EcrName)/$($TpiImageName)";

docker build $TpiBuildRoot --file $TpiDockerFile --build-arg NugetPassword=${env:NugetPassword} --tag $TpiImageName;

docker tag $TpiImageName $TpiRepoImageName;
