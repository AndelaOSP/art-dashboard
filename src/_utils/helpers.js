import axios from 'axios';

const pageOffset = (pageNumber, limit) => pageNumber * limit;

export const isCountCutoffExceeded = (cutoff = 100) => (pageNumber, limit) => {
  const offset = pageOffset(pageNumber, limit);
  return offset > cutoff;
};

export const fetchData = url => axios.get(url);
