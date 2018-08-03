import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import constants from '../../_constants';
import feedbackAction from '../../_actions/userFeedback.actions';
import feedbackMock from '../../_mock/userFeedback';

const { LOAD_FEEDBACK_SUCCESS, LOAD_FEEDBACK_FAILURE, LOADING_FEEDBACK } = constants;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;


describe('User Feedback action tests', () => {
  const mock = new MockAdapter(axios);
  store = mockStore({});

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch LOAD_FEEDBACK_SUCCESS when feedback are loaded successfully', () => {
    mock.onGet().reply(200, feedbackMock);
    return store.dispatch(feedbackAction()).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_FEEDBACK);
      expect(store.getActions()[1].type).toEqual(LOAD_FEEDBACK_SUCCESS);
    });
  });

  it('should dispatch LOAD_FEEDBACK_FAILURE when feedback are not loaded', () => {
    mock.onGet().reply(401);
    return store.dispatch(feedbackAction()).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_FEEDBACK);
      expect(store.getActions()[1].type).toEqual(LOAD_FEEDBACK_FAILURE);
    });
  });
});
