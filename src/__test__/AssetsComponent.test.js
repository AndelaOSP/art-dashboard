import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { AssetsComponent } from '../components/AssetsComponent';

import assets from '../_mock/assets';

describe('Renders <AssetsComponent /> correctly', () => {
  const props = {
    getAssetsAction: jest.fn(),
    handlePaginationChange: jest.fn(),
    assets,
    assetsCount: 10,
    hasError: false,
    isLoading: false
  };
  const wrapper = shallow(<AssetsComponent
    {...props}
  />);

  wrapper.setState({ activePageAssets: props.assets });

  it('renders page title', () => {
    expect(wrapper.find('.assets-heading').prop('content')).toEqual('My Assets');
  });

  it('renders Pageination component', () => {
    expect(wrapper.find('Pagination').length).toBe(1);
  });

  it('renders Table component', () => {
    expect(wrapper.find('Table').length).toBe(1);
  });

  it('renders TableRowComponent component', () => {
    expect(wrapper.find('TableRowComponent').length).toBe(2);
  });

  it('calls the handlePaginationChange function when the next button is clicked', () => {
    const handlePaginationChangeSpy = jest.spyOn(
      wrapper.instance(), 'handlePaginationChange'
    );
    const event = {};
    const data = {};
    wrapper.instance().handlePaginationChange(event, data);
    expect(handlePaginationChangeSpy.mock.calls.length).toEqual(1);
  });

  it('renders LoaderComponent if page is loading', () => {
    wrapper.setProps({ isLoading: true });
    expect(wrapper.find('LoaderComponent').length).toBe(1);
  });

  it('renders Error message if there is an error', () => {
    wrapper.setProps({ hasError: true, isLoading: false });
    expect(wrapper.find('#assets-error').prop('content')).toEqual('An error has occured');
  });

  it('renders message if there are no assets returned', () => {
    wrapper.setProps({ assets: [], hasError: false });
    expect(wrapper.find('#empty-assets').prop('content')).toEqual('There are no assets assigned to you');
  });
});
