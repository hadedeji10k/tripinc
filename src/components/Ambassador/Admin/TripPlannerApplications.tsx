import { useState, useEffect } from "react";
import { Spin } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";

const menudata = [
  {
    id: 1,
    stateOfClass: true,
    title: "All",
  },
  {
    id: 2,
    stateOfClass: false,
    title: "Approved",
  },
  {
    id: 3,
    stateOfClass: false,
    title: "Pending",
  },
  {
    id: 4,
    stateOfClass: false,
    title: "Cancelled",
  },
];

const TripPlannerApplications = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [menuData, setMenuData] = useState(menudata);
  const [currentData, setCurrentData] = useState("");

  const forms = [
    {
      name: "Yusuf",
      country: "United States",
      citiesOfPlanning: ["California", "Las vegas"],
      status: "Pending",
    },
    {
      name: "Yusuf Adedeji",
      country: "Nigeria",
      citiesOfPlanning: ["Lagos", "Abuja"],
      status: "Approved",
    },
    {
      name: "Geek",
      country: "United States",
      citiesOfPlanning: ["California", "Las vegas"],
      status: "Cancelled",
    },
  ];

  const [data, setData] = useState(forms);
  const [initialData] = useState(forms);

  useEffect(() => {
    const activeState = menuData.filter((item) => item.stateOfClass === true);

    if (activeState[0].title.toLowerCase() === "all") {
      setData(initialData);
    } else {
      const filtered = initialData.filter(
        (item) =>
          item.status.toLowerCase() === activeState[0].title.toLowerCase()
      );
      setData(filtered);
    }
  }, [menuData]);

  // function to manage the trips button when it is clicked
  const handleTypeClick = (id: number) => {
    const index = menuData.findIndex((item) => item.id === id);

    for (let i = 0; i < menuData.length; i++) {
      menuData[i].stateOfClass = false;
    }

    // change the state of the class of the clicked location tag
    menuData[index].stateOfClass = !menuData[index].stateOfClass;
    // set the location data state to be the current location data
    setMenuData([...menuData]);
  };

  return (
    <div className="w_100">
      <Spin spinning={isLoading} size="large" className="w_100">
        <div className="basic_details_container">
          <div className="basic_details_word">
            <h1 className="basic_details_header fs-1">
              Trip Planner Applications
            </h1>
            <h3 className="fs-6 text-center">
              You can manage trip planner applications here
            </h3>
          </div>

          <DataTypeContainer>
            {menuData.map((item) => (
              <span
                onClick={() => handleTypeClick(item.id)}
                className={
                  item.stateOfClass
                    ? "preferences_clicked mb-0"
                    : "preferences_not_clicked mb-0"
                }
                key={item.id.toString()}
                id={item.id.toString()}
              >
                {item.title}
              </span>
            ))}
          </DataTypeContainer>

          <div className="row w_90">
            {data.map((item, index) => (
              <div key={index} className="col-sm-6 mb-4">
                <Link to={`/admin/trip-planners/${index}`}>
                  <ApplicationFormCard>
                    <ApplicationFormHeader>
                      <p className="mb-0 small_title">15 July 2020, 16:00</p>
                    </ApplicationFormHeader>
                    <ApplicationFormInfo>
                      <h2 className="medium_title">{item.name}</h2>
                      <ApplicationStatusSpan status={item.status.toLowerCase()}>
                        {item.status}
                      </ApplicationStatusSpan>
                    </ApplicationFormInfo>
                    <ApplicationFormOtherInfo>
                      <ApplicationFormOtherInfoContainer>
                        <p className="small_title">Country</p>
                        <p className="small_title">Nigeria</p>
                      </ApplicationFormOtherInfoContainer>
                    </ApplicationFormOtherInfo>
                  </ApplicationFormCard>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default TripPlannerApplications;

interface ApplicationStatusSpanProps {
  status?: any;
}

const ApplicationFormCard = styled.div`
  background-color: #fff;
  border: 2px solid gray;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
`;

const ApplicationFormHeader = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 2px solid gray;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 0.5rem;
  color: black;
`;

const ApplicationFormInfo = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 2px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const ApplicationStatusSpan = styled.span<ApplicationStatusSpanProps>`
  padding: 5px;
  border-radius: 10px;
  color: ${({ status }) =>
    status === "approved"
      ? "#056905"
      : status === "pending"
      ? "#776602"
      : "#d90404"};
  background-color: ${({ status }) =>
    status === "approved"
      ? "#c0eac0"
      : status === "pending"
      ? "#dcdc0d59"
      : "#e6bebe"};
  font-size: 0.8rem;
`;

const ApplicationFormOtherInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ApplicationFormOtherInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  color: black;
`;

const DataTypeContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 97%;
  flex-wrap: wrap;
  margin: auto;
  max-width: 97%;
  row-gap: 5px;    
  align-items: center;
  margin-bottom: 2.5rem;
  justify-content: center;
}
`;
