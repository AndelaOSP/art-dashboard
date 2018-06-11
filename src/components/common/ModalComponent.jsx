import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react';
import ArtButton from '../../components/common/ButtonComponent';

export default class ModalExampleControlled extends Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    return (
      <Modal
        trigger={<i className="plus link icon"  onClick={this.handleOpen}/>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
      >
      <Modal.Header>Header</Modal.Header>
        {this.props.children}
      </Modal>
    )
  }
}
