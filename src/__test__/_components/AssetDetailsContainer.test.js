import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import {
  AssetDetailsContainer,
  mapStateToProps
} from '../../_components/AssetDetails/AssetDetailsContainer';
import assetMocks from '../../_mock/newAllocation';

describe('Renders <AssetDetailsContainer /> correctly', () => {
  const props = {
    assetDetail: assetMocks.assetDetails,
    errorMessage: '',
    loadAssetAssigneeUsers: jest.fn(),
    allocateAsset: jest.fn(),
    getAssetDetail: jest.fn(),
    unassignAsset: jest.fn(),
    hasError: false,
    isLoading: false,
    location: {
      pathname: ''
    },
    match: {
      params: {
        id: ''
      }
    }
  };
  const wrapper = shallow(<AssetDetailsContainer {...props} />);

  it('renders page title', () => {
    expect(wrapper.find('Header').prop('content')).toEqual('Asset Detail');
  });

  it('renders the AssetsDetailsContent component', () => {
    expect(wrapper.find('AssetDetailsComponent').length).toBe(1);
  });

  it('renders Loader when assetDetail is empty', () => {
    wrapper.setProps({ assetDetail: {} });
    expect(wrapper.find('LoaderComponent').length).toBe(1);
  });

  it('correctly maps state to props', () => {
    const state = {
      asset: {
        assetDetail: {},
        errorMessage: '',
        hasError: false,
        newAllocation: {},
        unAssignedAsset: {},
        buttonLoading: false,
        isLoading: false
      },
      usersList: {
        assetAsigneeUsers: [],
        isLoading: false
      }
    };
    const expected = {
      assetDetail: {},
      errorMessage: '',
      hasError: false,
      newAllocation: {},
      unAssignedAsset: {},
      buttonLoading: false,
      assetLoading: false,
      userLoading: false,
      assetAsigneeUsers: []
    };

    expect(mapStateToProps(state)).toEqual(expected);
  });
});
