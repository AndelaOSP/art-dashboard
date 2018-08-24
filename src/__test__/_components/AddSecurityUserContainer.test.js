import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import AddSecurityUserContainer from '../../_components/User/AddSecurityUserContainer';

const props = {
  toastMessageContent: {
    type: 'success',
    message: ''
  },
  addSecurityUser: jest.fn(),
  resetToastMessageContent: jest.fn(),
  toggleModal: jest.fn()
};

describe('Renders <AddSecurityUserContainer /> tests', () => {
  const wrapper = shallow(<AddSecurityUserContainer.WrappedComponent {...props} />);

  it('calls the onFirstNameChange function', () => {
    const onFirstNameChangeSpy = jest.spyOn(
      wrapper.instance(), 'onFirstNameChange'
    );
    const event = { target: { value: '' } };
    const data = {};

    wrapper.instance().onFirstNameChange(event, data);
    expect(onFirstNameChangeSpy.mock.calls.length).toEqual(1);
  });

  it('calls the onPhoneNumberChange function', () => {
    const onPhoneNumberChangeSpy = jest.spyOn(
      wrapper.instance(), 'onPhoneNumberChange'
    );
    const event = { target: { value: '' } };
    const data = {};

    wrapper.instance().onPhoneNumberChange(event, data);
    expect(onPhoneNumberChangeSpy.mock.calls.length).toEqual(1);
  });

  it('calls the onLastNameChange function', () => {
    const onLastNameChangeStateSpy = jest.spyOn(
      wrapper.instance(), 'onLastNameChange'
    );
    const event = { target: { value: '' } };
    const data = {};

    wrapper.instance().onLastNameChange(event, data);
    expect(onLastNameChangeStateSpy.mock.calls.length).toEqual(1);
  });

  it('calls the onEmailChange function', () => {
    const onEmailChangeStateSpy = jest.spyOn(
      wrapper.instance(), 'onEmailChange'
    );
    const event = { target: { value: '' } };
    const data = {};

    wrapper.instance().onEmailChange(event, data);
    expect(onEmailChangeStateSpy.mock.calls.length).toEqual(1);
  });

  it('calls the onBadgeNumberChange function', () => {
    const onBadgeNumberChangeStateSpy = jest.spyOn(
      wrapper.instance(), 'onBadgeNumberChange'
    );
    const event = { target: { value: '' } };
    const data = {};

    wrapper.instance().onBadgeNumberChange(event, data);
    expect(onBadgeNumberChangeStateSpy.mock.calls.length).toEqual(1);
  });

  it('calls the onChangeButtonState function', () => {
    const onChangeButtonStateSpy = jest.spyOn(
      wrapper.instance(), 'onChangeButtonState'
    );
    const event = {};
    const data = {};

    wrapper.instance().onChangeButtonState(event, data);
    expect(onChangeButtonStateSpy.mock.calls.length).toEqual(1);
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
