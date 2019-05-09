import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { departmentDetailWithAssignedAsset, departmentDetailWithoutAssignedAsset } from '../../_mock/departments';
import DepartmentDetail from '../../components/Departments/DepartmentDetailComponent';

let wrapper;
const props = {
  details: {},
  isLoading: false,
  loadDepartmentDetail: jest.fn(),
  match: { params: { id: 2 } },
  getAssetsSuccess: jest.fn()
};

beforeEach(() => {
  wrapper = shallow(<DepartmentDetail {...props} />);
});

describe('Renders <DepartmentDetailComponent /> correctly', () => {
  it('renders the LoaderComponent component if isLoading is true', () => {
    wrapper.setProps({ isLoading: true });
    expect(wrapper.find('LoaderComponent').exists()).toEqual(true);
  });

  it('renders the Segment Component if loading is false and department details is not empty', () => {
    wrapper.setProps({
      details: departmentDetailWithAssignedAsset,
      isLoading: false
    });
    expect(wrapper.find('Segment').exists()).toEqual(true);
  });

  it('calls getAssetsSuccess action  when the Link Component is clicked ', () => {
    wrapper.setProps({
      details: departmentDetailWithAssignedAsset,
      isLoading: false
    });
    wrapper.find('Link').simulate('click');
    expect(props.getAssetsSuccess.mock.calls.length).toEqual(1);
  });

  it('renders an empty card if assigned_assets is empty ', () => {
    wrapper.setProps({
      details: departmentDetailWithoutAssignedAsset,
      isLoading: false
    });
    expect(wrapper.find('Card').exists()).toEqual(true);
  });
});
