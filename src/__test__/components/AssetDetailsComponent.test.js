import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import AssetDetailsComponent from '../../components/AssetDetails/AssetDetailsComponent';
import assetMocks from '../../_mock/newAllocation';
import centres from '../../_mock/centres';
import localStorageMock from '../../_mock/localStorage';

window.localStorage = localStorageMock;

describe('Renders <AssetDetailsComponent /> correctly', () => {
  const props = {
    loadAssetAssigneeUsers: jest.fn(),
    getAssetDetail: jest.fn(),
    assetDetail: assetMocks,
    assignedUser: assetMocks ? assetMocks.assigned_to : {},
    errorMessage: '',
    hasError: false,
    assetLoading: false,
    userLoading: false,
    match: {
      params: {
        id: ''
      }
    },
    loadCentres: jest.fn(),
    centreLoading: false,
    updateLoading: false,
    centreList: centres.results,
    updateAsset: async () => {},
    shouldFetchDetails: false
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AssetDetailsComponent {...props} />);
  });

  it('renders the asset detail', () => {
    expect(wrapper.find('.asset-details').length).toBe(1);
  });

  it('renders the asset details tab', () => {
    expect(wrapper.find('Tab').length).toBe(1);
  });

  it('renders the asset details tab panes', () => {
    expect(wrapper.find('Tab').dive().find('TabPane').exists()).toBe(true);
  });

  it('renders LoaderComponent if page is loading', () => {
    wrapper.setProps({ assetLoading: true });
    expect(wrapper.find('LoaderComponent').length).toBe(1);
  });

  it('calls the onChange function', () => {
    const onChangeSpy = jest.spyOn(
      wrapper.instance(), 'onChange'
    );

    const event = {
      stopPropagation: jest.fn()
    };
    const data = {};

    wrapper.instance().onChange(event, data);
    expect(onChangeSpy.mock.calls.length).toEqual(1);
  });

  it('calls the updateLocation function', () => {
    const updateLocationSpy = jest.spyOn(
      wrapper.instance(), 'updateLocation'
    );

    wrapper.instance().updateLocation();
    expect(updateLocationSpy.mock.calls.length).toEqual(1);
  });

  it('renders DropdownComponent', () => {
    wrapper.setState({
      locationForm: true
    });

    expect(wrapper.find('DropdownComponent').length).toBe(1);
  });
});
