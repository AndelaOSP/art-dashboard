import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import '../_css/ActionComponent.css';

const ActionComponent = ({ onViewClick, onEditClick, viewWrapper, editWrapper }) => (
  <div className="action-group">
    {
      viewWrapper(
        <Button animated onClick={onViewClick}>
          <Button.Content hidden>View</Button.Content>
          <Button.Content visible>
            <Icon name="eye" id="view" />
          </Button.Content>
        </Button>
      )
    }
    {
      editWrapper(
        <Button animated onClick={onEditClick}>
          <Button.Content hidden>Edit</Button.Content>
          <Button.Content visible>
            <Icon name="edit" id="edit" />
          </Button.Content>
        </Button>
      )
    }
  </div>
);

ActionComponent.propTypes = {
  onEditClick: PropTypes.func,
  onViewClick: PropTypes.func,
  viewWrapper: PropTypes.func,
  editWrapper: PropTypes.func
};

ActionComponent.defaultProps = {
  onEditClick: () => { },
  onViewClick: () => { },
  viewWrapper: element => element,
  editWrapper: element => element
};

export default ActionComponent;
