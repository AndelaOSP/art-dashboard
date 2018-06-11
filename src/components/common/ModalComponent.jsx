import { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Icon } from 'semantic-ui-react';
import { loadAssetMakes } from '../_actions/assetMakes.actions';


export class ModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state ={
            modelNumber: '',
            assetMake: [],
            newModel: {},
            modalOpen: false,
        }
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    updateFromField   = (name, value) => {
        let newModel = this.state.newModel
        newModel[name] = value
        this.setState({newModel})
      }

    render(
        return (
            <div>
            <Modal trigger={<i className="plus link icon" onClick={handleOpen}/>}
            open='false' basic size='small' >
            <Modal.Header>{header}</Modal.Header>
            </Modal>
            </div>
            );

    );
}
export default ModalComponent;
