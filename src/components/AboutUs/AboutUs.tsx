import styled from "styled-components";
import { MdOutlineHouseSiding } from "react-icons/md";
import { CgCommunity } from "react-icons/cg";
import { HiOutlineSupport } from "react-icons/hi";
import { FcDataProtection } from "react-icons/fc";

const AboutUs = () => {
  return (
    <AboutUsContainer>
      <AboutUsDetailsContainer>
        <HeadLineAboutUs>About Us</HeadLineAboutUs>
        <AboutUsDetails>
          TripInc portal (owned by TripInc Limited) is an interactive and easy
          to use online platform, designed to help people find hidden gems
          wherever they are and plan their interest-based trips conveniently,
          all in one place.
        </AboutUsDetails>
      </AboutUsDetailsContainer>

      <AboutUsDetailsContainer>
        <HeadLineAboutUs>Our Mission</HeadLineAboutUs>
        <AboutUsDetails>
          We are on a mission to ignite the explorer in every individual.
        </AboutUsDetails>
      </AboutUsDetailsContainer>

      <AboutUsDetailsContainer>
        <HeadLineAboutUs>Our Proposition</HeadLineAboutUs>
        <AboutUsDetails>
          We are making personalized experiences available at the fingertips of
          all.
        </AboutUsDetails>
      </AboutUsDetailsContainer>

      <AboutUsDetailsContainer>
        <HeadLineAboutUs>Our Vision</HeadLineAboutUs>
        <AboutUsDetails>
          To revolutionize the experiences booking marketplace by bringing
          personalization & convenience to experience seekers.
        </AboutUsDetails>
      </AboutUsDetailsContainer>

      <AboutUsDetailsContainer>
        <HeadLineAboutUs>Our Vision</HeadLineAboutUs>
        <AboutUsDetails>
          To revolutionize the experiences booking marketplace by bringing
          personalization & convenience to experience seekers.
        </AboutUsDetails>
      </AboutUsDetailsContainer>

      <AboutUsDetailsContainer>
        <HeadLineAboutUs id="what_we_do">What we do</HeadLineAboutUs>
        <AboutUsDetails>
          At TripInc Limited, we are obsessed about finding that unique
          experience. We leave no stone unturned in unearthing those hidden gem
          and giving our users flexibility in planning their next trip or
          adventure.
        </AboutUsDetails>
      </AboutUsDetailsContainer>

      <div className="row w-100 justify-content-center mt-4">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <AboutUsCard>
            <AboutUsCardBadge>
              <CgCommunity />
            </AboutUsCardBadge>
            <h4 className="medium_title fs-5 my-2">Community</h4>
            <h3 className="small_title text-center">
              Join our vibrant and welcoming community of #trippers, keen to
              share their advice on itineraries and recommendations.
            </h3>
          </AboutUsCard>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <AboutUsCard>
            <AboutUsCardBadge>
              <HiOutlineSupport />
            </AboutUsCardBadge>
            <h4 className="medium_title fs-5 my-2">24 Hour Support</h4>
            <h3 className="small_title text-center">
              Take advantage of our 24 hour support chat function. You'll get
              help and find answers to questions as soon as they come up.
            </h3>
          </AboutUsCard>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <AboutUsCard>
            <AboutUsCardBadge>
              <MdOutlineHouseSiding />
            </AboutUsCardBadge>
            <h4 className="medium_title fs-5 my-2">
              Growing number of Countries
            </h4>
            <h3 className="small_title text-center">
              Find hidden gems in a number of countries. Please keep an eye out
              as we are constantly expanding
            </h3>
          </AboutUsCard>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <AboutUsCard>
            <AboutUsCardBadge>
              <FcDataProtection />
            </AboutUsCardBadge>
            <h4 className="medium_title fs-5 my-2">Strong Data Protection</h4>
            <h3 className="small_title text-center">
              We will protect your sensitive details with SSL 128-bit
              encryption!
            </h3>
          </AboutUsCard>
        </div>
      </div>
    </AboutUsContainer>
  );
};

export default AboutUs;

const AboutUsContainer = styled.div`
  width: 97%;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  max-width: 97%;
  background-color: #f1f1ff45;
`;

const AboutUsDetailsContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeadLineAboutUs = styled.h2`
  font-family: "Poppins" !important;
  font-style: normal;
  font-weight: 600;
  font-size: calc(1.325rem + 0.9vw) !important;
  line-height: 29px;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #1a405d;
  padding: 10px 15px;
  border-bottom: 4px solid #146961;
`;

const AboutUsCard = styled.div`
  width: 100%;
  background: #f2f2f2;
  border-radius: 20px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AboutUsCardBadge = styled.span`
  display: block;
  font-size: 75px;
  color: #93d4ce;
`;

const AboutUsDetails = styled.p`
  text-align: center;
  max-width: 500px;
`;
