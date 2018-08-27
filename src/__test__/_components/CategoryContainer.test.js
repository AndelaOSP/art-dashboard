import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import Category from '../../_components/Category/CategoryContainer';

const props = {
  toastMessageContent: {
    type: 'success',
    message: ''
  },
  createCategory: jest.fn(),
  toggleModal: jest.fn(),
  resetToastMessageContent: jest.fn()
};

describe('Renders <CategoryContainer /> tests', () => {
  const wrapper = shallow(<Category.WrappedComponent {...props} />);

  it('calls the onChangeButtonState function', () => {
    const onChangeButtonStateSpy = jest.spyOn(
      wrapper.instance(), 'onChangeButtonState'
    );
    const event = {};
    const data = {};

    wrapper.instance().onChangeButtonState(event, data);
    expect(onChangeButtonStateSpy.mock.calls.length).toEqual(1);
  });

  it('calls the handleSubmit function', () => {
    const handleSubmitSpy = jest.spyOn(
      wrapper.instance(), 'handleSubmit'
    );
    const event = { target: { value: '', reset: jest.fn() } };
    const data = {};

    wrapper.instance().handleSubmit(event, data);
    expect(handleSubmitSpy.mock.calls.length).toEqual(1);
  });

  it('calls the onAddCategory function', () => {
    const onAddCategorySpy = jest.spyOn(
      wrapper.instance(), 'onAddCategory'
    );
    const event = { target: { value: '' } };
    const data = {};

    wrapper.instance().onAddCategory(event, data);
    expect(onAddCategorySpy.mock.calls.length).toEqual(1);
  });
});
