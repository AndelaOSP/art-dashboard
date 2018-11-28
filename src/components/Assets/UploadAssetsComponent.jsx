import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid, Header, Progress } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

import NavBarComponent from '../../_components/NavBarContainer';
import StatusMessageComponent from '../common/StatusComponent';

const UploadAssets = (props) => {
  const { success, error } = props;
  const showStatus = success || error;

  return (
    <NavBarComponent>
      <div className="add-asset">
        <div id="page-heading-section">
          <Header as="h1" id="page-headings" floated="left" content="Upload Asset" />
          <Divider id="assets-divider" />
        </div>


        <Grid centered divided>

          {showStatus && (
            <Grid.Row>
              <Grid.Column>
                <StatusMessageComponent
                  message={success || error}
                  className={success ? 'success-status' : 'error-status'}
                  reset={props.resetMessage}
                />
              </Grid.Column>
            </Grid.Row>
          )}
          <Grid.Column width={10}>
            <div className="upload-file">
              <div className="uploader">
                <div className="drag-drop">
                  <Dropzone
                    onDrop={this.onDrop}
                    onFileDialogCancel={this.onCancel}
                  >
                    <p>Drag and drop files here, or click to select files to upload.</p>
                  </Dropzone>
                </div>
                <button className="choose-file" onClick={this.onCancel}>
                  Cancel Upload
                </button>
              </div>
              <div className="progress-bar">
                <Progress percent={2} progress />
              </div>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    </NavBarComponent>
  );
};


UploadAssets.propTypes = {
  success: PropTypes.string,
  error: PropTypes.string,
  resetMessage: PropTypes.func
};

export default UploadAssets;
