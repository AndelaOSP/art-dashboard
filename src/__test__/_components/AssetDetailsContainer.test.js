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
        isLoading: false
      },
      usersList: {
        assetAsigneeUsers: [],
        isLoading: false
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
      assetAsigneeUsers: []
    };

    expect(mapStateToProps(state, props)).toEqual(expected);
  });
});
