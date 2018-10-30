import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getAssetStatus } from '../../_actions/assetStatus.action';

import DashboardComponent from '../../components/Dashboard/DashboardComponent';

const mapStateToProps = ({ assetStatus }) => {
  const {
    allocated,
    available,
    damaged,
    lost
  } = assetStatus;

  return {
    allocatedAssets: allocated,
    availableAssets: available,
    damagedAssets: damaged,
    lostAssets: lost
  };
};

export default withRouter(connect(mapStateToProps, {
  getAssetStatus
})(DashboardComponent));
