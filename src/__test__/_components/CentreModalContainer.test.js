import expect from 'expect';
import { mapStateToProps } from '../../_components/AndelaCentres/CentreModalContainer';

describe('Renders <CentreModal /> tests', () => {
  it('calls mapStateToProps', () => {
    const state = {
      officeLocations: {
        countries: [],
        updateError: '',
        updateSuccess: '',
        isLoading: false,
        createSuccess: '',
        createFailure: ''
      }
    };

    const expected = {
      countries: [],
      isLoading: false,
      successMessage: '',
      errorMessage: '',
      showStatus: ''
    };

    expect(mapStateToProps(state)).toEqual(expected);
  });
});
