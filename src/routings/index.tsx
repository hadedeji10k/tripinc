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
import PlanTrip from "../components/CustomTripPlanning/PlanTrip/PlanTrip";
import SetBudget from "../components/CustomTripPlanning/SetBudget/SetBudget";
import TripInterest from "../components/CustomTripPlanning/TripInterest/TripInterest";
import MyTrip from "../components/MyTripPage/MyTrip";
import AddCard from "../components/Profile/BankingPage/AddCard/AddCard";
// import ExploreCategoryPage from "../components/ExploreCategory/ExploreCategoryPage";
import Orders from "../components/Shopping/OrdersPage";
import ShoppingCartPage from "../components/ShoppingCartPage";

// import AuthVerify from "../pages/AuthVerify";
import MainLayout from "../pages";
import SocialBasicDetails from "../components/Auth/SocialBasicDetails/SocialBasicDetails";
import RequireAuth from "../pages/RequiredAuth";
import VerifyAccount from "../components/VerifyAccount/VerifyAccount";
import PageNotFound from "../components/PageNotFound/PageNotFound";
import TripPlanning from "../components/TripPlanning";

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/basic-details" element={<BasicDetails />} />
          <Route
            path="/social-basic-details"
            element={<SocialBasicDetails />}
          />
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
          <Route path="/custom-plan-trip" element={<PlanTrip />} />
          <Route path="/set-budget" element={<SetBudget />} />
          <Route path="/trip-interest" element={<TripInterest />} />
          <Route path="/shopping/cart" element={<ShoppingCartPage />} />
          <Route
            path="/shopping/order/:orderId"
            element={
              <RequireAuth>
                <Shopping />
              </RequireAuth>
            }
          />
          <Route
            path="/orders"
            element={
              <RequireAuth>
                <Orders />
              </RequireAuth>
            }
          />
          <Route path="/plan-trip" element={<TripPlanning />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        {/* </Route> */}
      </Routes>
    </>
  );
};

export default MainRoute;
