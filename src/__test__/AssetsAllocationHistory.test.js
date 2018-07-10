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

  it('renders the allocation history if allocation history is available', () => {
    wrapper.setProps({
      allocationHistory: [{
        condition: 'good condition',
        created_at: 'test date',
        email: 'email@email',
        picture: 'picture',
        slackHandle: 'slack',
        status: 'allocated'
      }]
    });
    expect(wrapper.find('.history-list').length).toBe(1);
  });
});
