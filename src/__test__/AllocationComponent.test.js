import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { AllocationsComponent } from '../components/AllocationsComponent';
import allocations from '../_mock/allocations';

describe('Renders <Allocations/> component', () => {
  const props = {
    loadAllocationsAction: jest.fn(),
    allAllocations: [],
    isLoading: true,
    hasError: false
  };

  let wrapper;

  it('renders Loading component if isLoading is true', () => {
    wrapper = shallow(<AllocationsComponent {...props} />);
    expect(wrapper.find('LoaderComponent').length).toBe(1);
  });

  it('renders a message is hasError is true', () => {
    props.isLoading = false;
    props.hasError = true;
    wrapper = shallow(<AllocationsComponent {...props} />);
    expect(wrapper.find('h1').text()).toEqual('An Error Occurred While Trying To Display Allocations.');
  });

  it('renders table when allocations are loaded successfully', () => {
    props.isLoading = false;
    props.hasError = false;
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
