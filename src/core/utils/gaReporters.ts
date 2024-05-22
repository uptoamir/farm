/* eslint-disable no-empty */
import * as ga from "src/core/ga";
import { loggerEvent } from "../logging/supervisor";
import React from "react";

export const reportScroll = (
  pageName: string,
  e: React.UIEvent<HTMLDivElement, UIEvent>
) => {
  const target = e.target as HTMLTextAreaElement;
  try {
    ga.event({
      action: `scroll-on-${pageName}`,
      params: {
        amount_of_scroll: target.scrollTop,
      },
    });
    loggerEvent(`ScrollOn${pageName}`, { amount: target.scrollTop });
  } catch (error) {}
};

export const reportOnClick = (elementName: string) => {
  try {
    ga.event({
      action: `click-on-${elementName}`,
      params: {},
    });
    loggerEvent(`ClickOn${elementName}`);
  } catch (error) {}
};

export const reportSwiper = (pageName: string) => {
  try {
    ga.event({
      action: `swipe-on-${pageName}-page`,
      params: {},
    });
    loggerEvent(`SwipeOn${pageName}`);
  } catch (error) {}
};

export const reportOnClickOnTabs = (pageName: string, tabName: string) => {
  try {
    ga.event({
      action: `click-on-tabs-on-${pageName}-page`,
      params: { tab_name: tabName },
    });
    loggerEvent(`ClickTabsOn${pageName}`, { tabName: tabName });
  } catch (error) {}
};

export const reportBottomSheetOnClick = (nav: string) => {
  ga.event({
    action: "click-on-navbar",
    params: {
      nav_name: nav,
    },
  });

  loggerEvent(`ClickOnNav`, { navName: nav });
};

export const reportClickOnCalendarBottomSheet = (selectedDate: Date) => {
  ga.event({
    action: "calendar-bottom-sheet",
    params: {
      current_date: selectedDate,
    },
  });

  loggerEvent(`ClickOnCalendarButton`, { date: selectedDate });
};

export const pageViewed = (path: string) => {
  loggerEvent(`Viewed${path}`);
};
