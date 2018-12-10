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

const fetchInfo = (url, loadingCallback) => {
  loadingCallback(true);

  return axios.get(url)
    .then((response) => {
      loadingCallback(false);
      return response.data;
    })
    .catch((error) => {
      loadingCallback(false);
      return handleAxiosErrors(error);
    });
};

export default fetchInfo;
