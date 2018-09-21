import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { AllocationsComponent } from '../components/AllocationsComponent';
import allocations from '../_mock/allocations';

describe('Renders <Allocations/> component', () => {
  const props = {
    loadAllocationsAction: jest.fn(),
    allAllocations: [],
    isLoading: true
  };

  let wrapper;

  it('renders Loading component if isLoading is true', () => {
    wrapper = shallow(<AllocationsComponent {...props} />);
    expect(wrapper.find('LoaderComponent').length).toBe(1);
  });

  it('renders error if allocations fail to load', () => {
    props.isLoading = false;
    wrapper = shallow(<AllocationsComponent {...props} />);
    expect(wrapper.find('ItemsNotFoundComponent').length).toBe(1);
  });

  it('renders table when allocations are loaded successfully', () => {
    props.isLoading = false;
    props.allAllocations = allocations;
    wrapper = shallow(<AllocationsComponent {...props} />);
    expect(wrapper.find('Header').prop('content')).toEqual('All Allocations');
    expect(wrapper.find('Table').length).toBe(1);
  });

  it('renders page title', () => {
    expect(wrapper.find('#page-headings').prop('content')).toEqual('All Allocations');
  });

  it('renders Dropdown Component', () => {
    expect(wrapper.find('DropdownComponent').length).toBe(1);
  });
});
