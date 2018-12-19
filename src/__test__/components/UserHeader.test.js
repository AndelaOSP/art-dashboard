import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import UserHeader from '../../components/User/UserHeader';

jest.mock('../../_components/User/UserFilterContainer', () => () => <div />);

describe('UserHeader tests', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = {
      name: 'users',
      limit: 10
    };
    wrapper = shallow(<UserHeader {...props} />);
  });

  it('renders without throwing an error', () => {
    expect(() => wrapper).not.toThrow();
  });

  it('renders the PageHeader component', () => {
    expect(wrapper.find('PageHeader')).toHaveProp('header', 'Users');
  });

  it('renders the filter component', () => {
    expect(wrapper.find('[data-test="user-filter"]')).toHaveProp('limit', 10);
  });

  it('renders the add security button', () => {
    const withButton = shallow(<UserHeader {...props} name="security users" />);
    expect(withButton.find('Button')).toHaveClassName('filter-button');
  });
});
