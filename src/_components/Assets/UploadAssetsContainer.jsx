import { connect } from 'react-redux';
import { uploadAssets, downloadFile, resetUploadAssets } from '../../_actions/assets.action';
import UploadAssets from '../../components/Assets/UploadAssetsComponent';

const mapStateToProps = ({ assets }) => {
  const {
    uploadError,
    hasError,
    isUpLoading,
    success,
    downloadedFile
  } = assets;

  return {
    error: uploadError,
    hasError,
    loading: isUpLoading,
    success,
    downloadedFile
  };
};

export default connect(
  mapStateToProps,
  {
    uploadAssets,
    downloadFile,
    resetUploadAssets
  }
)(UploadAssets);
