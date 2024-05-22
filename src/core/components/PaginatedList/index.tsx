/* eslint-disable id-denylist */
/* eslint-disable no-unused-vars */
import React, { FC, useEffect, useState } from "react";
import { paginationChecker } from "src/core/utils/predictPaginationChecker";
import Loading from "src/core/components/Loading";
import { Typography } from "@mui/material";

type PaginatedListPropsType = {
  render: (props: any) => React.ReactNode;
  data: Record<string, any> | undefined;
  pageNumber: number;
  setPageNumber: (p: any) => void;
  maxHeight: string | number;
  paddingBottom: number;
  isListFetching: boolean;
  isIdFirst?: boolean;
  listId?: number;
  filterBy?: string | undefined;
};

const PaginatedList: FC<PaginatedListPropsType> = ({
  render,
  data,
  pageNumber,
  setPageNumber,
  maxHeight,
  paddingBottom,
  isListFetching,
  isIdFirst,
  listId,
  filterBy,
}) => {
  const [listItems, setListItems] = useState<Record<string, any>[] | []>([]);
  const [currentListId, setCurrentListId] = useState<number | undefined>();
  const conditionChecker = (data: Record<string, any> | undefined) => {
    if (isIdFirst) return data?.results?.[0]?.id;
    else return data?.results?.[0]?.question?.id;
  };

  useEffect(() => {
    if (data?.results?.length > 0) {
      if (currentListId === listId) {
        !listItems?.some((el) => el?.id === conditionChecker(data)) &&
          // eslint-disable-next-line no-unsafe-optional-chaining
          setListItems((prev) => [...prev, ...data?.results]);
      } else {
        setListItems((c) => data?.results);
        setCurrentListId(listId);
      }
    }
  }, [data, listId]);

  return (
    <div className="dir-rtl flex flex-col no-scrollbar">
      <div
        className="dir-rtl flex-1 no-scrollbar overflow-scroll"
        style={{
          paddingBottom: `${paddingBottom}px`,
          maxHeight: maxHeight,
        }}
        onScrollCapture={(e) => {
          paginationChecker(e, pageNumber, data?.count, setPageNumber);
        }}
      >
        {(pageNumber === 1 && isListFetching && listItems.length < 1) ||
          (currentListId !== listId && isListFetching && (
            <div
              style={{
                height: maxHeight,
              }}
            >
              <Loading />
            </div>
          ))}
        {!listItems && !isListFetching && (
          <div className="flex items-center justify-center pt-3">
            <Typography color="textPrimary">آیتمی وجود ندارد</Typography>
          </div>
        )}
        {currentListId === listId &&
          listItems?.length > 0 &&
          listItems
            // eslint-disable-next-line no-confusing-arrow
            .filter((item) =>
              filterBy ? item?.round.includes(filterBy) : item
            )
            .map((item, index) => (
              <div key={index}>
                {render({
                  item,
                })}
              </div>
            ))}
      </div>
    </div>
  );
};

export default PaginatedList;
