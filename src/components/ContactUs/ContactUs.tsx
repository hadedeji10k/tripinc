import { AiOutlineMail, AiOutlineWhatsApp } from "react-icons/ai";
import { FcPhoneAndroid } from "react-icons/fc";
import styled from "styled-components";

const ContactUs = () => {
  return (
    <ContactUsContainer>
      <HeadLineContactUs>Contact Us</HeadLineContactUs>
      <div className="row w-100 justify-content-center mt-4">
        <div className="col-12 col-sm-6 col-xl-4 mb-4">
          <ContactUsCard>
            <ContactUsCardBadge>
              <FcPhoneAndroid />
            </ContactUsCardBadge>
            <h3 className="medium_title text-center">
              Call Customer Service: Talk to us over the phone
            </h3>
            <h5 className="small_title">+44 782 388 7160</h5>
            <h5 className="small_title">Monday to Friday, 9am - 7pm</h5>
          </ContactUsCard>
        </div>
        <div className="col-12 col-sm-6 col-xl-4 mb-4">
          <ContactUsCard>
            <ContactUsCardBadge>
              <AiOutlineMail />
            </ContactUsCardBadge>
            <h3 className="medium_title text-center">
              Send an Email: Get in touch with our customer service team
            </h3>
            <h5 className="small_title">info@tripinc.co</h5>
          </ContactUsCard>
        </div>
        <div className="col-12 col-sm-6 col-xl-4 mb-4">
          <ContactUsCard>
            <ContactUsCardBadge>
              <AiOutlineWhatsApp />
            </ContactUsCardBadge>
            <h3 className="medium_title text-center">Message us on WhatsApp</h3>
            <h5 className="small_title">+44 782 388 7160</h5>
            <h5 className="small_title">We currently support chat only</h5>
          </ContactUsCard>
        </div>
      </div>
    </ContactUsContainer>
  );
};

export default ContactUs;

const ContactUsContainer = styled.div`
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

const HeadLineContactUs = styled.h2`
  font-family: "Poppins" !important;
  font-style: normal;
  font-weight: 600;
  font-size: calc(1.9rem + 0.9vw) !important;
  line-height: 29px;
  color: #1a405d;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding: 7px 15px;
  border-bottom: 4px solid #146961;
`;

const ContactUsCard = styled.div`
  width: 100%;
  background: #f2f2f2;
  border-radius: 20px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContactUsCardBadge = styled.span`
  display: block;
  font-size: 75px;
  color: #93d4ce;
`;
