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

describe('Renders <AddSecurityUserComponent /> correctly', () => {
  const wrapper = shallow(<AddSecurityUserComponent {...props} />);

  it('renders Form component', () => {
    expect(wrapper.find('Form').length).toBe(1);
  });

  it('renders the save and cancel button', () => {
    expect(wrapper.find('ButtonComponent').exists()).toBe(true);
  });

  it('calls the handleInputChange function', () => {
    const handleInputChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleInputChange'
    );
    const event = { target: { value: '' } };
    const data = {};

    wrapper.instance().handleInputChange(event, data);
    expect(handleInputChangeSpy.mock.calls.length).toEqual(1);
  });

  it('calls the handleSubmit function', () => {
    const handleSubmitSpy = jest.spyOn(
      wrapper.instance(), 'handleSubmit'
    );
    const event = { target: { value: '', reset: jest.fn() } };
    const data = {};

    wrapper.instance().handleSubmit(event, data);
    expect(handleSubmitSpy.mock.calls.length).toEqual(1);
  });
});
