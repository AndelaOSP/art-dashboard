import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Header, Progress } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

import NavBarComponent from '../../_components/NavBarContainer';
import StatusMessageComponent from '../common/StatusComponent';
import '../../_css/UploadAssets.css';

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
          <Dropzone
            onDrop={props.handleDrop}
            onFileDialogCancel={props.handleCancel}
            accept="text/csv"
            className="dropzone"
          >
            {loading && !showStatus &&
              <Progress style={{ width: '90%', color: '#fff' }} percent={100} active>
                Active
              </Progress>
            }
            {showStatus && (
              <StatusMessageComponent
                message={success || error}
                className={success ? 'success-status' : 'error-status'}
              />
            )}
            {!showStatus && !loading &&
              <p>Drag and drop files here, or click to select files to upload.</p>
            }
          </Dropzone>

          {error &&
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <span>Please download <a href="#">this file</a>, fix errors and upload again.</span>
          }
        </div>
      </div>
    </NavBarComponent>
  );
};

UploadAssets.propTypes = {
  success: PropTypes.string,
  error: PropTypes.string,
  loading: PropTypes.bool,
  handleDrop: PropTypes.func,
  handleCancel: PropTypes.func
};

export default UploadAssets;
