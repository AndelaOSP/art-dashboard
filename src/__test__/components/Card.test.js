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
      headings: ['Testing'],
      onClick: jest.fn(),
      showAction: true
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
    const viewDetailsRoute = 'test/route';
    const data = {};
    const event = { target: { nodeName: 'DIV' } };
    wrapper.instance().handleView(viewDetailsRoute, data, event);
    wrapper.find('div').at(0).simulate('click', event);
    expect(handleViewSpy.mock.calls.length).toEqual(1);
  });

  it('calls the handleClick function ', () => {
    const handleClickSpy = jest.spyOn(
      wrapper.instance(), 'handleClick'
    );
    const event = { target: { nodeName: 'I' } };
    const data = {};
    wrapper.instance().handleClick(data, event);
    expect(handleClickSpy.mock.calls.length).toEqual(1);
  });
});
