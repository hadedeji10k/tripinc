import React from "react";

const Dashboard = () => {
  return (
    <div>
      <div className="row">
        <div className="col-xl-3 col-sm-6 mb-4">
          <div
            className="card dashboard text-white bg-warning o-hidden h-100 pointer"
            tabIndex={0}
          >
            <div className="card-body">
              <div className="card-body-icon">
                <i className="fa fa-fw fa-calendar-check-o"></i>
              </div>
              <div className="mr-5">
                <h2>16 Pending Attractions</h2>
              </div>
            </div>
            <a
              className="card-footer text-white clearfix small z-1"
              href="/#/ambassador/attractions"
            >
              <span className="float-left">View</span>
              <span className="float-right">
                <i className="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-4">
          <div
            className="card dashboard text-white bg-success o-hidden h-100 pointer"
            tabIndex={0}
          >
            <div className="card-body">
              <div className="card-body-icon">
                <i className="fa fa-fw fa-calendar-check-o"></i>
              </div>
              <div className="mr-5">
                <h2>16 Approved Attractions</h2>
              </div>
            </div>
            <a
              className="card-footer text-white clearfix small z-1"
              href="/#/ambassador/attractions"
            >
              <span className="float-left">View</span>
              <span className="float-right">
                <i className="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-4">
          <div
            className="card dashboard text-white bg-warning o-hidden h-100 pointer"
            tabIndex={0}
          >
            <div className="card-body">
              <div className="card-body-icon">
                <i className="fa fa-fw fa-calendar-check-o"></i>
              </div>
              <div className="mr-5">
                <h2>0 Pending Trip</h2>
              </div>
            </div>
            <a
              className="card-footer text-white clearfix small z-1"
              href="/#/ambassador/trips"
            >
              <span className="float-left">View</span>
              <span className="float-right">
                <i className="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-4">
          <div
            className="card dashboard text-white bg-success o-hidden h-100 pointer"
            tabIndex={0}
          >
            <div className="card-body">
              <div className="card-body-icon">
                <i className="fa fa-fw fa-calendar-check-o"></i>
              </div>
              <div className="mr-5">
                <h2>0 Approved Trip</h2>
              </div>
            </div>
            <a
              className="card-footer text-white clearfix small z-1"
              href="/#/ambassador/trips"
            >
              <span className="float-left">View</span>
              <span className="float-right">
                <i className="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
