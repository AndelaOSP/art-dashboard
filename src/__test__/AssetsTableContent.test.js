import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import AssetsTableContent from '../components/AssetsTableContent';

import assets from '../_mock/assets';

describe('Renders <AssetsTableContent /> correctly', () => {
  const props = {
    getAssetsAction: jest.fn(),
    handlePaginationChange: jest.fn(),
    activePageAssets: assets,
    assetsCount: 10,
    emptyAssetsCheck: jest.fn(),
    errorMessage: '',
    handlePageTotal: jest.fn((() => (1))),
    hasError: false,
    isLoading: false
  };
  const wrapper = shallow(<AssetsTableContent
    {...props}
  />);

  it('renders Pagination component', () => {
    expect(wrapper.find('Pagination').length).toBe(1);
  });

  it('renders Table component', () => {
    expect(wrapper.find('Table').length).toBe(1);
  });

  it('renders TableRowComponent component', () => {
    expect(wrapper.find('TableRowComponent').length).toBe(2);
  });

  it('renders LoaderComponent if page is loading', () => {
    wrapper.setProps({ isLoading: true });
    expect(wrapper.find('LoaderComponent').length).toBe(1);
  });

  it('renders a toast message if there is an error', () => {
    wrapper.setProps({ hasError: true, isLoading: false, errorMessage: 'An error' });
    expect(wrapper.find('SemanticToastContainer').length).toBe(1);
  });

  it('renders message if there are no assets returned', () => {
    wrapper.setProps({
      emptyAssetsCheck: () => (true),
      hasError: false
    });
    expect(wrapper.find('#empty-assets').prop('content')).toEqual('No Assets Found');
  });
});
