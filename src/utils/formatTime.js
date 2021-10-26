const formatTime = (date) =>
  new Date(date).toJSON().match(/\d{2}:\d{2}.\d{3}/)[0];

export default formatTime;
