import expect from 'expect';
import { mapStateToProps } from '../../_components/OfficeBlocks/OfficeBlocksContainer';

describe('Render <OfficeBlocks /> tests', () => {
  it('calls mapStateToProps', () => {
    const state = {
      officeLocations: {
        locationList: [],
        blockList: [],
        blockCount: 0,
        isLoading: false,
        error: '',
        updateError: '',
        updateSuccess: ''
      }
    };

    const expected = {
      locationList: [],
      blockList: [],
      blockCount: 0,
      isLoading: false,
      error: '',
      updateError: '',
      updateSuccess: '',
      entity: 'office-blocks'
    };

    expect(mapStateToProps(state)).toEqual(expected);
  });
});
