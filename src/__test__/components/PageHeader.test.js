import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import PageHeader from '../../components/common/PageHeader';

describe('PageHeader tests', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = {
      children: null,
      header: 'Users'
    };
    wrapper = shallow(<PageHeader {...props} />);
  });

  it('renders without throwing an error', () => {
    expect(() => wrapper).not.toThrow();
  });

  it('renders the Header component', () => {
    expect(wrapper.find('#page-headings')).toHaveProp('content', 'Users');
  });
});
