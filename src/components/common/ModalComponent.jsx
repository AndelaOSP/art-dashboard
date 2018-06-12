import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { SemanticToastContainer } from 'react-semantic-toasts';

export default class ArtModal extends Component {
  state = { modalOpen: false }

  toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen });

  render() {
    const { children } = this.props;
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child,
        { toggleModal: this.toggleModal }
      )
    );
    return (
      <div>
        <Modal
          trigger={
            <i
              className="plus link icon"
              onClick={this.toggleModal}
              onKeyUp={() => {}}
              role="button"
            />
          }
          open={this.state.modalOpen}
          onClose={this.toggleModal}
          size="small"
          closeIcon
          style={{ marginLeft: "-270px", width: "35%" }}
        >
        <Modal.Header>{this.props.modalTitle}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              {childrenWithProps}
            </Modal.Description>
          </Modal.Content>
        </Modal>
        <SemanticToastContainer />
      </div>
    );
  }
}
ArtModal.propTypes = {
  children: PropTypes.node.isRequired,
  modalTitle: PropTypes.string.isRequired
};

ArtModal.defaultProps = {
  children: <br />,
  modalTitle: ""
}
