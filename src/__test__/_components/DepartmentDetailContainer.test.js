import expect from 'expect';
import { mapStateToProps } from '../../_components/Departments/DepartmentDetailContainer';
import { departmentDetail1 } from '../../_mock/departments';

describe('Renders <DepartmentDetailContainer /> correctly', () => {
  it('calls mapStateToProps', () => {
    const state = {
      departments: {
        departmentDetail: departmentDetail1,
        isLoading: false,
        error: ''
      }
    };

    const expected = {
      departmentDetail: departmentDetail1,
      isLoading: false,
      error: ''
    };

    expect(mapStateToProps(state)).toEqual(expected);
  });
});
