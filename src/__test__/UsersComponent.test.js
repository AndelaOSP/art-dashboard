import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import UserDetailsComponent from '../components/UserDetailsComponent';

const props = {
  hasError: false,
  isLoading: false,
  activePage: 1,
  activePageUsers: [],
  emptyUsersList: jest.fn(),
  errorMessage: '',
  handlePageTotal: jest.fn()
};

describe('Renders <UserDetailsComponent /> correctly', () => {
  const wrapper2 = shallow(<UserDetailsComponent
    {...props}
  />);

  it('renders Table component', () => {
    expect(wrapper2.find('Table').length).toBe(1);
  });

  it('renders Pagination component', () => {
    expect(wrapper2.find('Pagination').length).toBe(1);
  });

  it('renders Add Button', () => {
    expect(wrapper2.find('Button').length).toBe(1);
  });

  it('renders LoaderComponent if page is loading', () => {
    wrapper2.setProps({ isLoading: true });
    expect(wrapper2.find('LoaderComponent').length).toBe(1);
  });

  it('renders a toast message if there is an error', () => {
    wrapper2.setProps({ hasError: true, isLoading: false, errorMessage: 'Test error' });
    expect(wrapper2.find('SemanticToastContainer').length).toBe(1);
  });
});
