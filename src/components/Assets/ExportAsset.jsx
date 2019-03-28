import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';
import { SemanticToastContainer } from 'react-semantic-toasts';
import '../../_css/ExportAsset.css';

import { ToastMessage } from '../../_utils/ToastMessage';


class ExportAsset extends React.Component {
  state = {
    loading: false,
    open: false,
    filePath: ''
  }

  componentWillReceiveProps(nextProps) {
    const { exportAsset } = nextProps;
    const { loading } = this.state;
    if ((!exportAsset.hasError && exportAsset.data) && loading) {
      this.setState({
        loading: false,
        filePath: exportAsset.data,
        open: true
      });
    } else if (exportAsset.hasError) {
      this.setState({
        loading: false
      });
      ToastMessage.error({ message: exportAsset.message });
    }
  }

  close = () => this.setState({ open: false })

  handleExport = () => {
    const { filePath } = this.state;
    if (filePath) {
      this.setState({
        loading: false,
        open: true
      });
    } else {
      const { exportAssetsAction } = this.props;
      this.setState({
        loading: true
      });
      exportAssetsAction();
    }
  }

  render() {
    const { assets } = this.props;
    const { loading, open, filePath } = this.state;
    return (
      <div className="export-asset">
        <SemanticToastContainer />
        <Button
          disabled={!assets}
          className="export-button"
          onClick={this.handleExport}
          loading={loading}
        >
          Export Assets
        </Button>
        <Modal
          open={open}
          onClose={this.close}
        >
          <Modal.Header>Click below to download the file</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <a href={filePath}>Click Here to download</a>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

ExportAsset.propTypes = {
  assets: PropTypes.array,
  exportAssetsAction: PropTypes.func.isRequired,
  exportAsset: PropTypes.object.isRequired
};

export default ExportAsset;
