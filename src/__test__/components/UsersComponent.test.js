import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import UserComponent from '../../components/User/UserComponent';

let props = {
  isLoading: false,
  activePage: 1,
  activePageUsers: [],
  emptyUsersList: () => false,
  errorMessage: '',
  handlePageTotal: jest.fn()
};


describe('Renders <UserComponent /> correctly when no errors or loading prop', () => {
  const wrapper1 = shallow(<UserComponent {...props} />);

  it('renders Table component', () => {
    expect(wrapper1.find('Table').length).toBe(1);
  });

  it('renders Pagination component', () => {
    expect(wrapper1.find('Pagination').length).toBe(1);
  });
});

describe('Renders UserComponent with the LoadingComponent', () => {
  props = {
    isLoading: true
  };
  const wrapper2 = shallow(<UserComponent {...props} />);

  it('renders LoaderComponent if page is loading', () => {
    expect(wrapper2.find('LoaderComponent').length).toBe(1);
  });
});

describe('Renders UserComponent with the SemanticToastContainer', () => {
  props = {
    hasError: true,
    errorMessage: 'Test error'
  };
  const wrapper4 = shallow(<UserComponent {...props} />);

  it('renders a toast message if there is an error', () => {
    expect(wrapper4.find('SemanticToastContainer').length).toBe(1);
  });
});
