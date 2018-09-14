import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import Filter from '../../components/common/FilterButton';

describe('Renders <FilterButton /> tests', () => {
  const wrapper = shallow(<Filter><div>component</div></Filter>);

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
});
