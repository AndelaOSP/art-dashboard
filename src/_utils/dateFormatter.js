export default (timeStamp) => {
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return new Date(timeStamp).toLocaleDateString('en-US', dateOptions);
};
