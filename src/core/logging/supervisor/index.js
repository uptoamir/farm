// import Analytics from "supervisor-sdk";

// const SERVICE_URL = "/platform/api/supervisor"; //testing from local host

// const SERVICE_URL =
//   process.env.ZAREBIN_BASE_URL ??
//   "https://zarebin.ir" + "/platform/api/supervisor";

// const SERVICE_URL = "https://zarebin.ir/platform/api/supervisor";

// export const analytics = new Analytics({
//   baseUrl: SERVICE_URL,
//   bufferEnabled: true,
// });

/* 
sample:
analytics.event('magnix', 'CardItemClick', {
  'foo': 'bar',
  'baz': 'quex'
});
**/

// eslint-disable-next-line no-unused-vars
export const loggerEvent = (eventName, extraData = {}) => {
  // return analytics.event("sport", eventName, extraData);
  return;
};
