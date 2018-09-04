import React from 'react';
import { mount } from 'enzyme';
import ConfirmAction from '../components/common/ConfirmAction';

describe('Renders <ConfirmAction /> correctly', () => {
  const props = {
    toggleModal: jest.fn(),
    handleConfirm: jest.fn(),
    buttonState: false
  };
  const wrapper = mount(<ConfirmAction {...props} />);

  it('componentDidUpdate is called on change in props', () => {
    const componentDidUpdateSpy = jest.spyOn(
      wrapper.instance(), 'componentDidUpdate'
    );
    wrapper.setProps({ buttonState: true });
    expect(componentDidUpdateSpy.mock.calls.length).toEqual(1);
  });
});
