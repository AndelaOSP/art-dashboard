import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import AssetAllocationHistory from '../components/AssetAllocationHistory';

describe('Renders <AssetAllocationHistory /> correctly', () => {
  const props = {
    allocationHistory: []
  };
  const wrapper = shallow(<AssetAllocationHistory {...props} />);

  it('renders the message when there is no history available', () => {
    expect(wrapper.find('.history-unavailable').length).toBe(1);
  });

  it('renders the allocation history table if allocation history is available', () => {
    wrapper.setProps({
      allocationHistory: [{
        created_at: 'test date',
        current_owner: 'email2@gmail.com',
        previous_owner: 'email@email.com'
      }]
    });
    expect(wrapper.find('Table').length).toBe(1);
  });
});
