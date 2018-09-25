import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty, values } from 'lodash';
import { Container, Header, Grid } from 'semantic-ui-react';
import { loadAssetAssigneeUsers } from '../_actions/users.actions';
import { allocateAsset, unassignAsset } from '../_actions/asset.actions';

import ModalComponent from './common/ModalComponent';
import ButtonComponent from '../components/common/ButtonComponent';
import ConfirmAction from './common/ConfirmAction';
import AssignedTo from './AssignAssetComponent';
import '../_css/AssetDescriptionComponent.css';

class AssetDescriptionComponent extends React.Component {
 state = {
   assignedUser: {},
   assignAssetButtonState: true,
   selectedUser: 0
 }
 onSelectUserEmail = (event, data) => {
   this.setState({ selectedUser: data.value, assignAssetButtonState: false });
 };

handleAssign = () => {
  const { selectedUser } = this.state;
  const { id } = this.props.assetDetail;
  const assetAllocated = {
    asset: id,
    current_owner: selectedUser
  };
  this.props.allocateAsset(assetAllocated, this.props.serialNumber);
};

handleUnassign = () => {
  const { id } = this.props.assetDetail;
  const assetAssigned = {
    asset: id,
    current_status: 'Available'
  };
  this.props.unassignAsset(assetAssigned, this.props.serialNumber);
};

handleConfirm = () => {
  if (isEmpty(values(this.state.assignedUser))) {
    return this.handleAssign();
  }
  return this.handleUnassign();
};

triggerProps = () => {
  if (isEmpty(values(this.state.assignedUser))) {
    return {
      buttonName: 'Assign Asset',
      customCss: 'assign-asset',
      disabledState: this.state.assignAssetButtonState,
      color: 'primary'
    };
  }
  return {
    buttonName: 'Unassign Asset',
    customCss: 'unassign-asset',
    disabledState: false,
    color: 'primary'
  };
}

render() {
  const { onSelectUserEmail, assignedUser } = this.state;
  const { users, selectedUserId, toggleModal, buttonState, buttonLoading } = this.props;
  const triggerProps = this.triggerProps();
  return (
    <Container>
      <Grid columns={2} stackable className="asset-description">
        <Grid.Column>
          <Header as="h3" content="Asset Specs" />
          <div className="asset-specs">
            12-inch (diagonal) LED-backlit display with IPS technology
            2304-by-1440 resolution at 226 pixels per inch with support for millions of colors
            16:10 aspect ratio
          </div>
        </Grid.Column>
        <Grid.Column>
          <AssignedTo
            onSelectUserEmail={onSelectUserEmail}
            assignedUser={assignedUser}
            users={users}
            selectedUserId={selectedUserId}
          />
          <ModalComponent
            trigger={<ButtonComponent {...triggerProps} />}
            modalTitle="Confirm Action"
          >
            <ConfirmAction
              toggleModal={toggleModal}
              handleConfirm={this.handleConfirm}
              buttonState={buttonState}
              buttonLoading={buttonLoading}
            />
          </ModalComponent>
        </Grid.Column>
      </Grid>
    </Container>
  );
}
}

AssetDescriptionComponent.propTypes = {
  onSelectUserEmail: PropTypes.func,
  assignedUser: PropTypes.object,
  users: PropTypes.array,
  selectedUserId: PropTypes.number,
  assignAssetButtonState: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func,
  handleConfirm: PropTypes.func.isRequired,
  buttonState: PropTypes.bool.isRequired,
  buttonLoading: PropTypes.bool.isRequired,
  unAssignedAsset: PropTypes.object,
  assetDetail: PropTypes.object,
  allocateAsset: PropTypes.func,
  serialNumber: PropTypes.string,
  unassignAsset: PropTypes.func
};

AssetDescriptionComponent.defaultProps = {
  users: [],
  selectedUserId: 0
};

export default connect(null, {
  loadAssetAssigneeUsers,
  allocateAsset,
  unassignAsset
})(AssetDescriptionComponent);
