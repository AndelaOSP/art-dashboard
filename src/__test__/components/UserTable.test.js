import React from 'react';
import { shallow } from 'enzyme';
import UserTable from '../../components/User/UsersContent';

describe('UserTable test', () => {
  let props;
  beforeEach(() => {
    props = {};
  });

  it('renders without without throwing an error', () => {
    expect(() => shallow(<UserTable {...props} />)).not.toThrow();
  });
});
