import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, values } from 'lodash';
import { Container, Header, Grid } from 'semantic-ui-react';
import ModalComponent from './common/ModalComponent';
import ButtonComponent from '../components/common/ButtonComponent';
import ConfirmAction from './common/ConfirmAction';
import AssignedTo from './AssignAssetComponent';
import '../_css/AssetDescriptionComponent.css';

const AssetDescriptionComponent = (props) => {
  let triggerProps = {
    buttonName: 'Assign Asset',
    customCss: 'assign-asset',
    disabledState: props.assignAssetButtonState,
    color: 'primary'
  };

  if (!isEmpty(values(props.assignedUser))) {
    triggerProps = {
      ...triggerProps,
      buttonName: 'Unassign Asset',
      customCss: 'unassign-asset',
      disabledState: false
    };
  }

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
            onSelectUserEmail={props.onSelectUserEmail}
            assignedUser={props.assignedUser}
            users={props.users}
            selectedUserId={props.selectedUserId}
          />
          <ModalComponent
            trigger={<ButtonComponent {...triggerProps} />}
            modalTitle="Confirm Action"
          >
            <ConfirmAction
              toggleModal={props.toggleModal}
              handleConfirm={props.handleConfirm}
              buttonState={props.buttonState}
              buttonLoading={props.buttonLoading}
            />
          </ModalComponent>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

AssetDescriptionComponent.propTypes = {
  onSelectUserEmail: PropTypes.func,
  assignedUser: PropTypes.object,
  users: PropTypes.array,
  selectedUserId: PropTypes.number,
  assignAssetButtonState: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func,
  handleConfirm: PropTypes.func.isRequired,
  buttonState: PropTypes.bool.isRequired,
  buttonLoading: PropTypes.bool.isRequired
};

AssetDescriptionComponent.defaultProps = {
  users: [],
  selectedUserId: 0
};

export default AssetDescriptionComponent;
