import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import Filter from '../../components/common/FilterButton';

describe('Renders <FilterButton /> tests', () => {
  const wrapper = shallow(<Filter />);

  it('changes toggle state', () => {
    wrapper.setState({ toggleOn: false });

    const toggleFilterSpy = jest.spyOn(
      wrapper.instance(), 'toggleFilter'
    );
    wrapper.instance().toggleFilter();

    expect(toggleFilterSpy.mock.calls.length).toEqual(1);
    expect(wrapper.state().toggleOn).toEqual(true);
  });
});
