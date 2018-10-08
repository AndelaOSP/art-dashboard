import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import Specs from '../../components/Assets/SpecsComponent';

const props = {
  pickRadioValuesFromSpecsComponent: jest.fn(),
  goBack: jest.fn(),
  onCreateAsset: jest.fn(),
  buttonLoading: false,
  isDisabled: false,
  specs: {
    processorType: '',
    processorSpeed: '',
    screenSize: '',
    storage: '',
    memory: '',
    year: ''
  }
};

describe('<SpecsComponent /> test cases', () => {
  const wrapper = shallow(<Specs {...props} />);

  afterEach(() => {
    wrapper.setProps(props);
  });

  it('renders processor speed radio buttons', () => {
    expect(wrapper.find('#processor-speed').find('FormRadio').first().props().name)
      .toBe('processorSpeed');
  });

  it('renders processor type radio buttons', () => {
    expect(wrapper.find('#processor-type').find('FormRadio').first().props().name)
      .toBe('processorType');
  });

  it('renders memory radio buttons', () => {
    expect(wrapper.find('#memory').find('FormRadio').first().props().name).toBe('memory');
  });

  it('renders storage radio buttons', () => {
    expect(wrapper.find('#storage').find('FormRadio').first().props().name).toBe('storage');
  });

  it('renders screen size radio buttons', () => {
    expect(wrapper.find('#screen-size').find('FormRadio').first().props().name).toBe('screenSize');
  });

  it('calls the handleChange function', () => {
    const handleChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleChange'
    );

    const event = {};
    const data = {};

    wrapper.instance().handleChange(event, data);
    expect(handleChangeSpy.mock.calls.length).toEqual(1);
  });
});
