import React from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';



const AddAssetModel = (props) => {
  const updateValues = (e) => {
    const name = e.target.name
    const value = e.target.value
   props.updateFromField(name, value)
  }
  const handleSubmit = () => {
    props.handleSubmit()
  }
  return(
    <Modal trigger={<i className="plus link icon" />} centered={true}>
    <Modal.Header>Add Model</Modal.Header>
    <Modal.Content>
        <div className="ui form">
        <div className="field">
        <label>Model Number</label>
        <input name='modelNumber' onChange={updateValues} type="text" />
        <br>
        </br>
        <label>Make Label</label>
        <input name='assetMake' onChange={updateValues} type="text" />
        </div>
        </div>
    </Modal.Content>
    <Modal.Actions>
      <Button color='red'>
        <Icon name='remove' /> Cancel
      </Button>
      <Button
        color='green'
        onClick={handleSubmit}
      >
        <Icon name='checkmark' /> Save
      </Button>
    </Modal.Actions>
  </Modal>
)}

export default AddAssetModel
