/* eslint-disable max-statements */
import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useWindowSize } from "src/core/utils/customHooks/useWindowSize";
import { Typography, useTheme } from "@mui/material";
import Icon from "../Icon";
import _ from "lodash";
import Splash from "src/core/components/Splash";
import useSplash from "../Splash/useSplash";

const bottomNavigationItems = [
  {
    name: "حساب کاربری",
    icon: "user",
    activeIcon: "user",
    route: "/user",
  },
  {
    name: "پیام رسان",
    icon: "messages",
    activeIcon: "messages",
    route: "/messages",
  },
  {
    name: "خانه",
    icon: "home",
    activeIcon: "home",
    route: "/home",
  },
];

const DesktopBottomNavigationItems = [
  {
    name: "حساب کاربری",
    icon: "user",
    activeIcon: "user",
    route: "/user",
  },
  {
    name: "پیام رسان",
    icon: "messages",
    activeIcon: "messages",
    route: "/messages",
  },

  {
    name: "خانه",
    icon: "home",
    activeIcon: "home",
    route: "/home",
  },
];

const pageMap: Record<string, number> = {
  home: 2,
  messages: 1,
  user: 0,
};

type BottomNavigationProps = {
  children: React.ReactNode;
};

const getPage = (path: string) => {
  let page;
  const pmap = pageMap;
  Object.keys(pmap).forEach((key) => {
    if (path.startsWith(`/${key}`)) {
      page = pmap[key];
    }
  });
  if (page === undefined && path === "/") return pmap["home"];
  return page;
};

const BottomNavigation: NextPage<BottomNavigationProps> = ({ children }) => {
  const router = useRouter();
	const showSplash = useSplash();
  const windowSize = useWindowSize();
  const [isDesktopMode, setIsDesktopMode] = useState<boolean>(
    windowSize.width >= 840
  );
  const theme = useTheme();

  useEffect(() => {
    if (windowSize.width >= 840) !isDesktopMode && setIsDesktopMode(true);
    else isDesktopMode && setIsDesktopMode(false);
  }, [isDesktopMode, windowSize]);

  const [page, setPage] = useState<number | undefined>(getPage(router.asPath));
  const [isGone, setGone] = useState(false);

  useEffect(() => {
    const currentRouteNumber = getPage(router.asPath);
    if (currentRouteNumber !== page) setPage(currentRouteNumber);
  }, [page, router]);

  useEffect(() => {
    setGone(getPage(router.asPath) === undefined);
  }, [router]);

  let debouncedRoute: _.DebouncedFuncLeading<() => void>;

  const renderedNaves = () => {
    if (isDesktopMode) return DesktopBottomNavigationItems;
    return bottomNavigationItems;
  };

  const handleRouteClick = (
    nav: (typeof bottomNavigationItems)[0],
    idx: number
  ) => {
    if (idx < 2) return;
    debouncedRoute?.cancel();
    // eslint-disable-next-line no-undef
    debouncedRoute = _.debounce(
      () => {
        try {
          page === 2 && !history.state.options._shouldResolveHref
            ? router.push(nav.route)
            : router.replace(nav.route);
        } catch (error) {
          router.push(nav.route);
        }

        setPage(idx);
      },
      100,
      { leading: false, trailing: true }
    );
    debouncedRoute();
  };

  return (
    <div className="relative">
     <Splash showSplash={showSplash}>{children}</Splash>

      <div
        className="fixed bottom-0 w-full z-1200"
        style={{ display: !isGone && !showSplash ? "" : "none" }}
      >
        <>
          <ul
            className={`PrimaryNav mx-auto`}
            style={{ backgroundColor: theme.palette.background.paper }}
          >
            {renderedNaves().map((nav, idx) => {
              const active = page === idx;
              return (
                <li
                  className={
                    // eslint-disable-next-line prefer-template
                    `${
                      isDesktopMode ? "Nav-item-desktop" : "Nav-item"
                    } h-full flex flex-col justify-around items-center pt-2 pb-3` +
                    (active ? " is-active" : "")
                  }
                  key={idx}
                  onClick={() => {
                    handleRouteClick(nav, idx);
                  }}
                >
                  <Icon
                    icon={active ? nav.activeIcon : nav.icon}
                    size={25}
                    color={
                      active
                        ? theme.palette.primary.main
                        : theme.palette.text.primary
                    }
                  />
                  {active && (
                    <span className="ping top-4 absolute inline-flex h-6 w-6 rounded-full bg-green-400 opacity-75"></span>
                  )}
                  <Typography
                    variant="caption"
                    color={
                      active
                        ? theme.palette.text.primary
                        : theme.palette.text.fade
                    }
                  >
                    {nav.name}
                  </Typography>
                </li>
              );
            })}
          </ul>
        </>
      </div>
    </div>
  );
};

export default BottomNavigation;
