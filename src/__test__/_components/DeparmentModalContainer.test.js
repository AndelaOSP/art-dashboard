import expect from 'expect';
import { mapStateToProps } from '../../_components/Departments/DepartmentModalContainer';

describe('Renders <Department /> tests', () => {
  it('calls mapStateToProps', () => {
    const state = {
      departments: {
        updateError: '',
        updateSuccess: '',
        isLoading: false,
        createSuccess: '',
        createFailure: ''
      }
    };

    const expected = {
      isLoading: false,
      successMessage: '',
      errorMessage: '',
      showStatus: false
    };

    expect(mapStateToProps(state)).toEqual(expected);
  });
});
