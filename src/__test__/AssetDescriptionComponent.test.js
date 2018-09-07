import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import AssetDescriptionComponent from '../components/AssetDescriptionComponent';

describe('Renders <AssetDescriptionComponent /> correctly', () => {
  const props = {
    assignedUser: {},
    selectedUser: ''
  };
  const wrapper = mount(<AssetDescriptionComponent {...props} />);

  it('renders the asset description component', () => {
    expect(wrapper.find('.asset-description').exists()).toEqual(true);
  });

  it('renders the assign button and dropdown when no user is assigned', () => {
    wrapper.setProps({ assignedUser: {}, assignAssetButtonState: true });
    expect(wrapper.find('ButtonComponent').props().buttonName).toBe('Assign Asset');
    expect(wrapper.find('DropdownComponent').length).toBe(1);
  });

  it('renders the unassign button and email when a user is assigned', () => {
    wrapper.setProps({ assignedUser: { email: 'email@TextTrackList.com' }, assignAssetButtonState: false });
    expect(wrapper.find('ButtonComponent').props().buttonName).toBe('Unassign Asset');
    expect(wrapper.find('#email').length).toBe(1);
  });
});
