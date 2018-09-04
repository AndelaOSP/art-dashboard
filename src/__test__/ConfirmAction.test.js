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

  it('shouldComponentUpdate is called on change in props', () => {
    const shouldComponentUpdateSpy = jest.spyOn(
      wrapper.instance(), 'shouldComponentUpdate'
    );
    wrapper.setProps({ buttonState: true });
    expect(shouldComponentUpdateSpy.mock.calls.length).toEqual(1);
  });
});
