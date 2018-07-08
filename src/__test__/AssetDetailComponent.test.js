import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { AssetDetailComponent } from '../components/AssetDetailComponent';
import asset from '../_mock/asset';

describe('Renders <AssetDetailComponent /> correctly', () => {
  const props = {
    assetDetail: asset,
    errorMessage: '',
    getAssetDetail: jest.fn(),
    hasError: false,
    isLoading: false,
    location: {
      pathname: ''
    }
  };
  const wrapper = shallow(<AssetDetailComponent {...props} />);

  it('renders page title', () => {
    expect(wrapper.find('Header').prop('content')).toEqual('Asset Detail');
  });

  it('renders the AssetsDetailsContent component', () => {
    expect(wrapper.find('AssetDetailContent').length).toBe(1);
  });

  it('should not rerender the component if the error message is the same', () => {
    const shouldComponentUpdateSpy = jest.spyOn(
      wrapper.instance(), 'shouldComponentUpdate'
    );
    wrapper.setProps({ hasError: true });
    expect(shouldComponentUpdateSpy.mock.calls.length).toBe(1);
  });

  it('should rerender the component if the error message changes', () => {
    const shouldComponentUpdateSpy = jest.spyOn(
      wrapper.instance(), 'shouldComponentUpdate'
    );
    wrapper.setProps({ hasError: true, errorMessage: 'error' });
    expect(shouldComponentUpdateSpy.mock.calls.length).toBe(2);
  });
});
