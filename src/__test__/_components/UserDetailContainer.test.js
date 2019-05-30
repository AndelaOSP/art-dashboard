import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import UserDetailContainer, { mapStateToProps } from '../../_components/User/UserDetailContainer';

const props = {
  loadUserDetail: jest.fn(),
  isLoading: false,
  hasError: false,
  errorMessage: '',
  userDetail: {},
  match: {
    params: { id: 108 }
  }
};

describe('Renders <UserDetailContainer /> correctly', () => {
  const wrapper = shallow(<UserDetailContainer.WrappedComponent {...props} />);

  it('calls componentDidMount', () => {
    wrapper.setProps({
      userDetail: {
        full_name: 'test name',
        email: 'test@email.com',
        cohort: 16,
        slack_handle: 'test',
        phone_number: 1234567
      }
    });
    const componentDidMountSpy = jest.spyOn(
      wrapper.instance(), 'componentDidMount'
    );
    wrapper.instance().componentDidMount();
    expect(componentDidMountSpy.mock.calls.length).toEqual(1);
  });

  it('renders the UserDetailComponent ', () => {
    wrapper.setProps({
      userDetail: {
        full_name: 'test name',
        email: 'test@email.com',
        cohort: 16,
        slack_handle: 'test',
        phone_number: 1234567
      }
    });

    expect(wrapper.find('UserDetailComponent').exists()).toEqual(true);
  });

  it('calls mapStateToProps', () => {
    const state = {
      userDetails: {
        isLoading: false,
        hasError: false,
        successMessage: '',
        errorMessage: '',
        userDetail: {}
      }
    };

    const expected = {
      isLoading: false,
      hasError: false,
      successMessage: '',
      errorMessage: '',
      userDetail: ''
    };

    expect(mapStateToProps(state, { location: {
      state: ''
    } })).toEqual(expected);
  });
});
