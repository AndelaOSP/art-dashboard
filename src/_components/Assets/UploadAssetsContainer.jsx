import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Divider, Grid, Header, Progress } from 'semantic-ui-react';

import NavBarComponent from '../NavBarContainer';
import StatusMessageComponent from '../../components/common/StatusComponent';

import { createAsset, resetMessage } from '../../_actions/asset.actions';

// eslint-disable-next-line react/prefer-stateless-function
class UploadAssets extends React.Component {
  render() {
    const { success, error } = this.props;
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
                    reset={this.props.resetMessage}
                  />
                </Grid.Column>
              </Grid.Row>
            )}
            <Grid.Column width={10}>
              <div className="upload-file">
                <div className="uploader">
                  <div className="drag-drop"> Upload file </div>
                  <button className="choose-file">choose file</button>
                </div>
                <div className="progress-bar">
                  <Progress percent={44} progress />
                </div>
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </NavBarComponent>
    );
  }
}

UploadAssets.propTypes = {
  success: PropTypes.string,
  error: PropTypes.string,
  resetMessage: PropTypes.func
};

const mapStateToProps = ({
  assets
}) => ({
  success: assets.success,
  error: assets.errorMessage
});


export default connect(mapStateToProps, { createAsset, resetMessage })(UploadAssets);
