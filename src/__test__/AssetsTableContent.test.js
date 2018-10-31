import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import AssetsTableContent from '../components/AssetsTableContent';

import assets from '../_mock/assets';

describe('Renders <AssetsTableContent /> correctly', () => {
  const props = {
    errorMessage: '',
    hasError: false,
    isLoading: false,
    hasAssets: true,
    message: '',
    assets
  };
  const wrapper = shallow(<AssetsTableContent {...props} />);

  it('renders Table component', () => {
    wrapper.setProps({
      assets
    });
    expect(wrapper.find('Table').length).toBe(1);
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
      assets: [],
      hasAssets: false,
      hasError: false
    });
    expect(wrapper.find('ItemsNotFoundComponent').length).toBe(1);
  });
});
