import axios from 'axios';

const handleAxiosErrors = (error) => {
  if (error.response) {
    return error.response.data;
  }

  if (error.request) {
    return error.request;
  }

  return error.message || 'Something went wrong! Please try again later';
};

const fetchInfo = url =>
  axios.get(url)
    .then(response => response.data)
    .catch(error => handleAxiosErrors(error));


export default fetchInfo;
