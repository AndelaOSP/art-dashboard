import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import AddAsset from '../../_components/Assets/AddAssetContainer';

const props = {
  categories: [],
  subcategories: [],
  assetTypes: [],
  assetMakes: [],
  modelNumbers: [],
  assets: [],
  loadCategoriesDropdown: jest.fn(),
  loadSubCategoriesDropdown: jest.fn(),
  loadAssetTypes: jest.fn(),
  loadAssetMakesDropdown: jest.fn(),
  loadModelNumbers: jest.fn(),
  createAsset: async () => {},
  loading: false,
  buttonLoading: false,
  success: '',
  error: '',
  history: {
    push: jest.fn()
  }
};

describe('<AddAssetContainer /> test cases', () => {
  const wrapper = shallow(<AddAsset.WrappedComponent {...props} />);

  afterEach(() => {
    wrapper.setProps(props);
  });

  it('renders step 1 if step 1 is active', () => {
    wrapper.setState({ step: 'Device_Information' });
    expect(wrapper.find('FilterAssetComponent').exists()).toBe(true);
  });

  it('renders step 2 if step 2 is active', () => {
    wrapper.setState({ step: 'Device_Specifications' });
    expect(wrapper.find('SpecsComponent').exists()).toBe(true);
  });

  it('renders loader if loading state is true', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find('LoaderComponent').exists()).toBe(true);
  });

  it('calls the handleDropdownChanges function', () => {
    const handleDropdownChangesSpy = jest.spyOn(
      wrapper.instance(), 'handleDropdownChanges'
    );

    const event = {
      stopPropagation: jest.fn(),
      target: {}
    };
    const data = {};

    wrapper.instance().handleDropdownChanges(event, data);
    expect(handleDropdownChangesSpy.mock.calls.length).toEqual(1);
  });

  it('calls the onCreateAsset function', () => {
    const onCreateAssetSpy = jest.spyOn(
      wrapper.instance(), 'onCreateAsset'
    );

    wrapper.instance().onCreateAsset();
    expect(onCreateAssetSpy.mock.calls.length).toEqual(1);
  });

  it('calls the handleInputChange function', () => {
    const handleInputChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleInputChange'
    );

    const event = {
      stopPropagation: jest.fn(),
      target: {
        name: ''
      }
    };
    const data = {};

    wrapper.instance().handleInputChange(event, data);
    expect(handleInputChangeSpy.mock.calls.length).toEqual(1);
  });

  it('calls the onNextClicked function', () => {
    const onNextClickedSpy = jest.spyOn(
      wrapper.instance(), 'onNextClicked'
    );

    wrapper.instance().onNextClicked();
    expect(onNextClickedSpy.mock.calls.length).toEqual(1);
  });

  it('calls the goBack function', () => {
    const goBackSpy = jest.spyOn(
      wrapper.instance(), 'goBack'
    );

    wrapper.instance().goBack();
    expect(goBackSpy.mock.calls.length).toEqual(1);
  });

  it('calls the pickRadioValuesFromSpecsComponent function', () => {
    const pickRadioValuesFromSpecsComponentSpy = jest.spyOn(
      wrapper.instance(), 'pickRadioValuesFromSpecsComponent'
    );

    const data = {};

    wrapper.instance().pickRadioValuesFromSpecsComponent(data);
    expect(pickRadioValuesFromSpecsComponentSpy.mock.calls.length).toEqual(1);
  });

  it('calls the stepValidator function', () => {
    const stepValidatorSpy = jest.spyOn(
      wrapper.instance(), 'stepValidator'
    );

    wrapper.instance().stepValidator();
    expect(stepValidatorSpy.mock.calls.length).toEqual(1);
  });

  it('sets state correctly when handleDropdownChanges is called with asset-category', () => {
    jest.spyOn(wrapper.instance(), 'handleDropdownChanges');

    const event = {
      stopPropagation: jest.fn(),
      target: {}
    };
    const data = {
      name: 'asset-category',
      value: 'Electronics'
    };

    wrapper.instance().handleDropdownChanges(event, data);
    expect(wrapper.state().formState.selectedCategory).toEqual('Electronics');
  });

  it('sets state correctly when handleDropdownChanges is called with asset-subcategory', () => {
    jest.spyOn(wrapper.instance(), 'handleDropdownChanges');

    const event = {
      stopPropagation: jest.fn(),
      target: {}
    };
    const data = {
      name: 'asset-subcategory',
      value: 'Computers'
    };

    wrapper.instance().handleDropdownChanges(event, data);
    expect(wrapper.state().formState.selectedSubcategory).toEqual('Computers');
  });

  it('sets state correctly when handleDropdownChanges is called with asset-types', () => {
    jest.spyOn(wrapper.instance(), 'handleDropdownChanges');

    const event = {
      stopPropagation: jest.fn(),
      target: {}
    };
    const data = {
      name: 'asset-types',
      value: 'MacBook'
    };

    wrapper.instance().handleDropdownChanges(event, data);
    expect(wrapper.state().formState.selectedAssetType).toEqual('MacBook');
  });

  it('sets state correctly when handleDropdownChanges is called with asset-makes', () => {
    jest.spyOn(wrapper.instance(), 'handleDropdownChanges');

    const event = {
      stopPropagation: jest.fn(),
      target: {}
    };
    const data = {
      name: 'asset-makes',
      value: 'MacBook Pro'
    };

    wrapper.instance().handleDropdownChanges(event, data);
    expect(wrapper.state().formState.selectedAssetMake).toEqual('MacBook Pro');
  });

  it('shows device specs step if asset has specs', () => {
    wrapper.setProps({ assetTypes: [{
      asset_sub_category: 'Computers',
      asset_type: 'MacBook',
      has_specs: true,
      id: 5,
      last_modified: '2018-12-14T12:57:50.108712Z'
    }] });

    jest.spyOn(wrapper.instance(), 'handleDropdownChanges');

    const event = {
      stopPropagation: jest.fn(),
      target: {}
    };
    const data = {
      name: 'asset-types',
      value: 'MacBook'
    };

    wrapper.instance().handleDropdownChanges(event, data);
    wrapper.update();
    expect(wrapper.find('StepDescription').length).toEqual(2);
  });

  it('hide device specs step if asset does not have specs', () => {
    wrapper.setProps({ assetTypes: [{
      asset_sub_category: 'Computers',
      asset_type: 'MacBook',
      has_specs: false,
      id: 5,
      last_modified: '2018-12-14T12:57:50.108712Z'
    }] });

    jest.spyOn(wrapper.instance(), 'handleDropdownChanges');

    const event = {
      stopPropagation: jest.fn(),
      target: {}
    };
    const data = {
      name: 'asset-types',
      value: 'MacBook'
    };

    wrapper.instance().handleDropdownChanges(event, data);
    wrapper.update();
    expect(wrapper.find('StepDescription').length).toEqual(1);
  });
});
