import React from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';


const AddAssetModel = () => (
    <Modal trigger={<i className="plus link icon" />} centered={true}>
    <Modal.Header>Add Model</Modal.Header>
    <Modal.Content>
        <div class="ui form">
        <div class="field">
        <label>Model Number</label>
        <input type="text" />
        <br>
        </br>
        <label>Make Label</label>
        <input type="text" />
        </div>
        </div>
    </Modal.Content>
    <Modal.Actions>
      <Button color='red'>
        <Icon name='remove' /> Cancel
      </Button>
      <Button color='green'>
        <Icon name='checkmark' /> Save
      </Button>
    </Modal.Actions>
  </Modal>
    )
    export default AddAssetModel
