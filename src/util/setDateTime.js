const setDateTime = (date) => {
  const oldDate = new Date(date);
  const newDate = oldDate.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const time = ` - ${addZero(oldDate.getUTCHours())}:${addZero(
    oldDate.getUTCMinutes()
  )}:${addZero(oldDate.getUTCSeconds())} UTC`;
  return newDate + time;
};

const addZero = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};

export default setDateTime;
