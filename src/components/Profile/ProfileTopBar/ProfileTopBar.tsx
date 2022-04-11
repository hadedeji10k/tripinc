import React from "react";
import "./ProfileTopBar.css";
import image from "../../../images/profile.png";
import { BsFillPencilFill } from "react-icons/bs";

interface menuData {
  id: Number;
  state: Boolean;
  title: string;
  slug: string;
}

interface ProfileTopBarProps {
  menuBar: menuData[];
  setMenuBar: any;
}

const ProfileTopBar: React.FC<ProfileTopBarProps> = ({
  menuBar,
  setMenuBar,
}: ProfileTopBarProps) => {
  // function to handle preference click
  const handleMenuClick = (e: any) => {
    e.preventDefault();
    // console.log(e.target.id)
    const id = e.target.id;
    const index = menuBar.findIndex((item) => item.id === parseInt(id));
    for (let i = 0; i < menuBar.length; i++) {
      menuBar[i].state = false;
    }
    menuBar[index].state = !menuBar[index].state;
    // menuBar[index].class = menuBar[index].stateOfClass ? 'clicked' : 'not-clicked'
    setMenuBar([...menuBar]);
  };

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
    <>
      <div className="profile_top_bar_container">
        <div className="user_profile">
          <img className="user_image" src={image} alt="" />
          <h3 className="user_name">Adedeji Yusuf</h3>
          <p className="user_identity">Identity verified</p>
        </div>
        <div className="menu_bar">
          {menuBar.map((item) => (
            // <span key={item.id} className="preferences_tag">{item.title}</span>
            <span
              key={item.id.toString()}
              id={item.id.toString()}
              className={item.state ? "active" : "not_active"}
              onClick={handleMenuClick}
            >
              {item.title}
            </span>
          ))}
        </div>
        <button className="profile_top_bar_button">
          <BsFillPencilFill />
        </button>
      </div>
      <div className="">
        <select className="profile_top_bar_select" onClick={handle}>
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
      </div>
    </>
  );
};

export default ProfileTopBar;
