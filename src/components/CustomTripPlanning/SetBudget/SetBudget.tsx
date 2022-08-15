import React, { useState, useEffect } from "react";
import "./SetBudget.css";

interface SetBudgetProp {
  tripData: any;
  setTripData: any;
  handleMenuChange: any;
}

const SetBudget = ({
  tripData,
  setTripData,
  handleMenuChange,
}: SetBudgetProp) => {
  // handle input change
  const handleChange = (e: any) => {
    e.preventDefault();
    setTripData({
      ...tripData,
      budget: parseInt(e.target.value),
    });
  };

  // submit
  const submit = (e: any) => {
    e.preventDefault();
    handleMenuChange("next");
  };

  const handleBudgetButton = (type: string, action: string) => {
    switch (type) {
      case "budget":
        if (action === "+") {
          setTripData({
            ...tripData,
            budget: tripData.budget + 1,
          });
        } else if (action === "-") {
          if (tripData.budget > 0) {
            setTripData({
              ...tripData,
              budget: tripData.budget - 1,
            });
          }
        }
        break;
      default:
        break;
    }
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
          <label className="set_budget_label">Total Budget</label>
          <div className="trip_planning_budget_input_container">
            <span className="trip_planning_budget_currency">£</span>
            <input
              className="trip_planning_budget_input"
              type="number"
              onChange={handleChange}
              defaultValue={tripData.budget}
              key={tripData.budget}
            />
            <span
              className="trip_planning_budget_add"
              onClick={() => handleBudgetButton("budget", "+")}
            >
              +
            </span>
            <span
              className="trip_planning_budget_minus"
              onClick={() => handleBudgetButton("budget", "-")}
            >
              -
            </span>
          </div>
        </form>
        <div className="set_budget_text_nugget">
          This will hep you stay in budget when planning, but you’ll be able to
          adjust your budget per attraction when exploring all the amazing
          things on offer in {tripData.tripLocation}.
        </div>

        <div className="set_budget_button_container">
          <button className="set_budget_button" onClick={submit}>
            Next
          </button>
          <button
            className="set_budget_button"
            onClick={() => handleMenuChange("prev")}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetBudget;
