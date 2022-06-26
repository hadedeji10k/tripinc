param(
	[Parameter(Position=0,Mandatory=$true)][String]$KubeNamespaceName
)
$ErrorActionPreference = "Stop"; # Continue, Inquire, Stop

#determine the path where this script was launched from
[String]$KubeInvocationPath = Split-Path $MyInvocation.MyCommand.Path;

################Kube Namespace
$KubeNamespaceObject = (kubectl get namespace --output='json' | ConvertFrom-Json).items | Where-Object { $_.metadata.name -eq $KubeNamespaceName };

if ($KubeNamespaceObject -eq $null)
{
	kubectl create namespace $KubeNamespaceName;
}

return;
