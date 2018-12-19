import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import Paginator from '../../components/common/PaginationComponent';

describe('Pagination component tests', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = {
      totalPages: 2,
      handlePaginationChange: jest.fn(),
      activePage: 1,
      limit: 10,
      handleRowChange: jest.fn(),
      isLoading: false
    };
    wrapper = shallow(<Paginator {...props} />);
  });

  it('renders without throwing an error', () => {
    expect(() => wrapper).not.toThrow();
  });

  it('does not render markup when totalPages prop value is 1', () => {
    const noRender = shallow(<Paginator {...props} totalPages={1} />);
    expect(noRender).toBeEmptyRender();
  });

  it('renders the segment group', () => {
    expect(wrapper.find('#art-pagination-section')).toHaveClassName('entity-loaded-pagination');
  });

  it('renders the pagination component', () => {
    expect(wrapper.find('#art-pagination-component')).toHaveProp('totalPages', 2);
  });

  it('renders the dropdown component', () => {
    expect(wrapper.find('DropdownComponent')).toHaveProp('customClass', 'page-limit');
  });
});
