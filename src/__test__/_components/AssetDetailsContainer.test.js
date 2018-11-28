import expect from 'expect';

import {
  isSameId,
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
    },
    centres: {
      centreList: []
    }
  };

  it('calls fetchAssetDetail function correctly', () => {
    expect(isSameId(props.assetDetail, props)).toEqual(false);
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
        isLoading: false,
        updateLoading: false,
        success: ''
      },
      usersList: {
        assetAsigneeUsers: [],
        isLoading: false
      },
      centres: {
        centreCount: 0,
        centreList: [],
        isLoading: false,
        error: ''
      }
    };
    const expected = {
      shouldFetchDetails: true,
      shouldAddToStore: false,
      assetDetail: {},
      errorMessage: '',
      hasError: false,
      newAllocation: {},
      unAssignedAsset: {},
      buttonLoading: false,
      assetLoading: false,
      userLoading: false,
      assetAsigneeUsers: [],
      centreList: [],
      centreLoading: false,
      updateLoading: false,
      success: ''
    };

    expect(mapStateToProps(state, props)).toEqual(expected);
  });
});
