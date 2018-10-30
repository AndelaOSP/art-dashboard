import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import FilterAsset from '../../components/Assets/FilterAssetComponent';

const props = {
  handleDropdownChanges: jest.fn(),
  filteredSubCategories: [],
  filteredAssetTypes: [],
  filteredAssetMakes: [],
  filteredModelNumbers: [],
  onNextClicked: jest.fn(),
  isDisabled: false,
  categories: [],
  buttonLoading: false,
  selectedCategory: '',
  selectedSubcategory: '',
  selectedAssetType: '',
  selectedAssetMake: '',
  onSelectModelNumber: jest.fn(),
  onAddSerialNumber: jest.fn(),
  onAddAssetTag: jest.fn(),
  modelNumber: '',
  assetTag: '',
  serialNumber: '',
  onChangeButtonState: jest.fn(),
  isAssetSpecsAvailable: false,
  onCreateAsset: jest.fn(),
  handleInputChange: jest.fn()
};

describe('<FilterAssetComponent /> test cases', () => {
  const wrapper = shallow(<FilterAsset {...props} />);

  afterEach(() => {
    wrapper.setProps(props);
  });

  it('renders next button when asset specs are available', () => {
    wrapper.setProps({
      isAssetSpecsAvailable: true,
      isDisabled: false
    });

    expect(wrapper.find('ButtonComponent').props().buttonName).toBe('Next');
  });

  it('displays a message when modelNumber, assetTag and serialNumber are not blank', () => {
    wrapper.setProps({
      modelNumber: 'yuhij',
      assetTag: 'vgyuhijk',
      serialNumber: 'vgyuhj'
    });

    expect(wrapper.find('SaveButton').dive().find('.optional-label-text').exists()).toBe(true);
  });
});
