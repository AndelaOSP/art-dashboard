import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import AssetTypesAction from '../components/AssetTypesAction';

import details from '../_mock/assetType';

describe('Renders <AssetTypesAction /> correctly', () => {
  const props = {
    details
  };
  const wrapper = shallow(<AssetTypesAction
    {...props}
  />
  );

  it('renders the  ArtModal component when the view button is tiggered', () => {
    wrapper.setProps({
      details
    });
    expect(wrapper.find('ActionComponent').length > 0).toBeTruthy();
    const actionComponent = wrapper.find('ActionComponent');
    const viewWrapper = actionComponent.prop('viewWrapper');
    expect(typeof viewWrapper).toBe('function');
    const artModal = viewWrapper(1);
    expect(artModal.props.trigger).toBe(1);
  });
});
