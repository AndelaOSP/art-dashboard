import axios from 'axios';
import fetchInfo from '../../_utils/ajax';

jest.mock('axios');

describe('Ajax helper tests', () => {
  const success = (data = { results: [] }) => (
    axios.get.mockImplementation(() =>
      Promise.resolve({ data })
    )
  );

  const error = (errorResponse = '') => (
    axios.get.mockImplementation(() =>
      Promise.reject(errorResponse)
    )
  );

  const url = '/testing-request';
  const loadingCallback = jest.fn();

  it('executes the loading callback with a value of true', async () => {
    success();
    await fetchInfo(url, loadingCallback);
    expect(loadingCallback).toHaveBeenCalledWith(true);
  });

  it('returns the response data on successful completion of the request', async () => {
    const data = {
      results: [
        {
          id: 1,
          first_name: 'Test',
          last_name: 'User',
          email: 'test@email.com',
          cohort: 10,
          allocated_asset_count: 0
        }
      ]
    };

    success(data);
    const results = await fetchInfo(url, loadingCallback);
    expect(results).toEqual(data);
  });

  it('returns the response data on error response', async () => {
    const errorData = {
      response: {
        data: {
          message: 'An error occured!'
        }
      }
    };

    error(errorData);
    const response = await fetchInfo(url, loadingCallback);
    expect(response).toEqual({ message: 'An error occured!' });
  });

  it('returns the request error', async () => {
    const requestError = {
      request: 'Network error!'
    };

    error(requestError);
    const response = await fetchInfo(url, loadingCallback);
    expect(response).toEqual('Network error!');
  });

  it('returns the error message', async () => {
    const message = 'Oops! Something went wrong';
    error({ message });
    const response = await fetchInfo(url, loadingCallback);
    expect(response).toEqual('Oops! Something went wrong');
  });

  it('returns the default error message', async () => {
    error();
    const response = await fetchInfo(url, loadingCallback);
    expect(response).toEqual('Something went wrong! Please try again later');
  });

  it('calls the loading callback with a false value on comlpletion of a request', async () => {
    success();
    await fetchInfo(url, loadingCallback);
    expect(loadingCallback).toHaveBeenLastCalledWith(false);
  });
});
