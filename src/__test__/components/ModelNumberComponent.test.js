import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import ModelNumberComponent from '../../components/ModelNumber/ModelNumberComponent';

describe('Renders <ModelNumberComponent /> correctly', () => {
  const props = {
    handleSubmit: jest.fn(),
    onAddModelNumber: jest.fn(),
    onSelectAssetMake: jest.fn(),
    toggleModal: jest.fn(),
    onChangeButtonState: jest.fn(),
    assetMakes: [],
    assetMakeSelectedId: 1,
    buttonState: false,
    isLoading: false
  };

  const wrapper = shallow(<ModelNumberComponent {...props} />);

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
