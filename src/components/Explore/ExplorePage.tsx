/* eslint-disable array-callback-return */
import { useState } from "react";
import "antd/dist/antd.min.css";
import "./ExplorePage.css";
import Featured from "./Featured";
import Popular from "./Popular";

const menuBarData = [
  {
    id: 1,
    state: true,
    title: "Featured",
    slug: "featured",
  },
  {
    id: 2,
    state: false,
    title: "Popular",
    slug: "popular",
  },
];

const ExplorePage = () => {
  const [menuBar, setMenuBar] = useState(menuBarData);

  let data = menuBar.filter((item) => item.state === true);

  const handle = (id: any) => {
    // const id = e.target.id;
    const index = menuBar.findIndex((item) => item.id === id);
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
      <div className="explore_page_container">
        <div className="explore_page_header">
          {/* <img className="explore_page_header_image" src="https://images.unsplash.com/photo-1596889157941-d2651f70a4f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHRvdXJpc3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="" /> */}
          <div className="explore_page_header_text">
            <h3 className="explore_page_header_title">Explore Cities!</h3>
            <p className="explore_page_header_description">
              You can search cities you wish on this page using the search form.
            </p>
          </div>
        </div>
        <div className="explore_tab_menu">
          {menuBar.map((item) => (
            <span
              key={item.id}
              className={
                data[0].id === item.id
                  ? "explore_tab_menu_title_active"
                  : "explore_tab_menu_title"
              }
              onClick={() => handle(item.id)}
            >
              {item.title}
            </span>
          ))}
        </div>
        <div>
          {data[0].id === 1 ? (
            <Featured handleMove={handle} />
          ) : data[0].id === 2 ? (
            <Popular />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ExplorePage;
