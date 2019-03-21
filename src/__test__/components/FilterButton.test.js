import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import Filter from '../../components/common/Filter/FilterButton';
import { selectedFilters, securityFilters } from '../../_mock/filters';

describe('Renders <FilterButton /> tests', () => {
  const props = {
    activePage: 1,
    limit: 10,
    selected: selectedFilters,
    security: securityFilters,
    handleFilter: jest.fn(),
    filterAction: jest.fn()
  };

  const props1 = {
    activePage: 1,
    limit: 10,
    selected: securityFilters,
    handleFilter: jest.fn(),
    filterAction: jest.fn()
  };

  const wrapper = shallow(<Filter {...props} />);
  const securityWrapper = shallow(<Filter {...props1} />);

  it('changes toggle state to true when handleOpen is called', () => {
    wrapper.setState({ toggleOn: false });

    const handleOpenSpy = jest.spyOn(
      wrapper.instance(), 'handleOpen'
    );
    wrapper.instance().handleOpen();

    expect(handleOpenSpy.mock.calls.length).toEqual(1);
    expect(wrapper.state().toggleOn).toEqual(true);
  });

  it('changes toggle state to false when handleClose is called', () => {
    wrapper.setState({ toggleOn: true });

    const handleCloseSpy = jest.spyOn(
      wrapper.instance(), 'handleClose'
    );
    wrapper.instance().handleClose();

    expect(handleCloseSpy.mock.calls.length).toEqual(1);
    expect(wrapper.state().toggleOn).toEqual(false);
  });

  it('dispatches filterAction when handleFilter is called', () => {
    const handleFilterSpy = jest.spyOn(
      wrapper.instance(), 'handleFilter'
    );
    wrapper.instance().handleFilter();

    expect(handleFilterSpy.mock.calls.length).toEqual(1);
  });

  it('dispatches security filterAction when handleFilter is called', () => {
    const handleFilterSpy = jest.spyOn(
      securityWrapper.instance(), 'handleFilter'
    );
    securityWrapper.instance().handleFilter();

    expect(handleFilterSpy.mock.calls.length).toEqual(1);
  });
});
