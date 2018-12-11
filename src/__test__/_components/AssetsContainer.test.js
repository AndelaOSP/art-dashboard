import expect from 'expect';
import { mapStateToProps } from '../../_components/Assets/AssetsContainer';

describe('Renders <Assets />  tests', () => {
  it('calls mapStateToProps', () => {
    const state = {
      assets: {
        assetsList: [],
        isLoading: false,
        assetsCount: 0,
        errorMessage: '',
        hasError: false,
        activePage: 1,
        status: ''
      },
      assetModelsList: {
        assetModel: []
      },
      assetTypesList: {
        assetTypes: []
      },
      selected: []
    };

    const ownProps = {
      match: {
        params: {
          status: ''
        }
      }
    };

    const expected = {
      isLoading: false,
      assetsList: [],
      assetsCount: 0,
      errorMessage: '',
      hasError: false,
      activePage: 1,
      selected: [],
      status: '',
      shouldReload: false
    };

    expect(mapStateToProps(state, ownProps)).toEqual(expected);
  });
});
