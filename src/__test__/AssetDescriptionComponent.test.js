import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import AssetDescriptionComponent from '../components/AssetDescriptionComponent';
import asset from '../_mock/asset';

describe('Renders <AssetDescriptionComponent /> correctly', () => {
  const props = {
    assignedUser: {}
  };
  const wrapper = shallow(<AssetDescriptionComponent {...props} />);

  it('renders the asset description component', () => {
    expect(wrapper.find('.asset-description').length).toBe(1);
  });

  it('renders the assign user button when no user is assigned', () => {
    expect(wrapper.find('#assign-user').length).toBe(1);
    expect(wrapper.find('.unassign-button').length).toBe(0);
  });

  it('renders the unassign user button when a user is assigned', () => {
    wrapper.setProps({
      assignedUser: asset.assigned_to
    });
    expect(wrapper.find('.unassign-button').length).toBe(1);
    expect(wrapper.find('#assign-user').length).toBe(0);
  });
});
