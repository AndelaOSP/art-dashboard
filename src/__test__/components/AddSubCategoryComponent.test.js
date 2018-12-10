import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import AddSubCategoryComponent from '../../components/SubCategory/AddSubCategoryComponent';

describe('Renders <AddSubCategoryComponent /> correctly', () => {
  const props = {
    categoriesList: [],
    categorySelectedId: 1,
    buttonState: false,
    handleSubmit: jest.fn(),
    onAddSubCategory: jest.fn(),
    onSelectCategory: jest.fn(),
    toggleModal: jest.fn(),
    onChangeButtonState: jest.fn(),
    isLoading: false
  };

  const wrapper = shallow(<AddSubCategoryComponent {...props} />);

  it('renders form', () => {
    expect(wrapper.find('Form').length).toBe(1);
  });

  it('renders LoaderComponent', () => {
    wrapper.setProps({
      isLoading: true
    });

    expect(wrapper.find('LoaderComponent').length).toBe(1);
  });
});
