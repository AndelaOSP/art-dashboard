import expect from 'expect';
import models from '../../_mock/assetModels';
import types from '../../_mock/assetTypes';
import { mapStateToProps, createFilterData } from '../../_components/Assets/AssetsContainer';

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
      props: {
        match: {
          params: {
            status: ''
          }
        }
      }
    };

    const expected = {
      isLoading: false,
      assetsList: [],
      assetsCount: 0,
      errorMessage: '',
      filterData: [],
      hasError: false,
      activePage: 1,
      selected: [],
      status: '',
      shouldReload: false
    };

    expect(mapStateToProps(state, ownProps)).toEqual(expected);
  });

  it('calls createFilterData', () => {
    const expected = [
      {
        title: 'Asset Types',
        content: [
          { id: 0, option: 'Timor-Leste' },
          { id: 1, option: 'monitoring' },
          { id: 2, option: 'circuit' }
        ]
      },
      {
        title: 'Model Numbers',
        content: [
          { id: 1, option: 'MC-LifeChat 5' },
          { id: 2, option: 'Microsoft Lifechat LX-6000' },
          { id: 3, option: 'Spectre x360' }
        ]
      }
    ];
    expect(createFilterData(types, models)).toEqual(expected);
  });
});
