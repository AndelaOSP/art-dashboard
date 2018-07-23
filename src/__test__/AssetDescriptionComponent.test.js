import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import AssetDescriptionComponent from '../components/AssetDescriptionComponent';

describe('Renders <AssetDescriptionComponent /> correctly', () => {
  const props = {
    assignedUser: {},
    toggleState: '',
    selectedUser: '',
    assignedAsset: {}
  };
  const wrapper = shallow(<AssetDescriptionComponent {...props} />);

  it('renders the asset description component', () => {
    expect(wrapper.find('.asset-description').length).toBe(1);
  });

  it('renders the assign button and dropdown when no user is assigned', () => {
    wrapper.setProps({ toggleState: '' });
    expect(wrapper.find('.assign-asset').length).toBe(1);
    expect(wrapper.find('DropdownComponent').length).toBe(1);
  });

  it('renders the unassign button and email when a user is assigned', () => {
    wrapper.setProps({ toggleState: 'assignedUser' });
    expect(wrapper.find('.unassign-asset').length).toBe(1);
    expect(wrapper.find('#email').length).toBe(1);
  });
});
