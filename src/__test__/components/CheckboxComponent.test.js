import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import Checkbox from '../../components/common/CheckboxComponent';

describe('Renders <CheckboxComponent /> tests', () => {
  const props = {
    label: 'Test',
    name: 'Test',
    handleCheckboxChange: jest.fn()
  };

  const wrapper = shallow(<Checkbox {...props} />);

  it('renders checkbox', () => {
    expect(wrapper.find('.ui checkbox'));
  });

  it('it calls toggleCheckboxChange', () => {
    const toggleCheckboxChangeSpy = jest.spyOn(
      wrapper.instance(), 'toggleCheckboxChange'
    );
    wrapper.instance().toggleCheckboxChange();

    expect(toggleCheckboxChangeSpy.mock.calls.length).toEqual(1);
  });
});
