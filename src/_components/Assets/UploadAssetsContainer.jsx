import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { uploadAssets, downloadFile } from '../../_actions/assets.action';
import UploadAssetsComponent from '../../components/Assets/UploadAssetsComponent';

// eslint-disable-next-line react/prefer-stateless-function
class UploadAssets extends React.Component {
  state = {
    files: []
  };

  componentDidUpdate(prevProps) {
    if (this.props.downloadedFile !== prevProps.downloadedFile) {
      const link = document.createElement('a');
      link.href = this.props.downloadedFile;
      link.setAttribute('download', 'file.csv');
      document.body.appendChild(link);
      link.click();
    }
  }

  handleDrop = (files) => {
    this.setState(
      {
        files
      },
      () => {
        this.props.uploadAssets(files);
      }
    );
  };

  handleCancel = () => {
    this.setState({
      files: []
    });
  };

  submitAssets = () => {
    if (this.state.files) {
      this.props.uploadAssets(this.state.files);
    }
  };

  handleFileDownload = (url) => {
    this.props.downloadFile(url);
  }

  render() {
    return (
      <UploadAssetsComponent
        handleDrop={this.handleDrop}
        handleCancel={this.handleCancel}
        handleFileDownload={this.handleFileDownload}
        files={this.state.files}
        submitAssets={this.submitAssets}
        error={this.props.error}
        loading={this.props.loading}
        hasError={this.props.hasError}
        success={this.props.success}
      />
    );
  }
}

const mapStateToProps = ({ assets }) => {
  const {
    errorMessage,
    hasError,
    isLoading,
    success,
    downloadedFile
  } = assets;
  return {
    error: errorMessage,
    hasError,
    loading: isLoading,
    success,
    downloadedFile
  };
};

UploadAssets.propTypes = {
  uploadAssets: PropTypes.func,
  downloadFile: PropTypes.func,
  error: PropTypes.string,
  loading: PropTypes.bool,
  hasError: PropTypes.bool,
  success: PropTypes.object,
  downloadedFile: PropTypes.string
};
export default connect(
  mapStateToProps,
  {
    uploadAssets,
    downloadFile
  }
)(UploadAssets);
