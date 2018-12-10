import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import AddSecurityUserComponent from '../../components/SecurityUser/AddSecurityUserComponent';

const props = {
  handleSubmit: jest.fn(),
  firstName: '',
  lastName: '',
  email: '',
  badgeNumber: '',
  phoneNumber: '',
  onChangeButtonState: jest.fn(),
  buttonState: false,
  error: false
};

describe('Renders <AddSecurityUserComponent /> correctly when no errors or loading prop', () => {
  const wrapper1 = shallow(<AddSecurityUserComponent {...props} />);

  it('renders Form component', () => {
    expect(wrapper1.find('Form').length).toBe(1);
  });

  it('renders the save button component', () => {
    expect(wrapper1.find('.save').length).toBe(1);
  });
});
