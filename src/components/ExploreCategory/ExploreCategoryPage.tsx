/* eslint-disable array-callback-return */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import "antd/dist/antd.min.css";
import "./ExploreCategoryPage.css";
import Card from "../Cards/AttractionCard/AttractionCard";

import { getAllDeals } from "../../api";
import { IDeal } from "../../api/interfaces";

const ExploreCategoryPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [attractionData, setAttractionData] = useState<IDeal[]>([]);
  const { catNameParam } = useParams();
  console.log(catNameParam);
  const catName = catNameParam ? catNameParam : "Beach";

  useEffect(() => {
    setIsLoading(true);
    const query = `Interests=${catName}`;
    console.log(catName);
    getAllDeals(query).then((res) => {
      // console.log(res.data);
      setAttractionData(res.data.items);
      setIsLoading(false);
    });
  }, [catName]);

  const handleLikeButton = (e: any) => {
    console.log(e);
  };

  return (
    <>
      <Spin spinning={isLoading}>
        <div className="explore_category_page_container">
          <div className="explore_category_page_header">
            <h1 className="explore_category_page_title">{catName}</h1>
          </div>
          {/* <Card data={attractionData} /> */}
          {attractionData ? (
            attractionData.length > 0 ? (
              <div className="card">
                {attractionData.map((item) => (
                  <div key={item.id}>
                    <Card
                      item={item}
                      liked={item.liked}
                      handleLikeButton={handleLikeButton}
                      url={`/explore-details/attraction/${item.id}`}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <br />
                <br />
                <h3>No Result</h3>
                <br />
                <a href="/#/explore">
                  <span className="explore_category_preferences_clicked">
                    See all
                  </span>
                </a>
              </>
            )
          ) : null}
        </div>
      </Spin>
    </>
  );
};

export default ExploreCategoryPage;
