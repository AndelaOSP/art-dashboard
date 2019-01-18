import { connect } from 'react-redux';
import { uploadAssets, downloadFile, resetUploadAssets } from '../../_actions/assets.action';
import UploadAssets from '../../components/Assets/UploadAssetsComponent';

export const mapStateToProps = ({ assets }) => {
  const {
    uploadError,
    hasError,
    isUpLoading,
    success,
    downloadedFile,
    downloadError
  } = assets;

  return {
    error: uploadError || downloadError,
    hasError,
    loading: isUpLoading,
    success,
    downloadedFile,
    downloadError
  };
};

export default connect(mapStateToProps, {
  uploadAssets,
  downloadFile,
  resetUploadAssets
})(UploadAssets);
