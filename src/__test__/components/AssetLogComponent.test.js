import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { AssetLogComponent, mapStateToProps } from '../../components/AssetLogs/AssetLogComponent';

import assetLogs from '../../_mock/assetMakes';

describe('Renders <AssetLogComponent /> correctly', () => {
  const props = {
    loadAssetLogs: jest.fn(),
    isLoading: false,
    assetLogs
  };
  let wrapper = shallow(<AssetLogComponent {...props} />);

  it('renders Loading component if isLoading is true', () => {
    props.isLoading = true;
    wrapper = shallow(<AssetLogComponent {...props} />);
    expect(wrapper.find('LoaderComponent').length).toBe(1);
  });

  it('renders Table component', () => {
    props.isLoading = false;
    wrapper = shallow(<AssetLogComponent {...props} />);
    expect(wrapper.find('Accordion').length).toBe(1);
  });
});

it('calls mapStateToProps', () => {
  const state = {
    logs: {
      assetLogs: [], isLoading: false, assetLogsCount: 5
    }
  };

  const expected = {
    logs: {
      assetLogs: [], isLoading: false, assetLogsCount: 5
    }
  };

  expect(mapStateToProps(state)).toEqual(expected.logs);
});
