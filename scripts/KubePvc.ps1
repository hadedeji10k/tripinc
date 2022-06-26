param(
	[Parameter(Position=0,Mandatory=$true)][String]$KubeSvcName,
	[Parameter(Position=1,Mandatory=$true)][String]$KubeNamespaceName
)
$ErrorActionPreference = "Stop"; # Continue, Inquire, Stop

#determine the path where this script was launched from
[String]$KubeInvocationPath = Split-Path $MyInvocation.MyCommand.Path;

$KubePvcName = "$($KubeSvcName)-volume-claim";
$KubePvcObject = (kubectl get pvc --namespace $KubeNamespaceName --output='json' | ConvertFrom-Json).items | Where-Object { $_.metadata.name -eq $KubePvcName };

if ($KubePvcObject -eq $null)
{
"apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: $($KubePvcName)
spec:
  accessModes:
  - ReadWriteOnce # ReadWriteOncePod, ReadWriteOnce, ReadOnlyMany, ReadWriteMany
  storageClassName: gp2-retain
  resources:
    requests:
      storage: 8Gi" | kubectl apply --namespace $KubeNamespaceName -f -;
}

return;
