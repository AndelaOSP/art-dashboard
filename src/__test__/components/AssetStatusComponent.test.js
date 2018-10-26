import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import AssetStatusComponent from '../../components/Dashboard/AssetStatusComponent';

describe('Renders <AssetStatusComponent /> correctly', () => {
  const props = {
    onFetchAssets: jest.fn(),
    asset: {
      assets: [],
      count: 0
    },
    status: ''
  };

  const wrapper = shallow(<AssetStatusComponent {...props} />);

  it('renders card wrapper', () => {
    expect(wrapper.find('.analytics-state-rectangle').length).toBe(1);
  });

  it('renders checkmark if asset exists', () => {
    wrapper.setProps({
      asset: {
        count: 1
      }
    });
    expect(wrapper.find('.checkmark').exists()).toBe(true);
  });

  it('applies active-analytics class when count > 0', () => {
    wrapper.setProps({
      asset: {
        count: 2
      }
    });

    expect(wrapper.find('.active-analytics').exists()).toBe(true);
  });
});
