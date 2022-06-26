param(
	[Parameter(Position=0,Mandatory=$true)][String]$TpiProjKey,
	[Parameter(Position=1)][String]$TpiVersion=$null,
	[Switch]$TpiIsTesting,
	[Switch]$TpiPushBuild,
	[Switch]$TpiUpdateSettings
)
$ErrorActionPreference = "Stop"; # Continue, Inquire, Stop

#determine the path where this script was launched from
[String]$TpiInvocationPath = Split-Path $MyInvocation.MyCommand.Path;

$TpiParams = & "$($TpiInvocationPath)/__TenantParams.ps1";

if ([String]::IsNullOrWhitespace($TpiVersion))
{
	$TpiVersion = & "$($TpiInvocationPath)/TripIncVersion.ps1";
}

################Push to ECR first
if ($TpiPushBuild)
{
	& "$($TpiInvocationPath)/ProjDockerPublish.ps1" $TpiProjKey $TpiVersion;
}

###############Set resource names
$TpiProjName = $TpiParams[$TpiProjKey]._ProjName;
$TpiImageName = "$($TpiProjName.ToLower()):$($TpiVersion)";
$TpiRepoImageName = "$($TpiParams.EcrName)/$($TpiImageName)";

$TpiSvcName = $TpiParams[$TpiProjKey].SvcName;

###############Switch to the EKS Context
kubectl config use-context $TpiParams.EksContext;

# need to update to test whether or not we the appropriate context defined and if it is current
# aws eks update-kubeconfig --region eu-west-2 --name tripinc-01;

$TpiKubeNamespace = if ($TpiIsTesting -eq $true) { $TpiParams.K8sNamespace.Test; } else { $TpiParams.K8sNamespace.Prod; };

& "$($TpiInvocationPath)/KubeNamespace.ps1" $TpiKubeNamespace;

# ################Deploy $($TpiSvcName)-config
# if ($TpiUpdateSettings)
# {
# 	& "$($TpiInvocationPath)/ProjRuntimeSettings.ps1" $TpiClientCode Release -UseExistingContext;
# }

# kubectl create configmap $($TpiSvcName)-config --namespace $TpiKubeNamespace `
# 	--from-env-file="${env:TRIPINC_RUNTIMECONFIG}/$($TpiClientCode)/docker.release.config.env" `
# 	--output='yaml' --dry-run='client' | kubectl apply --namespace $TpiKubeNamespace -f -;

# kubectl create secret generic $($TpiSvcName)-secret --namespace $TpiKubeNamespace `
# 	--type='Opaque' `
# 	--from-env-file="${env:TRIPINC_RUNTIMECONFIG}/$($TpiClientCode)/docker.release.secret.env" `
# 	--output='yaml' --dry-run='client' | kubectl apply --namespace $TpiKubeNamespace -f -;

& "$($TpiInvocationPath)/KubePvc.ps1" $TpiSvcName $TpiKubeNamespace;

################Deploy $($TpiSvcName)
"apiVersion: apps/v1
kind: Deployment
metadata:
  name: $($TpiSvcName)
spec:
  replicas: 1
  selector:
    matchLabels:
      app: $($TpiSvcName)
  template:
    metadata:
      labels:
        app: $($TpiSvcName)
    spec:
      nodeSelector:
        kubernetes.io/os: linux
        kubernetes.io/arch: amd64
    #   affinity:
    #     podAffinity:
    #       requiredDuringSchedulingIgnoredDuringExecution:
    #       - labelSelector:
    #           matchLabels:
    #             app: redis-cache
    #         topologyKey: kubernetes.io/hostname
      containers:
      - name: $($TpiSvcName)-busybox
        image: busybox:1.34
        command: 
          - /bin/sh
          - '-c'
          - 'while true; do echo hello; sleep 10; done'
      - name: $($TpiSvcName)
        image: $($TpiRepoImageName)
        resources:
          requests:
            cpu: 25m
            memory: 16Mi
          limits:
            cpu: 75m
            memory: 64Mi
        ports:
        - containerPort: 80
        env:
          - name: ASPNETCORE_URLS
            value: 'http://+'
          - name: TRIPINC_LOGROOT
            value: '/applog'
          - name: TRIPINC_RUNTIMECONFIG
            value: '/appconfig/' # '/usr/local/etc/.runtimeconfig/ErpCore/' 
        envFrom:
        # - configMapRef:
        #     name: $($TpiSvcName)-config
        # # - secretRef:
        # #     name: $($TpiSvcName)-secret
        volumeMounts:
        - name: $($TpiSvcName)logvolume
          mountPath: /applog/
        # - name: erpapisecretvolume
        #   mountPath: /usr/share/nginx/html/config/
      volumes:
        - name: $($TpiSvcName)logvolume
          persistentVolumeClaim:
            claimName: $($TpiSvcName)-volume-claim
        # - name: $($TpiSvcName)configvolume
        # #   configMap:
        # #     name: $($TpiSvcName)-config
        # - name: $($TpiSvcName)secretvolume
        #   secret:
        #     secretName: $($TpiSvcName)-secret
---
apiVersion: v1
kind: Service
metadata:
  name: $($TpiSvcName)
spec:
  selector:
    app: $($TpiSvcName)
  type: ClusterIP # ClusterIP, LoadBalancer
  ports:
  - port: 80
    name: http" | kubectl apply --namespace $TpiKubeNamespace -f -;

# kubectl scale deployments/$($TpiSvcName) --namespace $TpiKubeNamespace --replicas=1;
# kubectl delete pod $($TpiSvcName)-54b6497c9d-rvw9p --grace-period=0 --force --namespace $TpiKubeNamespace;

# & "$($TpiInvocationPath)/KubeHpaSetup.ps1" $TpiClientCode "$($TpiSvcName)";

################Ingress with Certificate
$TpiSvcDnsNameList = if ($TpiIsTesting -eq $true) { $TpiParams[$TpiProjKey].DnsHost.Test; } else { $TpiParams[$TpiProjKey].DnsHost.Prod; };

if (-not ($TpiSvcDnsNameList -eq $null))
{
	foreach ($TpiSvcDnsName in $TpiSvcDnsNameList)
	{
		& "$($TpiInvocationPath)/KubeIngressCreateCertMgr.ps1" $TpiKubeNamespace $TpiSvcDnsName $TpiSvcName;
	}
}


Write-Host "Cross-check the work";
Write-Host;
kubectl get service,pod,ingress --namespace $TpiKubeNamespace -o wide; # -w;


return;

# purchasing-api.my-namespace.svc.cluster.local

# kubectl rollout restart deployment name_of_deployment
