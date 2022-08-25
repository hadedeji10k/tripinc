import { Slider, Switch } from "antd";

interface Props {
  tripPlanningData: any;
  setTripPlanningData: any;
  budgetWarningError: any;
  setBudgetWarningError: any;
}

const Budget = ({
  tripPlanningData,
  setTripPlanningData,
  budgetWarningError,
  setBudgetWarningError,
}: Props) => {
  const handleBudgetChange = (e: any) => {
    setTripPlanningData({
      ...tripPlanningData,
      budget: parseInt(e.target.value),
    });
  };

  const handleBudgetWarningChange = (e: any) => {
    // const
    if (parseInt(e.target.value) > parseInt(tripPlanningData.budget)) {
      setBudgetWarningError("You cannot set more than budget.");
      setTripPlanningData({
        ...tripPlanningData,
        budgetWarning: tripPlanningData.budgetWarning,
      });
      e.target.value = tripPlanningData.budgetWarning;
    } else if (e.target.value.length === 0) {
      setTripPlanningData({
        ...tripPlanningData,
        budgetWarning: 0,
      });
      setBudgetWarningError("");
      e.target.value = 0;
    } else {
      setBudgetWarningError("");
      setTripPlanningData({
        ...tripPlanningData,
        budgetWarning: parseInt(e.target.value),
      });
    }
  };

  const handleBudgetButton = (type: string, action: string) => {
    switch (type) {
      case "budget":
        if (action === "+") {
          setTripPlanningData({
            ...tripPlanningData,
            budget: tripPlanningData.budget + 1,
          });
        } else if (action === "-") {
          if (tripPlanningData.budget > 0) {
            setTripPlanningData({
              ...tripPlanningData,
              budget: tripPlanningData.budget - 1,
            });
          }
        }
        break;
      case "budget_warning":
        if (
          tripPlanningData.budgetWarning === tripPlanningData.budget &&
          action === "+"
        ) {
          setBudgetWarningError("You cannot set more than budget.");
        }
        if (tripPlanningData.budgetWarning <= tripPlanningData.budget) {
          if (action === "+") {
            if (tripPlanningData.budget > tripPlanningData.budgetWarning) {
              setTripPlanningData({
                ...tripPlanningData,
                budgetWarning: tripPlanningData.budgetWarning + 1,
              });
              setBudgetWarningError("");
            }
          } else if (action === "-") {
            if (tripPlanningData.budgetWarning > 0) {
              setTripPlanningData({
                ...tripPlanningData,
                budgetWarning: tripPlanningData.budgetWarning - 1,
              });
              setBudgetWarningError("");
            }
          }
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <label className="signup_label">Total Budget</label>
      <div className="trip_planning_budget_input_container">
        <span className="trip_planning_budget_currency">£</span>
        <input
          className="trip_planning_budget_input"
          type="number"
          onChange={handleBudgetChange}
          defaultValue={tripPlanningData.budget}
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

      <label className="signup_label">Spent Budget</label>
      <div style={{ width: "90%", marginBottom: "20px" }}>
        <div className="spent_budget_row">
          <span>£ {tripPlanningData.spentBudget.toFixed(2)}</span>
          <span>£ {tripPlanningData.budget}</span>
        </div>
        <Slider
          defaultValue={tripPlanningData.spentBudget}
          max={tripPlanningData.budget}
          disabled={true}
          className="budget_slider"
          handleStyle={{
            backgroundColor: "rgb(255, 209, 102)",
          }}
        />

        {tripPlanningData.budget < tripPlanningData.spentBudget ? (
          <p
            className="red_alert"
            key={tripPlanningData.budget}
            style={{ marginTop: "-10px" }}
          >
            Your budget is less than your spent budget
          </p>
        ) : null}
      </div>

      <label className="signup_label">Set Budget Warning</label>
      <div className="trip_planning_budget_input_container">
        <span className="trip_planning_budget_currency">£</span>
        <input
          className="trip_planning_budget_input"
          type="number"
          onChange={handleBudgetWarningChange}
          onBlur={handleBudgetWarningChange}
          defaultValue={tripPlanningData.budgetWarning}
          key={tripPlanningData.budgetWarning}
        />
        <span
          className="trip_planning_budget_add"
          onClick={() => handleBudgetButton("budget_warning", "+")}
        >
          +
        </span>
        <span
          className="trip_planning_budget_minus"
          onClick={() => handleBudgetButton("budget_warning", "-")}
        >
          -
        </span>
      </div>
      {budgetWarningError && budgetWarningError.length > 0 ? (
        <p
          className="red_alert"
          key={budgetWarningError}
          style={{ marginTop: "-10px" }}
        >
          {budgetWarningError}
        </p>
      ) : null}
    </>
  );
};

export default Budget;
