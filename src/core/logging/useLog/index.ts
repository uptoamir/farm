const actionCreator = (
  eventType: "Click" | "Error" | "Submit" | "Event" | "ResponseTime",
  eventName: string,
  extraData = {},
  context = "SPORT"
) => ({
  eventType,
  eventName,
  context,
  extraData,
});

export default actionCreator;
