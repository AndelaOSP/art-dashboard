import expect from 'expect';
import { mapStateToProps } from '../../_components/AndelaCentres/AndelaCentresContainer';

describe('Render <AndelaCentres /> tests', () => {
  it('calls mapStateToProps', () => {
    const state = {
      officeLocations: {
        locationList: [],
        locationCount: 0,
        isLoading: false,
        error: '',
        updateError: '',
        updateSuccess: '',
        countries: { results: [] }
      }
    };

    const expected = {
      locationList: [],
      locationCount: 0,
      isLoading: false,
      error: '',
      countries: { results: [] },
      updateSuccess: '',
      updateError: '',
      entity: 'andela-centres'
    };

    expect(mapStateToProps(state)).toEqual(expected);
  });
});
