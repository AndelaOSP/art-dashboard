import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import Filter from '../../components/common/Filter/Filter';

describe('Renders <Filter /> tests', () => {
  const props = {
    filterAction: jest.fn(),
    selected: {},
    filterSelection: jest.fn(),
    filterData: [],
    activePage: 1,
    limit: 0,
    isLoading: false,
    index: 0
  };
  const wrapper = shallow(<Filter {...props} />);

  it('does not renders FilterComponent if filterdata is empty', () => {
    expect(wrapper.find('FilterButton').dive().find('Connect(FilterComponent)').exists()).toBe(false);
  });

  it('renders FilterComponent if filterdata not empty', () => {
    wrapper.setProps({
      filterData: [
        {
          title: 'Asset Types',
          content: [
            { id: 19, option: 'Bbbbbbbb' },
            { id: 16, option: 'Headsets' }
          ]
        },
        {
          title: 'Model Numbers',
          content: [
            { id: 19, option: 'A1633' },
            { id: 18, option: 'A1688' }
          ]
        }
      ]
    });
    expect(wrapper.find('FilterButton').dive().find('Connect(FilterComponent)').exists()).toBe(true);
  });
});
