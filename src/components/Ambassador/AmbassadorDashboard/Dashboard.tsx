import { useState, useEffect } from "react";
import styled from "styled-components";
import { Spin } from "antd";
import { getAdminDashboard } from "../../../api";
import { IAdminDashboard } from "../../../api/interfaces";
import RecentTripsTable from "./RecentTripsTable";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dashboard, setDashboard] = useState<IAdminDashboard>();

  useEffect(() => {
    setIsLoading(true);
    getAdminDashboard().then((res) => {
      console.log(res.data);
      setDashboard(res.data);
      setIsLoading(false);
    });
  }, []);

  // totalBookings
  //   completedBooking
  // pendingBooking
  // totalTrips
  // totalWishlists
  // customEvents
  // totalFeedback

  return (
    <Spin spinning={isLoading} size="large">
      <div style={{ width: "100%", maxWidth: "100%" }}>
        <h2 className="extra_large_title fs-2 mb-2 mt-3">My Dashboard</h2>
        <div className="row mb-4">
          <span className=""> Joined 23rd July, 2022</span>
        </div>
        <div className="row">
          <div className="col-xl-6 col-sm-12 mb-4">
            <DashboardCard>
              <div>
                <h3 className="medium_title fs-4">
                  {dashboard?.totalBookings}
                </h3>
                <h3 className="medium_title fs-5">Total Bookings</h3>
              </div>
            </DashboardCard>
          </div>
          <div className="col-xl-6 col-sm-12 mb-4">
            <DashboardCard>
              <div>
                <h3 className="medium_title fs-4">
                  {dashboard?.completedBooking}
                </h3>
                <h3 className="medium_title fs-5">Completed Booking</h3>
              </div>
            </DashboardCard>
          </div>
          <div className="col-xl-6 col-sm-12 mb-4">
            <DashboardCard>
              <div>
                <h3 className="medium_title fs-4">
                  {dashboard?.pendingBooking}
                </h3>
                <h3 className="medium_title fs-5">Pending Booking</h3>
              </div>
            </DashboardCard>
          </div>
          <div className="col-xl-6 col-sm-12 mb-4">
            <DashboardCard>
              <div>
                <h3 className="medium_title fs-4">{dashboard?.totalTrips}</h3>
                <h3 className="medium_title fs-5">Total Trips</h3>
              </div>
            </DashboardCard>
          </div>
          <div className="col-xl-6 col-sm-12 mb-4">
            <DashboardCard>
              <div>
                <h3 className="medium_title fs-4">
                  {dashboard?.totalWishlists}
                </h3>
                <h3 className="medium_title fs-5">Total Wishlists</h3>
              </div>
            </DashboardCard>
          </div>
          <div className="col-xl-6 col-sm-12 mb-4">
            <DashboardCard>
              <div>
                <h3 className="medium_title fs-4">{dashboard?.customEvents}</h3>
                <h3 className="medium_title fs-5">Custom Events</h3>
              </div>
            </DashboardCard>
          </div>
          <div className="col-xl-6 col-sm-12 mb-4">
            <DashboardCard>
              <div>
                <h3 className="medium_title fs-4">
                  {dashboard?.totalFeedback}
                </h3>
                <h3 className="medium_title fs-5">Total Feedback</h3>
              </div>
            </DashboardCard>
          </div>
        </div>

        <br />
        <h2 className="large_title fs-4 mb-2">Recent Trips</h2>
        <div className="" style={{ width: "100%", maxWidth: "100%", overflowX: "auto" }}>
          <RecentTripsTable props={dashboard ? dashboard?.recentTrips : []} />
        </div>
        <br />
      </div>
    </Spin>
  );
};

export default Dashboard;

const DashboardCard = styled.div`
  background: #f2f2f2;
  border-radius: 20px;
  padding: 3.5rem 1.5rem 1.5rem;
`;
