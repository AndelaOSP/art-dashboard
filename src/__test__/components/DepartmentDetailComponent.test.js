import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { departmentDetail1, departmentDetail2 } from '../../_mock/departments';
import DepartmentDetail from '../../components/Departments/DepartmentDetailComponent';

const props = {
  departmentDetail: {},
  isLoading: false,
  loadDepartmentDetail: jest.fn(),
  match: { params: { id: 2 } },
  getAssetsSuccess: jest.fn()
};

describe('Renders <DepartmentDetailComponent /> correctly', () => {
  const wrapper = shallow(<DepartmentDetail {...props} />);

  it('renders the LoaderComponent component if isLoading is true', () => {
    wrapper.setProps({ isLoading: true });
    expect(wrapper.find('LoaderComponent').exists()).toEqual(true);
  });

  it('renders a the Segment Component if loading is false and department details is not empty', () => {
    wrapper.setProps({
      departmentDetail: departmentDetail1,
      isLoading: false
    });
    expect(wrapper.find('Segment').exists()).toEqual(true);
  });

  it('clicks the Link to view assigned assets', () => {
    wrapper.find('Link').simulate('click');
    expect(props.getAssetsSuccess.mock.calls.length).toEqual(1);
  });

  it('renders an empty card if assigned_assets is empty ', () => {
    wrapper.setProps({
      departmentDetail: departmentDetail2,
      isLoading: false
    });
    expect(wrapper.find('Card').exists()).toEqual(true);
  });
});
