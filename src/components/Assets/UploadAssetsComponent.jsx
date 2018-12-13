import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import NavBarComponent from '../../_components/NavBarContainer';
import { uploadStatus, StatusMessage } from './UploadStatus';
import errorMessage from './ErrorMessages';
import '../../_css/UploadAssets.css';

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
    this.resetUpload();
    this.setState({ files });
    this.props.uploadAssets(files);
  };

  handleCancel = () => {
    this.setState({
      files: []
    });
  };

  resetUpload = () => {
    this.setState({
      files: []
    });
    this.props.resetUploadAssets();
  };

  handleFileDownload = (url) => {
    this.props.downloadFile(url);
  };

  render() {
    console.log('this.state', this.state.files);
    const { loading, success, error } = this.props;
    const showStatus = success || error;
    return (
      <NavBarComponent title="Assets">
        <div className="center-upload">
          <span className="failed-file">
            <a href="sample_import_file/" onClick={() => this.handleFileDownload('sample_import_file/')}>
              Download the sample file
            </a>{' '}
            , fill the columns and upload it.
          </span>

          <Dropzone
            onDrop={this.handleDrop}
            onFileDialogCancel={this.handleCancel}
            accept="text/csv"
            className="dropzone"
          >
            {loading && !showStatus && (
              <Progress style={{ width: '90%' }} percent={100} active>
                Upload in progress...
              </Progress>
            )}

            {showStatus && (
              <StatusMessage
                message={uploadStatus(success, error)}
                className={success.hasOwnProperty('fail') || error ? 'error-status' : 'success-status'}
                reset={this.resetUpload}
              />
            )}

            {!showStatus && !loading && (
              <p>Drag and drop the file here, or click to select the file to upload.</p>
            )}
          </Dropzone>

          {errorMessage(error, success, this.handleFileDownload)}
        </div>
      </NavBarComponent>
    );
  }
}

UploadAssets.propTypes = {
  success: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool,
  downloadedFile: PropTypes.string,
  downloadFile: PropTypes.func,
  resetUploadAssets: PropTypes.func,
  uploadAssets: PropTypes.func
};

export default UploadAssets;
