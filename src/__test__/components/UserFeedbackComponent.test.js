import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { UserFeedbackComponent } from '../../components/User/UserFeedbackComponent';

import feedback from '../../_mock/userFeedback';

describe('<UserFeedbackComponent /> tests', () => {
  let props = {
    feedbackAction: jest.fn(),
    handlePaginationChange: jest.fn(),
    handleRowChange: jest.fn(),
    isLoading: false,
    hasError: false,
    feedback,
    feedbackCount: 3
  };

  let wrapper = shallow(<UserFeedbackComponent {...props} />);

  it('renders Pagination component', () => {
    expect(wrapper.find('Pagination').length).toBe(1);
  });

  it('renders Table component', () => {
    expect(wrapper.find('Table').length).toBe(1);
  });

  it('renders TableRowComponent component', () => {
    expect(wrapper.find('TableRowComponent').length).toBe(3);
  });

  it('renders Action component', () => {
    expect(wrapper.find('ActionComponent').length).toBe(3);
  });

  it('renders Loader component if isLoading is true', () => {
    props = {
      feedbackAction: jest.fn(),
      handlePaginationChange: jest.fn(),
      isLoading: true,
      hasFeedback: true,
      feedback,
      feedbackCount: 3
    };

    wrapper = shallow(<UserFeedbackComponent {...props} />);
    expect(wrapper.find('LoaderComponent').length).toBe(1);
  });

  it('calls the handlePaginationChange function when a new page is clicked', () => {
    const handlePaginationChangeSpy = jest.spyOn(
      wrapper.instance(), 'handlePaginationChange'
    );
    const event = {};
    const data = {};

    wrapper.instance().handlePaginationChange(event, data);
    expect(handlePaginationChangeSpy.mock.calls.length).toEqual(1);
  });

  it('renders message if hasError is true', () => {
    wrapper.setProps({
      isLoading: false,
      hasError: true,
      feedback: [],
      feedbackCount: 0
    });

    expect(wrapper.find('h1').text()).toEqual('An Error Occurred While Trying To Display User Feedback.');
  });

  it('calls the handleRowChange function when the row dropdown is changed', () => {
    const handleRowChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleRowChange'
    );
    const event = {};
    const data = {};

    wrapper.instance().handleRowChange(event, data);
    expect(handleRowChangeSpy.mock.calls.length).toEqual(1);
  });
});
