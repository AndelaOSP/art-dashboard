import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Header } from 'semantic-ui-react';
import DropdownComponent from '../components/common/DropdownComponent';
import { ASSET_AVAILABLE, ASSET_ALLOCATED } from '../_constants';

const userEmailsOptions = usersList => usersList.map((typeOption, index) => ({
  key: index,
  text: typeOption.assignee,
  value: typeOption.id
}));

const AssignedTo = (props) => {
  const showAssignDropdown =
    props.assetStatus === ASSET_AVAILABLE || props.assetStatus === ASSET_ALLOCATED;

  if (isEmpty(props.assignedUser)) {
    const hasError = !!props.errorMessage;
    const errorClass = hasError ? 'error' : '';

    return (
      <div id="allocate-asset">
        <Header as="h3" content="Assign this asset to:" />
        {showAssignDropdown && (
          <DropdownComponent
            customClass={`form-dropdown ${errorClass}`}
            label="Assign this asset to:"
            placeHolder="Select Andela Email To Assign This Asset"
            name="assign-user"
            search
            value={props.selectedUserId}
            onChange={props.onSelectUserEmail}
            options={userEmailsOptions(props.users)}
          />
        )}

        {!showAssignDropdown && (
          <p>You cannot assign this asset. Only available assets can be assigned.</p>
        )}

        {
          hasError && (
            <p className="error-message">{props.errorMessage}</p>
          )
        }
      </div>
    );
  }

  return (
    <div id="allocate-asset">
      <Header as="h3" content="Assigned To:" />
      <div
        id="email"
        className="asset-specs"
      >
        {props.assignedUser.email}
      </div>
    </div>
  );
};

AssignedTo.propTypes = {
  onSelectUserEmail: PropTypes.func,
  assignedUser: PropTypes.object,
  users: PropTypes.array,
  selectedUserId: PropTypes.number,
  errorMessage: PropTypes.string,
  assetStatus: PropTypes.string
};

AssignedTo.defaultProps = {
  errorMessage: '',
  onSelectUserEmail: () => {},
  assignedUser: {},
  users: [],
  selectedUserId: null
};

export default AssignedTo;
