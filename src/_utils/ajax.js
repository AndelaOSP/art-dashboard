import axios from 'axios';

export const handleAxiosErrors = (error) => {
  if (error.response) {
    return error.response.data.error || error.response.data;
  }

  if (error.request) {
    return error.request;
  }

  return error.message || 'Oops! Something went wrong. Please try again';
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
