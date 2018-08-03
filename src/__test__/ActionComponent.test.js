import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import ActionComponent from '../components/ActionComponent';

describe('Renders <ActionComponent /> correctly', () => {
  const props = {
    onClickView: jest.fn(),
    onClickEdit: jest.fn()
  };
  const wrapper = shallow(<ActionComponent {...props} />);

  it('renders the view button', () => {
    expect(wrapper.find('#view').prop('name')).toEqual('eye');
  });

  it('renders message if there are no assets returned', () => {
    expect(wrapper.find('#edit').prop('name')).toEqual('edit');
  });
});
