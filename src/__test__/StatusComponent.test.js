import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import StatusComponent from '../components/common/StatusComponent';

const props = {
  message: ''
};

describe('Renders <StatusComponent /> correctly', () => {
  const wrapper = shallow(<StatusComponent {...props} />);

  it('renders a message', () => {
    wrapper.setProps({
      message: 'Hoooray! Asset successfully created. You can create another one or head on to view all assets.'
    });
    expect(wrapper.find('Message').length).toBe(1);
  });

  it('renders the handleDismiss function', () => {
    const handleDismissSpy = jest.spyOn(
      wrapper.instance(), 'handleDismiss'
    );

    wrapper.instance().handleDismiss();
    expect(handleDismissSpy.mock.calls.length).toEqual(1);
  });
});
