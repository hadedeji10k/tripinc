import { Fragment, FunctionComponent, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import { MainLayout, AmbassadorLayout } from "../pages";

import RequireAuth from "pages/RequiredAuth";

const Signup = lazy(() => import("components/Auth/SignUp"));
const Signin = lazy(() => import("components/Auth/SignIn"));
const BasicDetails = lazy(() => import("components/Auth/BasicDetails/BasicDetails"));
const Preferences = lazy(() => import("components/Preferences"));
const Profile = lazy(() => import("components/Profile"));
const ExplorePage = lazy(() => import("components/Explore/ExplorePage"));
const ExploreDetails = lazy(() => import("components/ExploreDetails/ExploreDetails"));
const BucketListPage = lazy(() => import("components/BucketList/BucketListPage"));
const Shopping = lazy(() => import("components/Shopping"));
const LandingPage = lazy(() => import("components/LandingPage/LandingPage"));
const MyTrip = lazy(() => import("components/MyTripPage/MyTrip"));
// const AddCard = lazy(() => import("components/Profile/BankingPage/AddCard/AddCard"));
const Orders = lazy(() => import("components/Shopping/OrdersPage"));
const ShoppingCartPage = lazy(() => import("components/ShoppingCartPage"));

// import AuthVerify from "../pages/AuthVerify"));
const SocialBasicDetails = lazy(() => import("components/Auth/SocialBasicDetails/SocialBasicDetails"));
const VerifyAccount = lazy(() => import("components/AccountVerification/VerifyAccount/VerifyAccount"));
const PageNotFound = lazy(() => import("components/PageNotFound/PageNotFound"));
const TripPlanning = lazy(() => import("components/TripPlanning"));
const SuccessfulPayment = lazy(() => import("components/Shopping/SuccessfulPayment/index"));
const AccountVerified = lazy(() => import("components/AccountVerification/AccountVerified/index"));
const ForgotPassword = lazy(() => import("components/Auth/ForgotPassword"));
const CustomTripPlanning = lazy(() => import("components/CustomTripPlanning"));
const TripView = lazy(() => import("components/MyTripPage/TripView"));
const CreateAttraction = lazy(() => import("components/Attraction/Attraction"));
const AmbassadorApplication = lazy(() => import("components/Ambassador/AmbassadorApplication/AmbassadorApplication"));
const Dashboard = lazy(() => import("components/Ambassador/AmbassadorDashboard/Dashboard"));
const AmbassadorAttraction = lazy(() => import("components/Ambassador/AmbassadorAttraction/AmbassadorAttraction"));
const AmbassadorTrip = lazy(() => import("components/Ambassador/AmbassadorTrip/AmbassadorTrip"));
const AdminAmbassadorApplication = lazy(() => import("components/Ambassador/Admin/AdminAmbassadorApplication"));
const TripPlannerApplications = lazy(() => import("components/Ambassador/Admin/TripPlannerApplications"));
const NewDashboard = lazy(() => import("components/Dashboard/Dashboard"));
const ChatComponent = lazy(() => import("components/Chat"));
const AboutUs = lazy(() => import("components/AboutUs/AboutUs"));
const ContactUs = lazy(() => import("components/ContactUs/ContactUs"));


const MainRoute: FunctionComponent = () => {
	return (
		<Fragment>
			<Routes>
				{/* MAIN ROUTES */}
				<Route element={<MainLayout />}>
				<Route path="*" element={<PageNotFound />} />
				<Route path="/" element={<LandingPage />} />
				<Route path="/about-us" element={<AboutUs />} />
				<Route path="/contact-us" element={<ContactUs />} />
				<Route path="/explore" element={<ExplorePage />}>
					<Route path="city/:cityParam" element={<ExplorePage />} />
					<Route path="category/:catNameParam" element={<ExplorePage />} />
				</Route>
				<Route path="/explore-details">
					<Route path="tour/:tourId" element={<ExploreDetails />} />
					<Route
					path="attraction/:attractionId"
					element={<ExploreDetails />}
					/>
				</Route>
				<Route path="/sign-up" element={<Signup />} />
				<Route path="/sign-in" element={<Signin />} />
				<Route path="/reset-password" element={<ForgotPassword />} />
				<Route path="/basic-details" element={<BasicDetails />} />
				<Route
					path="/social-basic-details"
					element={<SocialBasicDetails />}
				/>
				<Route path="/account-activation" element={<AccountVerified />} />
				{/* <Route path="/new-dashboard" element={<NewDashboard />} /> */}

				{/* <Route path="/profile/add-card" element={<AddCard />} /> */}

				{/* Authenticated route */}
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

				<Route
					path="/profile"
					element={
					<RequireAuth>
						<Profile />
					</RequireAuth>
					}
				/>

				<Route
					path="/preferences"
					element={
					<RequireAuth>
						<Preferences />
					</RequireAuth>
					}
				/>

				<Route
					path="/custom-plan-trip"
					element={
					<RequireAuth>
						<CustomTripPlanning />
					</RequireAuth>
					}
				/>
				<Route
					path="/shopping/cart"
					element={
					<RequireAuth>
						<ShoppingCartPage />
					</RequireAuth>
					}
				/>
				<Route
					path="/shopping/order/:orderId"
					element={
					<RequireAuth>
						<Shopping />
					</RequireAuth>
					}
				/>
				<Route
					path="/successful-payment"
					element={
					<RequireAuth>
						<SuccessfulPayment />
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
				<Route
					path="/plan-trip/:tripId"
					element={
					<RequireAuth>
						<TripPlanning />
					</RequireAuth>
					}
				/>

				<Route
					path="/ambassador-application/:type"
					element={
					<RequireAuth>
						<AmbassadorApplication />
					</RequireAuth>
					}
				/>
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
				<Route path="/ambassador/chat" element={<ChatComponent />} />
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
		</Fragment>
	);
};

export default MainRoute;
