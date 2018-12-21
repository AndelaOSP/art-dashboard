import expect from 'expect';
import { mapStateToProps } from '../../_components/Assets/UploadAssetsContainer';

describe('Render <User /> tests', () => {
  it('calls mapStateToProps', () => {
    const state = {
      assets: {
        uploadError: '',
        hasError: false,
        isUpLoading: false,
        success: {},
        downloadedFile: '',
        downloadError: ''
      }
    };

    const expected = {
      error: '',
      hasError: false,
      loading: false,
      success: {},
      downloadedFile: '',
      downloadError: ''
    };

    expect(mapStateToProps(state)).toEqual(expected);
  });
});
