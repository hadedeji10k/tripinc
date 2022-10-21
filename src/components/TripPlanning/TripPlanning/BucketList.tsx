// import { useState, useEffect } from "react";
import { Spin } from "antd";
import "antd/dist/antd.min.css";
import { getUserWishListAsAttraction } from "../../../api";
import {
  IDeal,
  IInitialTripData,
  IPagination,
  ITripPlanningItineraryDay,
} from "../../../api/interfaces";
import { localGetUserId } from "../../../utils/helpers";
import TripPlanningBudgetListCard from "./TripPlanningBudgetListCard/TripPlanningBudgetListCard";

interface Props {
  tripDays: any;
  itineraryData: ITripPlanningItineraryDay[];
  setItineraryData: any;
  tripPlanningData: IInitialTripData;
  setTripPlanningData: any;
  wishListData: IDeal[];
  setWishListData: any;
  pagination: IPagination | any;
  setPagination: any;
  isBucketListLoading: any;
  setIsBucketListLoading: any;
}

const TripPlanningBucketList = ({
  tripDays,
  itineraryData,
  setItineraryData,
  tripPlanningData,
  setTripPlanningData,
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
    const query = `Location=${
      tripPlanningData.tripLocation
    }&PageSize=5&PageNumber=${pagination?.currentPage - 1}&PageSize=${
      pagination?.pageSize
    }`;
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
    const query = `Location=${
      tripPlanningData.tripLocation
    }&PageSize=5&PageNumber=${pagination?.currentPage + 1}&PageSize=${
      pagination?.pageSize
    }`;
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
                  item={item}
                  liked={true}
                  tripDays={tripDays}
                  itineraryData={itineraryData}
                  setItineraryData={setItineraryData}
                  tripPlanningData={tripPlanningData}
                  setTripPlanningData={setTripPlanningData}
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
              {pagination?.hasPrevious ? (
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
              ) : null}

              {pagination?.hasNext ? (
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
              ) : null}
            </div>
          </>
        ) : (
          <>
            <h3 className="mb-3 mt-3 fs-5 text-center">
              You do not have any item in your bucket list that matches your
              trip location.
            </h3>
            <br />
          </>
        )}
      </Spin>
    </div>
  );
};

export default TripPlanningBucketList;
