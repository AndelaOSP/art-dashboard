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

  it('renders a the table if loading is false and user details is not empty', () => {
    wrapper.setProps({
      userDetail: {
        full_name: 'test name',
        email: 'test@email.com',
        cohort: 16,
        slack_handle: 'test',
        phone_number: 1234567,
        allocated_assets: [
          {
            id: 55,
            asset_type: 'Computer',
            asset_code: 'AND/RE/34',
            serial_number: 'GT2342342'
          },
          {
            id: 56,
            asset_type: 'Dongle',
            asset_code: 'AND/DNG/43',
            serial_number: 'DNG90909903'
          }
        ]
      },
      isLoading: false
    });
    expect(wrapper.find('Table').exists()).toEqual(true);
  });

  it('renders an empty card if allocated_assets is empty ', () => {
    wrapper.setProps({
      userDetail: {
        full_name: 'test name',
        email: 'test@email.com',
        cohort: 16,
        slack_handle: 'test',
        phone_number: 1234567,
        allocated_assets: []
      },
      isLoading: false
    });
    expect(wrapper.find('Card').exists()).toEqual(true);
  });
});
