import { Routes, Route } from "react-router-dom";

// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import Footer from "../components/Footer/Footer";
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
// import ExploreCategoryPage from "../components/ExploreCategory/ExploreCategoryPage";
import Orders from "../components/Shopping/OrdersPage";
import ShoppingCartPage from "../components/ShoppingCartPage";

// import AuthVerify from "../pages/AuthVerify";
import MainLayout from "../pages";
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

const MainRoute: React.FC = () => {
  return (
    <>
      <Routes>
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
          <Route path="*" element={<PageNotFound />} />
        </Route>
        {/* </Route> */}
      </Routes>
    </>
  );
};

export default MainRoute;
