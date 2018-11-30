import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { uploadAssets } from '../../_actions/assets.action';
import UploadAssetsComponent from '../../components/Assets/UploadAssetsComponent';

// eslint-disable-next-line react/prefer-stateless-function
class UploadAssets extends React.Component {
  state = {
    files: []
  };

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
  render() {
    return (
      <UploadAssetsComponent
        handleDrop={this.handleDrop}
        handleCancel={this.handleCancel}
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
  const { errorMessage, hasError, isLoading, success } = assets;
  return {
    error: errorMessage,
    hasError,
    loading: isLoading,
    success
  };
};

UploadAssets.propTypes = {
  uploadAssets: PropTypes.func
};
export default connect(
  mapStateToProps,
  { uploadAssets }
)(UploadAssets);
