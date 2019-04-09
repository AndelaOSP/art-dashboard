import expect from 'expect';
import { mapStateToProps } from '../../_components/Departments/DepartmentsContainer';

describe('Render <Departments /> tests', () => {
  it('calls mapStateToProps', () => {
    const state = {
      departments: {
        departmentsList: [],
        departmentsCount: 0,
        isLoading: false,
        error: '',
        updateError: '',
        updateSuccess: ''
      }
    };

    const expected = {
      departmentsList: [],
      departmentsCount: 0,
      isLoading: false,
      error: '',
      updateError: '',
      updateSuccess: '',
      entity: 'andela-departments'
    };

    expect(mapStateToProps(state)).toEqual(expected);
  });
});
