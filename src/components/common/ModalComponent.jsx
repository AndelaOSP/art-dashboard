import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

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
        size="large"
      >
      <Modal.Header>{this.props.modalTitle}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {this.props.children}
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}
ModalExampleControlled.propTypes = {
  children: PropTypes.func.isRequired,
};
