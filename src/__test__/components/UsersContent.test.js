import React from 'react';
import { shallow } from 'enzyme';
import UsersContent from '../../components/User/UsersContent';

describe('UsersContent test', () => {
  let props;
  beforeEach(() => {
    props = {
      hasUsers: true,
      users: [{
        full_name: 'Testing UsersContent',
        email: 'testing@testing.com',
        cohort: 0,
        assets_assigned: 2
      }]
    };
  });

  it('renders without without throwing an error', () => {
    expect(() => shallow(<UsersContent {...props} />)).not.toThrow();
  });

  it('renders nothing when hasUsers prop is false', () => {
    const wrapper = shallow(<UsersContent {...props} hasUsers={false} />);
    expect(wrapper).toBeEmptyRender();
  });

  it('renders the table content', () => {
    const wrapper = shallow(<UsersContent {...props} />);
    expect(wrapper.find('TableContent')).toExist();
  });
});
