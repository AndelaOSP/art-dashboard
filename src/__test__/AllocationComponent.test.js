import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import Allocations from '../components/AllocationsComponent';
import allocations from '../_mock/allocations';

describe('Renders <Allocations/> component', () => {
  const props = {
    loadAllocationsAction: jest.fn(),
    allAllocations: {},
    isLoading: false,
    loading: jest.fn(),
    resetAllocations: jest.fn(),
    setActivePage: jest.fn(),
    activePage: 1
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Allocations.WrappedComponent {...props} />);
  });

  it('renders Loading component if isLoading is true', () => {
    wrapper.setProps({
      isLoading: true
    });

    expect(wrapper.find('LoaderComponent').length).toBe(1);
  });

  it('renders error if allocations fail to load', () => {
    expect(wrapper.find('ItemsNotFoundComponent').length).toBe(1);
  });

  it('renders table when allocations are loaded successfully', () => {
    props.allAllocations = { page_1: allocations };
    props.isLoading = false;
    wrapper = shallow(<Allocations.WrappedComponent {...props} />);

    expect(wrapper.find('Header').length).toBe(1);
    expect(wrapper.find('Table').length).toBe(1);
  });

  it('renders page title', () => {
    expect(wrapper.find('#page-headings').prop('content')).toEqual('All Allocations');
  });

  it('renders Dropdown Component', () => {
    expect(wrapper.find('DropdownComponent').length).toBe(1);
  });
});
