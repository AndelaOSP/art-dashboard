import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { SemanticToastContainer } from 'react-semantic-toasts';
import '../../_css/ModalComponent.css';

export default class ArtModal extends Component {
  state = { modalOpen: this.props.open || false }

  close = () => this.setState({ modalOpen: !this.state.modalOpen });

  render() {
    const { children } = this.props;
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child,
        { close: this.close }
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
                onClick={this.close}
                onKeyUp={(() => {})}
              >
                {this.props.trigger}
              </span>
            ) : (
              <i
                className="plus link icon"
                onClick={this.close}
                onKeyUp={() => {}}
                role="button"
                tabIndex="-1"
              />
            )}
          open={this.state.modalOpen}
          onClose={this.close}
          size={this.props.modalSize}
          closeIcon={this.props.closeIcon}
          closeOnEscape={this.props.closeOnEscape}
          closeOnDimmerClick={this.props.closeOnDimmerClick}
        >
          <Modal.Header>{this.props.modalTitle} <div className="underline" /></Modal.Header>
          <Modal.Content style={{ overflowY: 'auto' }}>
            <Modal.Description style={{ width: '100%' }}>
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
  modalSize: PropTypes.string,
  open: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  closeOnDimmerClick: PropTypes.bool,
  closeIcon: PropTypes.bool
};

ArtModal.defaultProps = {
  children: <br />,
  modalTitle: '',
  modalSize: 'small',
  open: false,
  closeOnEscape: true,
  closeOnDimmerClick: true,
  closeIcon: true
};
