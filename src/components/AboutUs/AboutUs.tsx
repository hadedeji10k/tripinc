import styled from "styled-components";

const AboutUs = () => {
  return (
    <AboutUsContainer>
      <HeadLineAboutUs>About Us</HeadLineAboutUs>
      <p className="text-center">
        TripInc portal (owned by TripInc Limited) is an interactive and easy to
        use online platform, designed to help people find hidden gems wherever
        they are and plan their interest-based trips conveniently, all in one
        place.
      </p>

      <HeadLineAboutUs>Our Mission</HeadLineAboutUs>
      <p className="text-center">
        We are on a mission to ignite the explorer in every individual.
      </p>

      <HeadLineAboutUs>Our Proposition</HeadLineAboutUs>
      <p className="text-center">
        We are making personalized experiences available at the fingertips of
        all.
      </p>

      <HeadLineAboutUs>Our Vision</HeadLineAboutUs>
      <p className="text-center">
        To revolutionize the experiences booking marketplace by bringing
        personalization & convenience to experience seekers.
      </p>

      <HeadLineAboutUs>Our Vision</HeadLineAboutUs>
      <p className="text-center">
        To revolutionize the experiences booking marketplace by bringing
        personalization & convenience to experience seekers.
      </p>

      <HeadLineAboutUs id="what_we_do">What we do</HeadLineAboutUs>
      <p className="text-center">
        At TripInc Limited, we are obsessed about finding that unique
        experience. We leave no stone unturned in unearthing those hidden gem
        and giving our users flexibility in planning their next trip or
        adventure.
      </p>

      <HeadLineAboutUs id="help_center">Help Center</HeadLineAboutUs>
      <p className="text-center mb-1">
        • Call Customer Service: Talk to us over the phone
      </p>
      <p className="mt-0">
        &nbsp; &nbsp; &nbsp; +44 782 388 7160 (Monday to Friday 9am - 7pm)
      </p>

      <p className="text-center mt-3 mb-0">
        • Send an Email: Get in touch with our customer service team
      </p>
      <p className="mt-0">&nbsp; &nbsp; &nbsp; info@tripinc.co</p>

      <p className="text-center mt-3 mb-0">• Message us on WhatsApp</p>
      <p className="mt-0">
        &nbsp; &nbsp; &nbsp; +447823887160 (We currently support chat only)
      </p>
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
  max-width: 500px;
`;

const HeadLineAboutUs = styled.h2`
  font-family: "Poppins" !important;
  font-style: normal;
  font-weight: 600;
  font-size: calc(1.325rem + 0.9vw) !important;
  line-height: 29px;
  color: #252748;
  margin-top: 2rem;
  margin-bottom: 0.7rem;
`;
