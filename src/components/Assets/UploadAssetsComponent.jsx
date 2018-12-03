import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Header, Progress } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

import NavBarComponent from '../../_components/NavBarContainer';
import StatusMessageComponent from '../common/StatusComponent';
import '../../_css/UploadAssets.css';

const uploadStatus = (success, error) => {
  if (success.hasOwnProperty('fail') || error) {
    return success.fail || error;
  }
  return success.success;
};

const errorMessageHelper = (success, handleFileDownload) => {
  if (success.hasOwnProperty('fail')) {
    return (
      <span className="error-guide">
        Please download
        <a href="#" onClick={() => handleFileDownload(success.file)}>
          this file
        </a>
        , fix errors and upload again.
      </span>
    );
  }

  return null;
};

const UploadAssets = (props) => {
  const { loading, success, error } = props;
  const showStatus = success || error;

  return (
    <NavBarComponent>
      <div className="add-asset">
        <div id="page-heading-section">
          <Header as="h1" id="page-headings" floated="left" content="Upload Asset" />
          <Divider id="assets-divider" />
        </div>
        <div className="center-upload">
          <span className="failed-file">
            <a href="#" onClick={() => props.handleFileDownload('url')}>
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
              <StatusMessageComponent
                message={uploadStatus(success, error)}
                className={
                  success.hasOwnProperty('fail') || error ? 'error-status' : 'success-status'
                }
                reset={props.resetUpload}
              />
            )}

            {!showStatus && !loading && (
              <p>Drag and drop files here, or click to select files to upload.</p>
            )}
          </Dropzone>

          {errorMessageHelper(success, props.handleFileDownload)}
        </div>
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
