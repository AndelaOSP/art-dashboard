import expect from 'expect';
import { mapStateToProps } from '../../_components/Departments/DepartmentDetailContainer';
import { departmentDetailWithAssignedAsset } from '../../_mock/departments';

describe('mapStateToProps', () => {
  it('returns the expected prop', () => {
    const state = {
      departmentDetail: {
        details: departmentDetailWithAssignedAsset,
        isLoading: false,
        error: ''
      }
    };

    const expected = {
      details: departmentDetailWithAssignedAsset,
      isLoading: false,
      error: ''
    };

    expect(mapStateToProps(state)).toEqual(expected);
  });
});
