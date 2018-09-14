import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import UserDetailComponent from '../../components/User/UserDetailComponent';

const props = {
  userDetail: {},
  isLoading: false
};

describe('Renders <UserDetailComponent /> correctly', () => {
  const wrapper = shallow(<UserDetailComponent {...props} />);

  it('renders the LoaderComponent component if isLoading is true', () => {
    wrapper.setProps({ isLoading: true });
    expect(wrapper.find('LoaderComponent').exists()).toEqual(true);
  });

  it('renders a the table if loading is false and user details is not empty', () => {
    wrapper.setProps({
      userDetail: {
        full_name: 'test name',
        email: 'test@email.com',
        cohort: 16,
        slack_handle: 'test',
        phone_number: 1234567
      },
      isLoading: false
    });
    expect(wrapper.find('Table').exists()).toEqual(true);
  });
});
