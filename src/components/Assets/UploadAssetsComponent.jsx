import React from 'react';
import PropTypes from 'prop-types';
import { Progress, Icon } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import NavBarComponent from '../../_components/NavBarContainer';
import '../../_css/UploadAssets.css';

const StatusMessage = props => <div className={`${props.className} `}>{props.message}</div>;

const uploadStatus = (success, error) => {
  if (success.hasOwnProperty('fail') || error) {
    return (
      <div>
        <Icon name="x icon" size="big" />
        {success.fail || error}
      </div>
    );
  }

  return (
    <div>
      <Icon name="check" size="big" />
      {success.success}
    </div>
  );
};

const errorMessageHelper = (error, success) => {
  if (success.hasOwnProperty('fail')) {
    return (
      <span className="error-guide">
        Please download
        <a href={success.file}>this file</a> , fix errors and upload again.
      </span>
    );
  }
  if (error) {
    return (
      <span className="error-guide">
        Please confirm the file is well formatted and try uploading again.
      </span>
    );
  }

  return null;
};

const UploadAssets = (props) => {
  const { loading, success, error } = props;
  const showStatus = success || error;

  return (
    <NavBarComponent title="Assets">
      <div className="center-upload">
        <span className="failed-file">
          <a href="sample_import_file/" onClick={() => props.handleFileDownload('sample_import_file/')}>
            Download the sample file
          </a>{' '}
          , fill the columns and upload it.
        </span>

        <Dropzone
          onDrop={props.handleDrop}
          onFileDialogCancel={props.handleCancel}
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
              reset={props.resetUpload}
            />
          )}

          {!showStatus && !loading && (
            <p>Drag and drop the file here, or click to select the file to upload.</p>
          )}
        </Dropzone>

        {errorMessageHelper(error, success, props.handleFileDownload)}
      </div>
    </NavBarComponent>
  );
};

UploadAssets.propTypes = {
  success: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool,
  handleDrop: PropTypes.func,
  handleCancel: PropTypes.func,
  handleFileDownload: PropTypes.func,
  resetUpload: PropTypes.func
};

export default UploadAssets;
