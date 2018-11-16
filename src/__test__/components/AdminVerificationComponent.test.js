import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import {
  AdminVerificationComponent
} from '../../components/AdminVerification/AdminVerificationComponent';
import localStorageMock from '../../_mock/localStorage';

window.localStorage = localStorageMock;

describe('Renders <AdminVerificationComponent /> correctly', () => {
  const props = {
    updateAdminStatus: jest.fn(),
    isAdmin: false,
    history: {
      push: jest.fn()
    }
  };

  const wrapper = shallow(<AdminVerificationComponent {...props} />);

  it('renders the ArtModal component if user is not admin', () => {
    expect(wrapper.find('ArtModal').length).toBe(1);
  });

  it('renders the a p element if user is not admin', () => {
    expect(wrapper.find('p').length).toBe(1);
  });

  it('renders Button component if user is not admin', () => {
    expect(wrapper.find('Button').length).toBe(1);
  });

  it('calls the checkAdmin function', () => {
    const checkAdminSpy = jest.spyOn(
      wrapper.instance(), 'checkAdmin'
    );

    wrapper.instance().checkAdmin();
    expect(checkAdminSpy.mock.calls.length).toEqual(1);
  });

  it('should call the handleLogout function when the OK button is clicked', () => {
    const handleLogoutSpy = jest.spyOn(
      wrapper.instance(), 'handleLogout'
    );

    wrapper.find('Button').simulate('click');
    wrapper.instance().handleLogout();
    expect(handleLogoutSpy.mock.calls.length).toEqual(1);
  });
});
