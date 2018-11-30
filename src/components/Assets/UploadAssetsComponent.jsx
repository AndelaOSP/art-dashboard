import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid, Header, Progress } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

import NavBarComponent from '../../_components/NavBarContainer';
import StatusMessageComponent from '../common/StatusComponent';
import LoaderComponent from '../../components/LoaderComponent';

import '../../_css/UploadAssets.css';

const UploadAssets = (props) => {
  console.log({ props });

  const { loading, success, error } = props;
  const showStatus = success || error;

  if (loading) {
    return (
      <NavBarComponent>
        <LoaderComponent />
      </NavBarComponent>
    );
  }

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
            {showStatus && (
              <StatusMessageComponent
                message={success || error}
                className={success ? 'success-status' : 'error-status'}
              />
            )}
            {!showStatus && <p>Drag and drop files here, or click to select files to upload.</p>}
          </Dropzone>
          <aside>
            <h2>Dropped files</h2>
            <ul>
              {props.files.map(f => (
                <li key={f.name}>
                  {f.name} - {f.size} bytes
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </NavBarComponent>
  );
};

UploadAssets.propTypes = {
  success: PropTypes.string,
  error: PropTypes.string,
  handleDrop: PropTypes.func,
  handleCancel: PropTypes.func,
  files: PropTypes.array
};

export default UploadAssets;
