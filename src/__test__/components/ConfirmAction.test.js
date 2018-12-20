import React from 'react';
import { mount } from 'enzyme';
import ConfirmAction from '../../components/common/ConfirmAction';

describe('Renders <ConfirmAction /> correctly', () => {
  const props = {
    toggleModal: jest.fn(),
    handleConfirm: jest.fn(),
    buttonState: false,
    buttonLoading: true
  };
  const wrapper = mount(<ConfirmAction {...props} />);

  it('should call componentDidUpdate', () => {
    const componentDidUpdateSpy = jest.spyOn(
      wrapper.instance(), 'componentDidUpdate'
    );
    wrapper.setProps({ buttonState: true });
    expect(componentDidUpdateSpy.mock.calls.length).toEqual(1);
  });

  it('should call toggleModal when buttonLoading is false ', () => {
    const prevProps = props;
    wrapper.instance().componentDidUpdate(prevProps);
    wrapper.setProps({ buttonLoading: false });
    expect(props.toggleModal.mock.calls.length).toEqual(1);
  });
});
