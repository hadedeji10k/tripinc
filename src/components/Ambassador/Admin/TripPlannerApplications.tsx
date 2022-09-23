import { useState } from "react";
import { Spin } from "antd";

const TripPlannerApplications = () => {
  const [isLoading, setIsLoading] = useState(false);

  const forms = [
    {
      name: "Yusuf",
      country: "United States",
      citiesOfPlanning: ["California", "Las vegas"],
    },
    {
      name: "Yusuf Adedeji",
      country: "Nigeria",
      citiesOfPlanning: ["Lagos", "Abuja"],
    },
    {
      name: "Geek",
      country: "United States",
      citiesOfPlanning: ["California", "Las vegas"],
    },
  ];

  return (
    <Spin spinning={isLoading} size="large">
      <div className="basic_details_container">
        <div className="basic_details_word">
          <h1 className="basic_details_header fs-1">
            Trip Planner Applications
          </h1>
          <h3 className="fs-4">
            You can manage trip planner applications here
          </h3>
        </div>

        <div className="row">
          {forms.map((item, index) => (
            <div key={index} className="col-xl-3 col-sm-6 mb-4">
              <div
                className="card dashboard text-black bg-white o-hidden h-100 pointer"
                tabIndex={0}
              >
                <div className="card-body">
                  <div className="mr-5">
                    <h2 className="fs-5">{item.name}</h2>
                    <h2 className="fs-6">{item.country}</h2>
                  </div>
                </div>
                <a
                  className="card-footer clearfix small z-1"
                  href={`/#/admin/trip-planners/${index}`}
                >
                  <span className="float-left">View</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Spin>
  );
};

export default TripPlannerApplications;
