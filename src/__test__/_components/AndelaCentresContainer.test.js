import expect from 'expect';
import { mapStateToProps } from '../../_components/AndelaCentres/AndelaCentresContainer';

describe('Render <AndelaCentres /> tests', () => {
  it('calls mapStateToProps', () => {
    const state = {
      officeLocations: {
        locationList: [],
        locationCount: 0,
        isLoading: false,
        error: ''
      }
    };

    const expected = {
      locationList: [],
      locationCount: 0,
      isLoading: false,
      error: ''
    };

    expect(mapStateToProps(state)).toEqual(expected);
  });
});
