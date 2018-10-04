import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import Specs from '../../components/Assets/SpecsComponent';

const props = {
  pickRadioValuesFromSpecsComponent: jest.fn(),
  onChangeButtonState: jest.fn(),
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

  it('calls the handleRadioChanges function', () => {
    const handleRadioChangesSpy = jest.spyOn(
      wrapper.instance(), 'handleRadioChanges'
    );

    const event = {};
    const data = {};

    wrapper.instance().handleRadioChanges(event, data);
    expect(handleRadioChangesSpy.mock.calls.length).toEqual(1);
  });

  it('calls the onSelectYearOfManufacture function', () => {
    const onSelectYearOfManufactureSpy = jest.spyOn(
      wrapper.instance(), 'onSelectYearOfManufacture'
    );

    const event = {};
    const data = {};

    wrapper.instance().onSelectYearOfManufacture(event, data);
    expect(onSelectYearOfManufactureSpy.mock.calls.length).toEqual(1);
  });
});
