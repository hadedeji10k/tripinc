import React, { useState } from "react";
import "./HelpCenterPage.css";
import GeneralFaq from "../FAQS/General/General";
import HelpCenterMenu from "./HelpCenterMenu";
import { BiSearch } from "react-icons/bi";

const menuBarData = [
  {
    id: 1,
    state: true,
    title: "🏘️ General",
    slug: "general",
  },
  {
    id: 2,
    state: false,
    title: "Support",
    slug: "support",
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
    title: "Refunds",
    slug: "refunds",
  },
];

const HelpCenterPage = () => {
  const [menuBar, setMenuBar] = useState(menuBarData);

  let data = menuBar.filter((item) => item.state === true);

  const handle = (e: any) => {
    // const id = e.target.id;
    const index = menuBar.findIndex((item) => item.title === e.target.value);
    // const index = menuBar.findIndex((item) => item.id === parseInt(id));
    for (let i = 0; i < menuBar.length; i++) {
      menuBar[i].state = false;
    }
    menuBar[index].state = !menuBar[index].state;
    // menuBar[index].class = menuBar[index].stateOfClass ? 'clicked' : 'not-clicked'
    setMenuBar([...menuBar]);
  };

  return (
    <div>
      <div className="help_center_page">
        <div className="help_center_page_container">
          <div className="faq_search_container">
            <div className="faq_search_inner_container">
              <div className="faq_search_container_text">
                <h3 className="faq_search_container_header">Support</h3>
                <p className="faq_search_container_title">
                  Describe the problem you are experiencing. Search our guides
                  for anwsers to your questions.
                </p>
              </div>
              <div className="faq_search_input_container">
                <input
                  className="faq_search_input"
                  type="text"
                  placeholder="Search"
                />
                <button className="faq_page_search_button">
                  <BiSearch />
                </button>
              </div>
            </div>
          </div>
          <div className="faq_container">
            <h3 className="help_center_page_header">
              Frequently Asked Questions
            </h3>
            <p>
              Listed below are our most frequently asked questions, can’t find
              what you are searching for reach out to Support team.
            </p>
            <select className="help_center_select" onClick={handle}>
              {menuBar.map((item) => (
                <option
                  key={item.id.toString()}
                  id={item.id.toString()}
                  value={item.title}
                >
                  {item.title}
                </option>
              ))}
            </select>
            <div className="faq_inner_container">
              <div className="faq_category_container">
                <HelpCenterMenu menuBar={menuBar} setMenuBar={setMenuBar} />
              </div>
              <div className="faq_container">
                {data[0].slug === "general" ? (
                  <GeneralFaq />
                ) : data[0].slug === "support" ? (
                  <GeneralFaq />
                ) : data[0].slug === "bookings" ? (
                  <GeneralFaq />
                ) : data[0].slug === "refunds" ? (
                  <GeneralFaq />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          {/* search result */}
          {/* <div className="faq_container">
            <h3 className="help_center_page_header">We have the answers!</h3>
            <GeneralFaq />
            <p className="help_center_page_answer_text">
              Still got some unanswered questions? <br /> No problem, contact
              our Support team.{" "}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;
