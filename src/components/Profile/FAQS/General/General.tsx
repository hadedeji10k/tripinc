import { useState } from "react";
import "./General.css";
import { generalFaq } from "../../../../currentUserData";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const General = () => {
  const [faqsData, setFaqsData] = useState(generalFaq);

  // function to handle faqs click
  const handleFaqsClick = (e: any) => {
    // e.preventDefault();
    // console.log(e);
    const id = e.id;
    const index = faqsData.findIndex((item) => item.id === parseInt(id));
    let prevState = faqsData[index].stateOfClass;
    for (let i = 0; i < faqsData.length; i++) {
      faqsData[i].stateOfClass = false;
    }
    faqsData[index].stateOfClass = !prevState;
    // faqsData[index].class = faqsData[index].stateOfClass ? 'clicked' : 'not-clicked'
    setFaqsData([...faqsData]);
  };

  return (
    <div className="general_faq_container">
      {faqsData.map((item, index) => (
        <div key={index} style={{ width: "100%" }}>
          <hr className="general_faq_line" />
          {/* <div className="question_answer_container"> */}
          <div
            className="row"
            id={item.id.toString()}
            onClick={() => handleFaqsClick(item)}
          >
            <h4 className="general_faq_question">{item.question}</h4>

            {item.stateOfClass ? (
              <span>
                <IoIosArrowUp className="arrow_drop" />
              </span>
            ) : (
              <span>
                <IoIosArrowDown className="arrow_drop" />
              </span>
            )}
          </div>
          {item.stateOfClass ? (
            <p className="general_faq_answer">{item.answer}</p>
          ) : (
            ""
          )}
          {/* </div> */}
        </div>
      ))}
    </div>
  );
};

export default General;
