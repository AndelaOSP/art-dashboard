import React from 'react';
import { connect } from 'react-redux';

import { uploadAssets } from '../../_actions/assets.action';
import UploadAssetsComponent from '../../components/Assets/UploadAssetsComponent';

// eslint-disable-next-line react/prefer-stateless-function
class UploadAssets extends React.Component {
  render() {
    return <UploadAssetsComponent />;
  }
}

const mapStateToProps = ({ assets }) => {
  const { errorMessage, hasError, isLoading, success } = assets;
  return {
    errorMessage,
    hasError,
    isLoading,
    success
  };
};

export default connect(
  mapStateToProps,
  { uploadAssets }
)(UploadAssets);
