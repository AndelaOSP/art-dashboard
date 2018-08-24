import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import AddSecurityUserComponent from '../../components/User/AddSecurityUserComponent';

const props = {
  handleSubmit: jest.fn(),
  firstName: '',
  lastName: '',
  email: '',
  badgeNumber: '',
  phoneNumber: '',
  onFirstNameChange: jest.fn(),
  onLastNameChange: jest.fn(),
  onEmailChange: jest.fn(),
  onBadgeNumberChange: jest.fn(),
  onPhoneNumberChange: jest.fn(),
  onChangeButtonState: jest.fn(),
  buttonState: false
};


describe('Renders <AddSecurityUserComponent /> correctly when no errors or loading prop', () => {
  const wrapper1 = shallow(<AddSecurityUserComponent {...props} />);

  it('renders Form component', () => {
    expect(wrapper1.find('Form').length).toBe(1);
  });

  it('renders label component', () => {
    expect(wrapper1.find('label').length).toBe(5);
  });

  it('renders InputField component', () => {
    expect(wrapper1.find('br').length).toBe(5);
  });
});
