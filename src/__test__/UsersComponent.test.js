import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import UserDetailsComponent from '../components/UserDetailsComponent';

let props = {
  isLoading: false,
  activePage: 1,
  activePageUsers: [],
  emptyUsersList: () => false,
  errorMessage: '',
  handlePageTotal: jest.fn()
};


describe('Renders <UserDetailsComponent /> correctly when no errors or loading prop', () => {
  const wrapper1 = shallow(<UserDetailsComponent {...props} />);

  it('renders Table component', () => {
    expect(wrapper1.find('Table').length).toBe(1);
  });

  it('renders Pagination component', () => {
    expect(wrapper1.find('Pagination').length).toBe(1);
  });

  it('renders Add User Button', () => {
    expect(wrapper1.find('Button').prop('data-tooltip')).toEqual('Add new user');
  });
});

describe('Renders UserDetailsComponent with the LoadingComponent', () => {
  props = {
    isLoading: true
  };
  const wrapper2 = shallow(<UserDetailsComponent {...props} />);

  it('renders LoaderComponent if page is loading', () => {
    expect(wrapper2.find('LoaderComponent').length).toBe(1);
  });
});

describe('Renders UserDetailsComponent with the Header Component', () => {
  props = {
    emptyUsersList: () => true
  };
  const wrapper3 = shallow(<UserDetailsComponent {...props} />);

  it('renders Header Component if there are no users on the backend', () => {
    expect(wrapper3.find('Header').length).toBe(1);
  });
});

describe('Renders UserDetailsComponent with the SemanticToastContainer', () => {
  props = {
    hasError: true,
    errorMessage: 'Test error'
  };
  const wrapper4 = shallow(<UserDetailsComponent {...props} />);

  it('renders a toast message if there is an error', () => {
    expect(wrapper4.find('SemanticToastContainer').length).toBe(1);
  });
});
