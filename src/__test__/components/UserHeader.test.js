import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import UserHeader from '../../components/User/UserHeader';

describe('Renders <UserHeader /> tests', () => {
  const props = {
    limit: 10,
    hideHeader: false
  };

  const wrapper = shallow(<UserHeader {...props} />);

  it('renders header', () => {
    expect(wrapper.find('users-list'));
  });

  it('renders page title', () => {
    expect(wrapper.find('#page-headings').prop('content')).toEqual('Andelans');
  });
});
