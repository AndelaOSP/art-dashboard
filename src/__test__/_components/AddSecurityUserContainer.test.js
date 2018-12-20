import React from 'react';
import { shallow, mount } from 'enzyme';
import expect from 'expect';
import AddSecurityUserContainer from '../../_components/SecurityUser/AddSecurityUserContainer';

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

  const wrapper2 = mount(
    <AddSecurityUserContainer.WrappedComponent {...props} />
  );

  it('calls the handleInputChange function', () => {
    const handleInputChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleInputChange'
    );
    const event = { target: { value: '' } };
    const data = {};

    wrapper.instance().handleInputChange(event, data);
    expect(handleInputChangeSpy.mock.calls.length).toEqual(1);
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

  it('can receive a success prop when getDerivedStateFromProps runs', () => {
    wrapper2.setProps({
      toastMessageContent: {
        type: 'success',
        message: 'A success message'
      }
    });
    expect(wrapper2.props().toastMessageContent.type).toEqual('success');
  });

  it('can receive an error prop when getDerivedStateFromProps runs', () => {
    wrapper2.setProps({
      toastMessageContent: {
        type: 'error',
        message: 'An error message'
      }
    });
    expect(wrapper2.props().toastMessageContent.type).toEqual('error');
  });
});
