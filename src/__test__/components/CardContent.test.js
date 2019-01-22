import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import CardContent from '../../components/common/Card/CardContent';

describe('CardContent component tests', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      data: { id: 123 },
      headings: ['Testing']
    };

    wrapper = shallow(<CardContent {...props} />);
  });

  it('renders without throwing an error', () => {
    expect(() => wrapper).not.toThrow();
  });
});
