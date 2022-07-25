import { Range, getTrackBackground } from "react-range";

interface Props {
  budget: any;
  setBudget: any;
  budgetWarning: any;
  setBudgetWarning: any;
  budgetWarningError: any;
  setBudgetWarningError: any;
  spentBudget: any;
  setSpentBudget: any;
}

const Budget = ({
  budget,
  setBudget,
  budgetWarning,
  setBudgetWarning,
  budgetWarningError,
  setBudgetWarningError,
  spentBudget,
  setSpentBudget,
}: Props) => {
  const handleBudgetChange = (e: any) => {
    setBudget(parseInt(e.target.value));
  };
  const handleBudgetWarningChange = (e: any) => {
    // const
    if (parseInt(e.target.value) > parseInt(budget)) {
      setBudgetWarningError("You cannot set more than budget.");
      setBudgetWarning(budgetWarning);
      e.target.value = budgetWarning;
    } else if (e.target.value.length === 0) {
      setBudgetWarning(0);
      setBudgetWarningError("");
      e.target.value = 0;
    } else {
      setBudgetWarningError("");
      setBudgetWarning(parseInt(e.target.value));
    }
  };

  const handleBudgetButton = (type: string, action: string) => {
    switch (type) {
      case "budget":
        if (action === "+") {
          setBudget(budget + 1);
        } else if (action === "-") {
          if (budget > 0) {
            setBudget(budget - 1);
          }
        }
        break;
      case "budget_warning":
        if (budgetWarning === budget && action === "+") {
          console.log("resched");
          setBudgetWarningError("You cannot set more than budget.");
        }
        if (budgetWarning <= budget) {
          if (action === "+") {
            if (budget > budgetWarning) {
              setBudgetWarning(budgetWarning + 1);
              setBudgetWarningError("");
            }
          } else if (action === "-") {
            if (budgetWarning > 0) {
              setBudgetWarning(budgetWarning - 1);
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
          defaultValue={budget}
          key={budget}
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
          <span>£ {spentBudget}</span>
          <span>£ {budget}</span>
        </div>
        <Range
          values={[spentBudget]}
          step={1}
          min={0}
          max={budget > 0 ? budget : budget + 1}
          disabled={true}
          onChange={(values) => setSpentBudget(values)}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "30px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values: [spentBudget],
                    colors: ["#FFD166", "#777E90"],
                    min: 0,
                    max: budget > 0 ? budget : budget + 0.1,
                  }),
                  alignSelf: "center",
                  boxShadow: "5px 0px 5px -1px rgba(35, 38, 47, 0.303031)",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                // color: "#FFD166",
                // height: "10px",
                // width: "20px",
                // borderRadius: "4px",
                // backgroundColor: "#FFD166",
                // display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
                // boxShadow: "0px 2px 6px #FFD166",
              }}
            >
              <div
                style={{
                  height: "0px",
                  width: "0px",
                  backgroundColor: isDragged ? "#548BF4" : "#CCC",
                }}
              />
            </div>
          )}
        />
        {budget < spentBudget ? (
          <p className="red_alert" key={budget} style={{ marginTop: "-10px" }}>
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
          defaultValue={budgetWarning}
          key={budgetWarning}
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
