import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import AssignedTo from '../../components/AssignAssetComponent';

describe('Renders <AssignedTo /> correctly', () => {
  const props = {
    onSelectUserEmail: jest.fn(),
    assignedUser: null,
    users: [],
    selectedUserId: null,
    errorMessage: 'Could not assign the asset'
  };
  const wrapper = shallow(<AssignedTo {...props} />);

  it('appends the error class to the drop down when there\'s an error', () => {
    expect(wrapper.find('DropdownComponent').prop('customClass')).toBe('form-dropdown error');
  });

  it('renders an error message when there\'s an error', () => {
    expect(wrapper.find('.error-message').html()).toContain('Could not assign the asset');
  });
});
