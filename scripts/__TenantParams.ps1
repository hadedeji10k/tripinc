$TpiParams = @{
	AwsAccountId = "068012186896";
	AwsRegion = "eu-west-2";
	
	EksName = "tripinc-01";
	EksContext = "iam-root-account@tripinc-01.eu-west-2.eksctl.io";

	K8sNamespace = @{
		Prod = "planner-prod";
		Test = "planner-test";
	};

	# UI
	TripAdmin = @{
		_ProjName = "Web2-TripAdmin";
		_ProjPath = "";
		_ProjHome = "";

		DnsHost = @{
			Prod = @("admin.tripinc.co");
			Test = @("test-admin.tripinc.co");
		};
 
		SvcName = "tripadmin";
	};

	Traveler = @{
		_ProjName = "Web2-Traveler";
		_ProjPath = "";
		_ProjHome = "";

		DnsHost = @{
			Prod = @("tripinc.co","www.tripinc.co");
			Test = @("test-www.tripinc.co");
		};
 
		SvcName = "traveler";
	};

	AngularAdmin = @{
		_ProjName = "Angular-Admin";
		_ProjPath = "Angular13/projects/admin";
		_ProjHome = "";

		DnsHost = @{
			Test = @("angular-admin.tripinc.co");
		};
 
		SvcName = "angularadmin";
	};

	AngularFrontend = @{
		_ProjName = "Angular-Frontend";
		_ProjPath = "Angular13/projects/portal";
		_ProjHome = "";

		DnsHost = @{
			Test = @("angular-frontend.tripinc.co");
		};
 
		SvcName = "angularfrontend";
	};

	# MicroService
	Onboarding = @{
		_ProjName = "TripInc.Onboarding.Api";
		_ProjPath = "TripInc.Onboarding.Api";
		_ProjHome = "";

		DnsHost = @{
			Prod = @("onboarding.tripinc.co");
			Test = @("test-onboarding.tripinc.co");
		};
 
		SvcName = "onboarding";
	};

	Planning = @{
		_ProjName = "TripInc.Planning.Api";
		_ProjPath = "TripInc.Planning.Api";
		_ProjHome = "";

		DnsHost = @{
			Prod = @("planning.tripinc.co");
			Test = @("test-planning.tripinc.co");
		};
 
		SvcName = "planning";
	};

	TripService = @{
		_ProjName = "TripInc.TripService.Api";
		_ProjPath = "TripInc.TripService.Api";
		_ProjHome = "";

		DnsHost = @{
			Prod = @("tripservice.tripinc.co");
			Test = @("test-tripservice.tripinc.co");
		};

		HasUpload = $true;
 
		SvcName = "tripservice";
	};

	UserSecurity = @{
		_ProjName = "TripInc.UserSecurity.API";
		_ProjPath = "TripInc.UserSecurity.API";
		_ProjHome = "";

		DnsHost = @{
			Prod = @("usersecurity.tripinc.co");
			Test = @("test-usersecurity.tripinc.co");
		};
 
		SvcName = "usersecurity";
	};
};

$TpiParams.EcrName = "$($TpiParams.AwsAccountId).dkr.ecr.$($TpiParams.AwsRegion).amazonaws.com"

return $TpiParams;
