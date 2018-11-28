import React from 'react';
import { connect } from 'react-redux';

import UploadAssetsComponent from '../../components/Assets/UploadAssetsComponent';

// eslint-disable-next-line react/prefer-stateless-function
class UploadAssets extends React.Component {
  render() {
    return (
      <UploadAssetsComponent />
    );
  }
}

const mapStateToProps = () => ({
});

export default connect(mapStateToProps, {})(UploadAssets);
