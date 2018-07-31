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
    expect(wrapper.find('TableRowComponent').length).toBe(1);
  });

  it('sets the allocation history previous_owner or current_owner to - if null and formats date', () => {
    wrapper.setProps({
      allocationHistory: [{
        created_at: '2018-07-31T13:11:24.054616Z',
        current_owner: null,
        previous_owner: null
      }]
    });
    expect(wrapper.find('TableRowComponent').props().data.created_at).toBe('Tuesday, July 31, 2018');
    expect(wrapper.find('TableRowComponent').props().data.current_owner).toBe(' - ');
    expect(wrapper.find('TableRowComponent').props().data.previous_owner).toBe(' - ');
  });
});
