// third-party libraries
import axios from 'axios';

// constants
import constants from '../_constants';

const {
  LOAD_ASSET_MODEL_NUMBERS,
  CREATE_MODEL_NUMBER_SUCCESS,
  CREATE_MODEL_NUMBER_FAILURE,
  UPDATE_TOAST_MESSAGE_CONTENT
} = constants;

/**
 * load Model Numbers thunk
 *
 * @return dispatch
 */
export const loadModelNumbers = () => (dispatch =>
  axios.get('https://my-json-server.typicode.com/HawiCaesar/jsonplaceholders-demo/model_numbers').then((response) => {
    dispatch(loadModelNumbersSuccess(response.data));
  })
);

/**
 * load ModelNumbers Success action creator
 *
 * @param {array} modelNumbers list of fetched model numbers
 *
 * @return {object} type and payload
 */
export const loadModelNumbersSuccess = modelNumbers => (
  { type: LOAD_ASSET_MODEL_NUMBERS, payload: modelNumbers }
);

/**
 * create new asset model number thunk
 * @param {object} newModel details of new model to be created
 *
*/
export const createModelNumbers = newModel => dispatch =>
  axios.post('https://my-json-server.typicode.com/HawiCaesar/jsonplaceholders-demo/model_numbers', newModel).then((response) => {
    dispatch(createModelNumberSuccess(response.data));
    dispatch(updateToastMessageContent('Model Number Saved Successfully',
      'success'));
  }).catch((error) => {
    dispatch(createModelNumberFailure(error));
    dispatch(updateToastMessageContent('Could Not Save The Model Number',
      'error'));
  }
  );

export const createModelNumberSuccess = modelNumber => (
  { type: CREATE_MODEL_NUMBER_SUCCESS, payload: modelNumber }
);

export const createModelNumberFailure = error => (
  { type: CREATE_MODEL_NUMBER_FAILURE, payload: error }
);

export const updateToastMessageContent = (message, type) => (
  {
    type: UPDATE_TOAST_MESSAGE_CONTENT,
    payload: {
      message,
      type
    }
  }
);

