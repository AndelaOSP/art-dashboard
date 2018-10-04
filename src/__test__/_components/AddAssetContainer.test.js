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
  toastMessageContent: {},
  loadCategoriesDropdown: jest.fn(),
  loadSubCategoriesDropdown: jest.fn(),
  loadAssetTypes: jest.fn(),
  loadAssetMakes: jest.fn(),
  loadAssetMakesDropdown: jest.fn(),
  loadModelNumbers: jest.fn(),
  createAsset: async () => {},
  resetToastMessageContent: jest.fn(),
  isLoadingState: {
    isLoadingCategories: false,
    isLoadingSubcategories: false,
    isLoadingAssetTypes: false,
    isLoadingAssetMakes: false
  },
  buttonLoading: false,
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
    wrapper.setState({ step: 1 });
    expect(wrapper.find('FilterAssetComponent').exists()).toBe(true);
  });

  it('renders step 2 if step 2 is active', () => {
    wrapper.setState({ step: 2 });
    expect(wrapper.find('SpecsComponent').exists()).toBe(true);
  });

  it('renders loader if loading state is true', () => {
    wrapper.setProps({ isLoadingState: { isLoadingCategories: true } });
    expect(wrapper.find('LoaderComponent').exists()).toBe(true);
  });

  it('calls the onCreateAsset function', () => {
    const onCreateAssetSpy = jest.spyOn(
      wrapper.instance(), 'onCreateAsset'
    );

    wrapper.instance().onCreateAsset();
    expect(onCreateAssetSpy.mock.calls.length).toEqual(1);
  });
});
