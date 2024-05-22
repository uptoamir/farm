/* eslint-disable id-denylist */
/* eslint-disable max-statements */
import axios from "axios";
import {
  detectBrowser,
  getCookies,
  getDeviceType,
  getUrlParams,
} from "./utils";

export const baseURL = `${process.env.ZAREBIN_BASE_URL}/platform/api/supervisor/v1/activities/`;

const logData: {
  isNotEvent: boolean;
  logs: any[];
} = { isNotEvent: true, logs: [] };
const isRemoteDataValid = (remoteAppData: any) => {
  const breaks = [
    ["undefined", "string"].indexOf(typeof remoteAppData.context) === -1,
    ["undefined", "string"].indexOf(typeof remoteAppData.eventName) === -1,
    ["undefined", "string"].indexOf(typeof remoteAppData.eventType) === -1,
    ["undefined", "object"].indexOf(typeof remoteAppData.userData) === -1,
    ["undefined", "object"].indexOf(typeof remoteAppData.extraData) === -1,
  ];
  return breaks.indexOf(true) === -1;
};

const remoteDataFormatter = (remoteAppData: any) => {
  if (typeof remoteAppData.userData !== "object") {
    remoteAppData.userData = {};
  }
  remoteAppData.userData.uuid = getCookies().uuid || "";
  remoteAppData.userData.sessionId = getCookies().session_id || "";
  return remoteAppData;
};

export const userLogger = async (remoteAppData: any) => {
  const options = {
    method: "POST",
    url: baseURL,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };
  if (isRemoteDataValid(remoteAppData)) {
    const data = {
      time: Date.now(),
      actionInfo: { ...remoteDataFormatter(remoteAppData) },
      urlInfo: {
        pathName: window.location.pathname,
        searchParams: getUrlParams(),
        protectionLevel: parseInt((window as any).PL, 10),
      },
      deviceInfo: {
        OS: navigator.platform,
        browserName: (detectBrowser() as any).name,
        browserVersion: (detectBrowser() as any).version,
        deviceType: getDeviceType(),
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      },
    };
    try {
      logData.logs.push(data);
      if (logData.logs.length > 10) {
        await axios({
          ...options,
          data: logData.logs,
        });
        // eslint-disable-next-line require-atomic-updates
        logData.logs = [];
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (logData.isNotEvent) {
    window.addEventListener("beforeunload", function () {
      navigator.sendBeacon(baseURL, JSON.stringify(logData.logs));
    });
    logData.isNotEvent = false;
  }
};

export default userLogger;
