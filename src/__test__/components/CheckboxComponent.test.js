import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import Checkbox from '../../components/common/CheckboxComponent';

describe('Renders <CheckboxComponent /> tests', () => {
  const props = {
    label: 'Test',
    name: 'Test'
  };

  const wrapper = shallow(<Checkbox {...props} />);

  it('renders checkbox', () => {
    expect(wrapper.find('.ui checkbox'));
  });
});
