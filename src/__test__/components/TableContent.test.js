import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import TableContent from '../../components/common/Table/TableContent';

jest.mock('../../components/TableRowComponent', () => () => <div />);

describe('TableContent component tests', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = {
      data: [{ id: 123 }],
      headings: ['Testing']
    };
    wrapper = shallow(<TableContent {...props} />);
  });

  it('renders without throwing an error', () => {
    expect(() => wrapper).not.toThrow();
  });

  it('renders the table row component', () => {
    expect(wrapper.find('[data-test="table-row"]').first()).toExist();
  });

  it('renders the table row component with viewDetailsRoute prop when urlEntity prop is defined', () => {
    const withUrlEntity = shallow(<TableContent {...props} urlEntity="test" />);
    expect(withUrlEntity.find('[data-test="table-row"]').first()).toHaveProp('viewDetailsRoute', 'test/123/view');
  });
});
