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

  it('calls the handleCardView function ', () => {
    const handleViewSpy = jest.spyOn(
      wrapper.instance(), 'handleCardView'
    );
    const event = { target: { nodeName: 'DIV' }, persist: jest.fn() };
    wrapper.find('div').at(1).simulate('click', event);
    expect(handleViewSpy.mock.calls.length).toEqual(1);
  });

  it('calls the handleEditIconClick function ', () => {
    const handleClickSpy = jest.spyOn(
      wrapper.instance(), 'handleEditIconClick'
    );
    const event = { target: { nodeName: 'I' }, persist: jest.fn() };
    wrapper.find('Icon').simulate('click', event);
    expect(handleClickSpy.mock.calls.length).toEqual(1);
  });
});
