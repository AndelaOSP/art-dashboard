import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import SubCategory from '../../_components/SubCategory/AddSubCategoriesContainer';

const props = {
  toastMessageContent: {
    type: 'success',
    message: ''
  },
  loadCategoriesDropdown: jest.fn(),
  createSubCategory: jest.fn(),
  toggleModal: jest.fn(),
  resetToastMessageContent: jest.fn(),
  categoriesList: []
};

describe('Renders <AddSubCategoriesContainer /> tests', () => {
  const wrapper = shallow(<SubCategory.WrappedComponent {...props} />);

  it('calls the onAddSubCategory function', () => {
    const onAddSubCategorySpy = jest.spyOn(
      wrapper.instance(), 'onAddSubCategory'
    );
    const event = { target: { value: '' } };
    const data = {};

    wrapper.instance().onAddSubCategory(event, data);
    expect(onAddSubCategorySpy.mock.calls.length).toEqual(1);
  });

  it('calls the onSelectCategory function', () => {
    const onSelectCategorySpy = jest.spyOn(
      wrapper.instance(), 'onSelectCategory'
    );
    const event = { target: { value: '' } };
    const data = {};

    wrapper.instance().onSelectCategory(event, data);
    expect(onSelectCategorySpy.mock.calls.length).toEqual(1);
  });

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
});
