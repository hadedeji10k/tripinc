import { Routes, Route } from "react-router-dom";
import { MainLayout, AmbassadorLayout } from "../pages";

import Signup from "../components/Auth/SignUp";
import Signin from "../components/Auth/SignIn";
import BasicDetails from "../components/Auth/BasicDetails/BasicDetails";
import Preferences from "../components/Preferences";
import Profile from "../components/Profile";
import ExplorePage from "../components/Explore/ExplorePage";
import ExploreDetails from "../components/ExploreDetails/ExploreDetails";
import BucketListPage from "../components/BucketList/BucketListPage";
import Shopping from "../components/Shopping";
import LandingPage from "../components/LandingPage/LandingPage";
import MyTrip from "../components/MyTripPage/MyTrip";
import AddCard from "../components/Profile/BankingPage/AddCard/AddCard";
import Orders from "../components/Shopping/OrdersPage";
import ShoppingCartPage from "../components/ShoppingCartPage";

// import AuthVerify from "../pages/AuthVerify";
import SocialBasicDetails from "../components/Auth/SocialBasicDetails/SocialBasicDetails";
import RequireAuth from "../pages/RequiredAuth";
import VerifyAccount from "../components/AccountVerification/VerifyAccount/VerifyAccount";
import PageNotFound from "../components/PageNotFound/PageNotFound";
import TripPlanning from "../components/TripPlanning";
import SuccessfulPayment from "../components/Shopping/SuccessfulPayment/index";
import AccountVerified from "../components/AccountVerification/AccountVerified/index";
import ForgotPassword from "../components/Auth/ForgotPassword";
import CustomTripPlanning from "../components/CustomTripPlanning";
import TripView from "../components/MyTripPage/TripView";
import CreateAttraction from "../components/Attraction/Attraction";
import AmbassadorApplication from "../components/Attraction/AmbassadorApplication";
import Dashboard from "../components/Ambassador/AmbassadorDashboard/Dashboard";
import AmbassadorAttraction from "../components/Ambassador/AmbassadorAttraction/AmbassadorAttraction";
import AmbassadorTrip from "../components/Ambassador/AmbassadorTrip/AmbassadorTrip";
import AdminAmbassadorApplication from "../components/Ambassador/Admin/AdminAmbassadorApplication";
import TripPlannerApplications from "../components/Ambassador/Admin/TripPlannerApplications";

const MainRoute: React.FC = () => {
  return (
    <>
      <Routes>
        {/* MAIN ROUTES */}
        <Route element={<MainLayout />}>
          {/* <Route element={<AuthVerify />}> */}
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/explore" element={<ExplorePage />} /> */}
          {/* <Route
            path="/explore/category/new/:catNameParam"
            element={<ExploreCategoryPage />}
          /> */}
          <Route path="/explore" element={<ExplorePage />}>
            <Route path="city/:cityParam" element={<ExplorePage />} />
            <Route path="category/:catNameParam" element={<ExplorePage />} />
          </Route>

          <Route
            path="/my-trips"
            element={
              <RequireAuth>
                <MyTrip />
              </RequireAuth>
            }
          />
          <Route
            path="/my-trips/:tripId"
            element={
              <RequireAuth>
                <TripView />
              </RequireAuth>
            }
          />
          <Route
            path="/bucket-list"
            element={
              <RequireAuth>
                <BucketListPage />
              </RequireAuth>
            }
          />
          <Route
            path="/verify-account"
            element={
              <RequireAuth>
                <VerifyAccount />
              </RequireAuth>
            }
          />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/basic-details" element={<BasicDetails />} />
          <Route
            path="/social-basic-details"
            element={<SocialBasicDetails />}
          />
          <Route path="/account-activation" element={<AccountVerified />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/profile/add-card" element={<AddCard />} />
          {/* <Route path="/explore-details/:id" element={<ExploreDetails />} /> */}
          <Route path="/explore-details">
            <Route path="tour/:tourId" element={<ExploreDetails />} />
            <Route
              path="attraction/:attractionId"
              element={<ExploreDetails />}
            />
          </Route>
          <Route path="/custom-plan-trip" element={<CustomTripPlanning />} />
          <Route path="/shopping/cart" element={<ShoppingCartPage />} />
          <Route
            path="/shopping/order/:orderId"
            element={
              <RequireAuth>
                <Shopping />
              </RequireAuth>
            }
          />
          <Route path="/successful-payment" element={<SuccessfulPayment />} />
          <Route
            path="/orders"
            element={
              <RequireAuth>
                <Orders />
              </RequireAuth>
            }
          />
          <Route path="/plan-trip/:tripId" element={<TripPlanning />} />
          <Route path="/create-attraction" element={<CreateAttraction />} />
          <Route
            path="/ambassador-application"
            element={<AmbassadorApplication />}
          />

          <Route path="*" element={<PageNotFound />} />
        </Route>

        {/* AMBASSADOR ROUTES */}
        <Route element={<AmbassadorLayout />}>
          <Route path="/ambassador" element={<Dashboard />} />
          <Route
            path="/ambassador/attractions"
            element={<AmbassadorAttraction />}
          />
          <Route
            path="/ambassador/attractions/new"
            element={<CreateAttraction />}
          />
          <Route
            path="/admin/trip-planners"
            element={<TripPlannerApplications />}
          />
          <Route
            path="/admin/trip-planners/:formId"
            element={<AdminAmbassadorApplication />}
          />
          <Route path="/ambassador/trips" element={<AmbassadorTrip />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainRoute;
