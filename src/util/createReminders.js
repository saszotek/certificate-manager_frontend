const createReminders = (data) => {
  const ics = require("ics");

  const { error, value } = ics.createEvents(generateEvents(data));

  if (error) {
    console.error(error);
    alert(error.errors);
    return;
  }

  return value;
};

const generateEvents = (data) => {
  let eventsArray = [];

  data.forEach((item) => {
    let event = {
      uid: `${item[0]}`,
      title: `Serial number: ${item[0]}`,
      start: setStartEvent(item[1]),
      duration: { hours: 1 },
      alarms: [
        {
          action: "display",
          description: "Reminder",
          trigger: { hours: 24, minutes: 0, before: true },
        },
        {
          action: "display",
          description: "Reminder",
          trigger: { hours: 72, minutes: 0, before: true },
        },
        {
          action: "display",
          description: "Reminder",
          trigger: { hours: 168, minutes: 0, before: true },
        },
        {
          action: "display",
          description: "Reminder",
          trigger: { hours: 336, minutes: 0, before: true },
        },
      ],
    };

    eventsArray.push(event);
  });

  return eventsArray;
};

const setStartEvent = (date) => {
  const newDate = new Date(date);

  return [
    newDate.getUTCFullYear(),
    newDate.getUTCMonth() + 1,
    newDate.getDate(),
    newDate.getUTCHours(),
    newDate.getUTCMinutes(),
  ];
};

export default createReminders;
