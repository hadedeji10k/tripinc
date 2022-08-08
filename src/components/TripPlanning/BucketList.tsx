// import { useState, useEffect } from "react";
import { Spin } from "antd";
import "antd/dist/antd.min.css";
import { getUserWishListAsAttraction } from "../../api";
import { IDeal, IPagination } from "../../api/interfaces";
import { localGetUserId } from "../../utils/helpers";
import TripPlanningBudgetListCard from "./TripPlanningBudgetListCard/TripPlanningBudgetListCard";

interface Props {
  itineraryData: any;
  setItineraryData: any;
  wishListData: IDeal[];
  setWishListData: any;
  pagination: IPagination | any;
  setPagination: any;
  isBucketListLoading: any;
  setIsBucketListLoading: any;
}

const TripPlanningBucketList = ({
  itineraryData,
  setItineraryData,
  wishListData,
  setWishListData,
  pagination,
  setPagination,
  isBucketListLoading,
  setIsBucketListLoading,
}: Props) => {
  const userId = localGetUserId();

  const handlePaginationPrev = async () => {
    setIsBucketListLoading(true);
    const query = `PageSize=5&PageNumber=${
      pagination?.currentPage - 1
    }&PageSize=${pagination?.pageSize}`;
    await getUserWishListAsAttraction(userId, query).then((res) => {
      setWishListData(res.data.items);

      setPagination({
        hasNext: res.data.hasNext,
        hasPrevious: res.data.hasPrevious,
        currentPage: res.data.currentPage,
        pageSize: res.data.pageSize,
        totalPages: res.data.totalPages,
        totalCount: res.data.totalCount,
      });
    });
    setIsBucketListLoading(false);
  };

  const handlePaginationNext = async () => {
    setIsBucketListLoading(true);
    const query = `PageSize=5&PageNumber=${
      pagination?.currentPage + 1
    }&PageSize=${pagination?.pageSize}`;
    await getUserWishListAsAttraction(userId, query).then((res) => {
      setWishListData(res.data.items);

      setPagination({
        hasNext: res.data.hasNext,
        hasPrevious: res.data.hasPrevious,
        currentPage: res.data.currentPage,
        pageSize: res.data.pageSize,
        totalPages: res.data.totalPages,
        totalCount: res.data.totalCount,
      });
    });
    setIsBucketListLoading(false);
  };

  return (
    <div>
      {/* <h3>tripPage</h3> */}
      <Spin spinning={isBucketListLoading} size="large">
        {wishListData.length > 0 ? (
          <>
            <div className="trip_planning_budget_card">
              {wishListData.map((item, key) => (
                <TripPlanningBudgetListCard
                  key={key}
                  wishListData={wishListData}
                  itemId={item.id}
                  image={item.imageUrl}
                  title={item.title}
                  price={item.price}
                  reviews={item.ratings}
                  itemType={item.itemType}
                  liked={true}
                  itineraryData={itineraryData}
                  setItineraryData={setItineraryData}
                  isBucketListLoading={isBucketListLoading}
                />
              ))}
            </div>
            <div className="explore_page_number">
              <span>
                Page {pagination?.currentPage} of {pagination?.totalPages}
              </span>
              <span>
                {(pagination?.currentPage - 1) * pagination?.pageSize + 1} -
                {pagination?.hasNext
                  ? pagination?.pageSize * pagination?.currentPage
                  : pagination?.totalCount}
              </span>
            </div>
            <div className="explore_page_number">
              <button
                className={
                  pagination?.hasPrevious
                    ? "explore_navigation_button_active"
                    : "explore_navigation_button"
                }
                onClick={handlePaginationPrev}
                disabled={!pagination?.hasPrevious}
              >
                Prev
              </button>
              <button
                className={
                  pagination?.hasNext
                    ? "explore_navigation_button_active"
                    : "explore_navigation_button"
                }
                onClick={handlePaginationNext}
                disabled={!pagination?.hasNext}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="no_data_text">
              You do not have any item in your bucket list
            </h3>
            <br />
          </>
        )}
      </Spin>
    </div>
  );
};

export default TripPlanningBucketList;
