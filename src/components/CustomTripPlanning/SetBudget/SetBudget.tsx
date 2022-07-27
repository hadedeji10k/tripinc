import React, { useState, useEffect } from "react";
import "./SetBudget.css";

const SetBudget: React.FC = () => {
  const initialFormData = {
    location: "",
    date: "",
    tripType: "",
    numberOfTraveler: 0,
  };
  // state to manage location data (to sort out clicked and unclicked location)
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    // console.log(tripType);

    console.log(formData);
  }, [formData]);

  // handle input change
  const handleChange = (e: any) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submit
  const submit = (e: any) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="set_budget_container">
      <div className="set_budget_word">
        <h1 className="set_budget_header">Set your budget</h1>
        <h3 className="set_budget_title">
          See how far you can stretch your nuggets.
        </h3>
      </div>
      <div>
        <form>
          <div>
            <label className="set_budget_label">Total Budget</label>
            <input
              name="location"
              className="set_budget_input"
              type="text"
              placeholder="Where are you going to"
              onChange={handleChange}
            />
          </div>
        </form>
        <div className="set_budget_text_nugget">
          This will hep you stay in budget when planning, but you’ll be able to
          adjust your budget per attraction when exploring all the amazing
          things on offer in [insert City].
        </div>

        <div className="set_budget_button_container">
          <button className="set_budget_button" type="submit" onClick={submit}>
            Set Budget
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetBudget;
