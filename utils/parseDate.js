const to24h = (time) => {
  const date = new Date(time);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

export const parseDate = (date) => {
  return new Date(date).toLocaleDateString() === new Date().toLocaleDateString()
    ? to24h(date)
    : new Date(date).toLocaleDateString();
};
