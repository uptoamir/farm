/* eslint-disable max-statements */
import { Typography } from "@mui/material";
import React, { createRef, FC, useEffect, useState } from "react";
import { useIsInViewport } from "src/core/utils/customHooks/useIsInViewPort";
import Loading from "../Loading";

export type LazyLoadingListProps = {
  items?: any[];
  pageItemCount?: number;
  // eslint-disable-next-line no-unused-vars
  Component: (item: any, idx: number) => React.ReactNode;
  title?: string;
  isLoading?: boolean;
};

const LazyLoadingList: FC<LazyLoadingListProps> = ({
  items,
  pageItemCount = 8,
  Component,
  isLoading = false,
  title = "هیچ اطلاعاتی",
}) => {
  const [currentList, setCurrentList] = useState<any[]>([]);
  const [refList, setRefList] = useState<React.RefObject<HTMLDivElement>[]>([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [topRef, setTopRef] = useState<React.RefObject<HTMLDivElement>>();
  const [bottomRef, setBottomRef] = useState<React.RefObject<HTMLDivElement>>();
  const [topIndex, setTopIndex] = useState<number>(0);
  const [bottomIndex, setBottomIndex] = useState<number>(pageItemCount);

  const isBottomVisible = useIsInViewport("0px", bottomRef);
  const isTopVisible = useIsInViewport("0px", topRef);

  const extendList = ({
    count = pageItemCount,
    refChangeCount = pageItemCount,
    initial = false,
  }: {
    count?: number;
    refChangeCount?: number;
    initial?: boolean;
  }) => {
    if (items === undefined) return;
    if (initial) {
      setCurrentList(items.slice(start, count + 1));
      setStart(0);
      setEnd(count + 1);
      // eslint-disable-next-line no-unused-vars
      const _refs = items.map((_) => createRef<HTMLDivElement>());
      setRefList(_refs);
      setBottomRef(_refs[refChangeCount - 1]);
      setBottomIndex(refChangeCount - 1);
    } else {
      setCurrentList((value) => {
        value.push(
          ...items.slice(end, Math.min(end + count + 1, items.length))
        );
        return value;
      });
      setBottomRef(refList[bottomIndex + refChangeCount]);
      if (topIndex + refChangeCount < bottomIndex) {
        setTopRef(refList[topIndex + refChangeCount]);
        setTopIndex((value) => value + refChangeCount);
      }
      setEnd((endVal) => endVal + count);
      setBottomIndex((value) => value + refChangeCount);
    }
  };

  const shrinkList = ({
    count = pageItemCount,
    refChangeCount = pageItemCount,
  }: {
    count?: number;
    refChangeCount?: number;
  }) => {
    setCurrentList((value) => {
      value = value.slice(start, end - count);
      return value;
    });
    setEnd((endVal) => endVal - count);
    setBottomRef(refList[bottomIndex - refChangeCount]);
    setBottomIndex((value) => value - refChangeCount);
    setTopRef(refList[topIndex - refChangeCount]);
    setTopIndex((value) => value - refChangeCount);
  };

  useEffect(() => {
    if (currentList.length <= 0 || currentList[0] !== items?.[0])
      extendList({ count: pageItemCount * 2, initial: true });
  }, [items]);

  useEffect(() => {
    if (isBottomVisible) {
      extendList({});
    }
  }, [isBottomVisible]);

  useEffect(() => {
    if (isTopVisible && topIndex >= pageItemCount) {
      shrinkList({});
    }
  }, [isTopVisible]);
  return (
    <React.Fragment>
      {isLoading || items === undefined || currentList === undefined ? (
        <div
          style={{
            height: "calc(100vh - 220px)",
          }}
        >
          <Loading />
        </div>
      ) : items.length > 0 ? (
        currentList.map((item, idx) => (
          <div key={idx} ref={refList[idx]}>
            {Component(item, idx)}
          </div>
        ))
      ) : (
        <div
          style={{
            height: "calc(100vh - 220px)",
          }}
        >
          <Typography
            color="textPrimary"
            variant="h5"
            className="flex justify-center py-8"
          >
            {`${title} وجود ندارد`}
          </Typography>
        </div>
      )}
    </React.Fragment>
  );
};

export default LazyLoadingList;
