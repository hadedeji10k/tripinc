import React from "react";
// import "./HelpCenterMenu.css";

interface menuData {
  id: Number;
  state: Boolean;
  title: String;
  slug: String;
}

interface HelpCenterMenuProps {
  menuBar: menuData[];
  setMenuBar: any;
}

const HelpCenterMenu: React.FC<HelpCenterMenuProps> = ({
  menuBar,
  setMenuBar,
}: HelpCenterMenuProps) => {
  // function to handle preference click
  const handleSideMenuClick = (e: any) => {
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

  return (
    <>
      {menuBar.map((item) => (
        <p
          key={item.id.toString()}
          id={item.id.toString()}
          className={item.state ? "menuActive" : "menuNotActive"}
          onClick={handleSideMenuClick}
        >
          {item.title}
        </p>
      ))}
    </>
  );
};

export default HelpCenterMenu;
