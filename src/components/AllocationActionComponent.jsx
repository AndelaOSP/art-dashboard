import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const AllocationActionComponent = ({ onEditClick }) => (
  <Button animated onClick={onEditClick}>
    <Button.Content hidden>Edit</Button.Content>
    <Button.Content visible>
      <Icon name="edit" id="edit" />
    </Button.Content>
  </Button>
);

AllocationActionComponent.propTypes = {
  onEditClick: PropTypes.func
};

AllocationActionComponent.defaultProps = {
  onEditClick: () => { }
};

export default AllocationActionComponent;
