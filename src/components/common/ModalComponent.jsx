import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { SemanticToastContainer } from 'react-semantic-toasts';
import '../../_css/ModalComponent.css';

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
      <span className={this.props.className}>
        <Modal
          trigger={
            this.props.trigger ? (
              <span
                tabIndex="-1"
                role="button"
                onClick={this.toggleModal}
                onKeyUp={(() => {})}
              >
                {this.props.trigger}
              </span>
            ) : (
              <i
                className="plus link icon"
                onClick={this.toggleModal}
                onKeyUp={() => {}}
                role="button"
                tabIndex="-1"
              />
            )}
          open={this.state.modalOpen}
          onClose={this.toggleModal}
          size={this.props.modalSize}
          closeIcon
        >
          <Modal.Header>{this.props.modalTitle}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              {childrenWithProps}
            </Modal.Description>
          </Modal.Content>
        </Modal>
        <SemanticToastContainer />
      </span>
    );
  }
}
ArtModal.propTypes = {
  children: PropTypes.node,
  modalTitle: PropTypes.string,
  trigger: PropTypes.element,
  className: PropTypes.string,
  modalSize: PropTypes.string
};

ArtModal.defaultProps = {
  children: <br />,
  modalTitle: '',
  modalSize: 'small'
};
