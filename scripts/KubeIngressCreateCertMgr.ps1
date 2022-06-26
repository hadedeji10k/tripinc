param(
	[Parameter(Position=0,Mandatory=$true)][String]$KubeNamespaceName,
	[Parameter(Position=1,Mandatory=$true)][String]$KubeDnsHost,
	[Parameter(Position=2,Mandatory=$true)][String]$KubeService
)
$ErrorActionPreference="Stop";

#determine the path where this script was launched from
[String]$KubeInvocationPath = Split-Path $MyInvocation.MyCommand.Path;


################Certificate
"apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: cert-$($KubeService)
spec:
  secretName: cert-$($KubeService)
  issuerRef:
    name: letsencrypt-prod
    kind: ClusterIssuer
  dnsNames:
    - '$($KubeDnsHost)'" | kubectl apply --namespace $KubeNamespaceName -f -;

################Ingress
"apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-$($KubeService)
  annotations:
    kubernetes.io/ingress.class: nginx
    # cert-manager.io/issuer: letsencrypt-prod
    cert-manager.io/cluster-issuer: letsencrypt-prod
    # cert-manager.io/issue-temporary-certificate: 'true'
    # acme.cert-manager.io/http01-edit-in-place: 'true'
    nginx.ingress.kubernetes.io/force-ssl-redirect: 'true'
    nginx.ingress.kubernetes.io/proxy-body-size: 16m
spec:
  # ingressClassName: nginx # was supposed to replace metadata->annotations->kubernetes.io/ingress.class 
  tls: # This section is only required if TLS is to be enabled for the Ingress
  - hosts:
    - $($KubeDnsHost)
    secretName: cert-$($KubeService)
  rules:
  - host: $($KubeDnsHost)
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: $($KubeService)
            port:
              number: 80" | kubectl apply --namespace $KubeNamespaceName -f -;


################Cross-check the work
Write-Host;
Write-Host "Cross-check the work";
Write-Host;
kubectl get Certificate,Secret,Ingress --namespace $KubeNamespaceName;

return;
