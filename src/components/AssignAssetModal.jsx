import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, values } from 'lodash';
import ModalComponent from './common/ModalComponent';
import ButtonComponent from '../components/common/ButtonComponent';

const AssignAssetModal = props => (
  <div className="header-modal-button">
    <ModalComponent
      trigger={
        (!isEmpty(values(props.assignedUser)))
          ?
            <ButtonComponent
              buttonName="Unassign Asset"
              customCss="unassign-asset"
              color="primary"
            />
          :
            <ButtonComponent
              buttonName="Assign Asset"
              customCss="assign-asset"
              disabledState={props.assignAssetButtonState}
              color="primary"
            />
      }
      modalTitle="Confirm Action"
    >
      <div>
        <label>
          Are you sure you want to perform this action?
        </label>
        <br />
        <ButtonComponent
          className="cancel"
          buttonName="Cancel"
          handleClick={props.toggleModal}
        />
        <ButtonComponent
          className="save"
          buttonName="Save"
          color="primary"
          buttonState={props.buttonState}
          handleClick={props.handleConfirm}
        />
      </div>
    </ModalComponent>
  </div>
);

AssignAssetModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  assignedUser: PropTypes.object.isRequired,
  buttonState: PropTypes.bool.isRequired,
  assignAssetButtonState: PropTypes.bool.isRequired
};

export default AssignAssetModal;
