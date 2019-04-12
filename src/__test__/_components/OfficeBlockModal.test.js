import expect from 'expect';
import { mapStateToProps } from '../../_components/OfficeBlocks/OfficeBlocksModal';

describe('Render <OfficeBlocksModal /> tests', () => {
  it('calls mapStateToProps', () => {
    const state = {
      officeLocations: {
        locationList: [],
        createSuccess: false,
        createFailure: false,
        isLoading: false,
        updateError: false,
        updateSuccess: false
      }
    };

    const expected = {
      isLoading: false,
      successMessage: false,
      errorMessage: false,
      locationList: [],
      showStatus: false
    };

    expect(mapStateToProps(state)).toEqual(expected);
  });

  it('calls mapStateToProps', () => {
    const state = {
      officeLocations: {
        locationList: [],
        createSuccess: false,
        createFailure: {
          non_field_errors: ['Non field error']
        },
        isLoading: false,
        updateError: false,
        updateSuccess: false
      }
    };

    const expected = {
      isLoading: false,
      successMessage: false,
      errorMessage: 'Non field error',
      locationList: [],
      showStatus: true
    };

    expect(mapStateToProps(state)).toEqual(expected);
  });
});
