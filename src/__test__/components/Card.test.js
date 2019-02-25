import React from 'react';
import expect from 'expect';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { shallowWithStore } from 'enzyme-redux';
import { createMockStore } from 'redux-test-utils';

import CardComponent from '../../components/common/Card/Card';

describe('Card component tests', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      history: {
        push: jest.fn()
      },
      data: [{ id: 123 }],
      headings: ['Testing']
    };

    const { WrappedComponent } = withRouter(connect()(CardComponent));
    wrapper = shallowWithStore(
      <WrappedComponent {...props} />,
      createMockStore(null));
  });

  it('renders without throwing an error', () => {
    expect(() => wrapper).not.toThrow();
  });

  it('renders the card content', () => {
    expect(wrapper.find('.card').first()).toExist();
  });

  it('calls the handleView function ', () => {
    const handleViewSpy = jest.spyOn(
      wrapper.instance(), 'handleView'
    );
    const viewDetailsRoute = '';
    const data = {};

    wrapper.instance().handleView(viewDetailsRoute, data);
    expect(handleViewSpy.mock.calls.length).toEqual(1);
  });
});
