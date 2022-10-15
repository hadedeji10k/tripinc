import { useState, useEffect } from "react";
import { Spin } from "antd";
import "antd/dist/antd.min.css";
// import AccountPage from './AccountPage'
import PersonalInfoPage from "./PersonalInfoPage/PersonalInfoPage";
import AccountPage from "./AccountPage/AccountPage";
import ProfileTopBar from "./ProfileTopBar/ProfileTopBar";
import BankingPage from "./BankingPage/BankingPage";
import BookingsPage from "./BookingsPage/BookingsPage";
import Wallet from "./WalletPage/WalletPage";
import HelpCenterPage from "./HelpCenterPage/HelpCenterPage";

import {
  checkForInterestStateOfClass,
  getFullUserProfile,
  localGetUserId,
  symbolHelper,
} from "../../utils/helpers";
import {
  getAllCategories,
  getUserPreferences,
  getUserPlacesVisited,
  getUserPlacesWishToVisit,
  getUserInterests,
  getUserConsents,
} from "../../api";
import { IFormattedCategory, IPlaces } from "../../api/interfaces";
import { Link } from "react-router-dom";
import { isAmbassador } from "../../utils/helpers";

const menuBarData = [
  {
    id: 1,
    state: true,
    title: "Personal Info",
    slug: "personal_info",
  },
  {
    id: 2,
    state: false,
    title: "Account",
    slug: "account",
  },
  {
    id: 3,
    state: false,
    title: "Bookings",
    slug: "bookings",
  },
  {
    id: 4,
    state: false,
    title: "Wallet",
    slug: "wallet",
  },
  {
    id: 5,
    state: false,
    title: "Banking",
    slug: "banking",
  },
  {
    id: 6,
    state: false,
    title: "Help Centre",
    slug: "help_centre",
  },
];

const Profile = (): any => {
  const [menuBar, setMenuBar] = useState(menuBarData);
  const [fullUserProfile, setFullUserProfile] = useState<any>(null);
  const [userPreferenceData, setUserPreferenceData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId] = useState<number | null>(() => localGetUserId());

  const [isUserAmbassador, setIsUserAmbassador] = useState(false);

  // All interests
  const [interestData, setInterestData] = useState<IFormattedCategory[]>([]);

  // User Interests
  const [userInterests, setUserInterests] = useState<any[]>([]);

  // User visited places
  const [placesVisited, setPlacesVisited] = useState<IPlaces[]>([]);

  // User wish to visit places
  const [wishToVisitPlaces, setWishToVisitPlaces] = useState<IPlaces[]>([]);

  // User consents
  const [userConsents, setUserConsents] = useState<any>({});

  // const authContext = useContext(AuthContext);

  useEffect(() => {
    localGetUserId() ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, []);

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      getFullUserProfile().then((res) => {
        setFullUserProfile(res);
        console.log(res);
        setIsUserAmbassador(
          res.roles
            ? res?.roles
                .map((item) => item.toLowerCase())
                .includes("ambassador")
            : false
        );

        getUserPreferences(userId).then((response) => {
          setUserPreferenceData(response.data);

          getUserInterests(userId).then((interestResponse) => {
            setUserInterests(interestResponse.data.items);

            // get all categories (interests)
            getAllCategories().then((res) => {
              const arrayToPush: any = [];
              // loop through the response categories and push the category name and the icon into the array to be used in the preference data
              for (let i = 0; i < res.data.length; i++) {
                const element = res.data[i];
                const data = {
                  id: element.id,
                  title: element.name,
                  symbol: symbolHelper(element.name),
                  stateOfClass: checkForInterestStateOfClass(
                    interestResponse.data.items,
                    element.id
                  ),
                };
                arrayToPush.push(data);
              }
              setInterestData(arrayToPush);

              // get user places visited
              getUserPlacesVisited(userId).then((res) => {
                setPlacesVisited(res.data.items);

                getUserConsents(userId).then((userConsents) => {
                  setUserConsents(userConsents.data);
                  console.log(userConsents.data);
                });

                // get user places wish to visit
                getUserPlacesWishToVisit(userId).then((result) => {
                  setWishToVisitPlaces(result.data.items);
                  setIsLoading(false);
                });
              });
            });
          });
        });
      });
    }
  }, [userId]);

  let data = menuBar.filter((item) => item.state === true);

  return (
    <>
      <Spin spinning={isLoading} size="large">
        {/* {!fullUserProfile ? ( */}
        {!isLoggedIn ? (
          <div
            style={{
              alignItems: "center",
              margin: "auto",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <br />
            <br />
            <br />
            <br />
            <br />
            <h3>You must sign in before you can access this page</h3>
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        ) : !fullUserProfile ? (
          <>
            <br />
            <br />
            <br />
            <br />
            <br />
            <Spin spinning={isLoading} size="large"></Spin>
            <br />
            <br />
            <br />
            <br />
            <br />
          </>
        ) : (
          <>
            <ProfileTopBar
              menuBar={menuBar}
              setMenuBar={setMenuBar}
              userProfile={fullUserProfile}
              userId={userId}
            />
            <div className="ambassador_banner my-3">
              {fullUserProfile?.emailVerified ? (
                <>
                  {/* <p className="my-1 me-2">
                    Do you want to see your trip planner's application status?
                  </p>
                  <p className="my-1">
                    <Link to={"/ambassador-application/edit"}>Click here</Link>
                  </p> */}
                  <p className="my-1 me-2">
                    Do you wish to apply as a trip planner?
                  </p>
                  <p className="my-1">
                    <Link to={"/ambassador-application/new"}>Click here</Link>
                  </p>
                </>
              ) : (
                <>
                  <p className="my-1 me-2">
                    Do you wish to apply as a trip planner?
                  </p>
                  <p className="my-1">
                    <Link to={"/ambassador-application/new"}>Click here</Link>
                  </p>
                </>
              )}
            </div>

            {isUserAmbassador ? (
              <div className="ambassador_banner my-3">
                <p className="my-1 me-2">Go to Ambassador's Dashboard</p>
                <p className="my-1">
                  <Link to={"/ambassador"}>Click here</Link>
                </p>
              </div>
            ) : null}

            {data[0].slug === "personal_info" ? (
              <PersonalInfoPage
                userProfile={fullUserProfile}
                userPreference={userPreferenceData}
                interestData={interestData}
                setInterestData={setInterestData}
                placesVisited={placesVisited}
                setPlacesVisited={setPlacesVisited}
                wishToVisitPlaces={wishToVisitPlaces}
                setWishToVisitPlaces={setWishToVisitPlaces}
                userInterests={userInterests}
              />
            ) : data[0].slug === "account" ? (
              <AccountPage
                userPreference={userPreferenceData}
                userConsents={userConsents}
              />
            ) : data[0].slug === "bookings" ? (
              <BookingsPage />
            ) : data[0].slug === "wallet" ? (
              <Wallet />
            ) : data[0].slug === "banking" ? (
              <BankingPage />
            ) : data[0].slug === "help_centre" ? (
              <HelpCenterPage />
            ) : (
              <></>
            )}
          </>
        )}
      </Spin>
    </>
  );
};

export default Profile;
