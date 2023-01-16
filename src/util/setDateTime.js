const setDateTime = (date) => {
  const oldDate = new Date(date);
  const newDate = oldDate.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const time = ` - ${addZero(oldDate.getHours())}:${addZero(
    oldDate.getMinutes()
  )} CET`;
  return newDate + time;
};

const addZero = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};

export default setDateTime;
