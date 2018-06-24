import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { AssetsComponent } from '../components/AssetsComponent';

import { assets } from '../_mock/assets';

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
});
