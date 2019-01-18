import React from 'react';
import { Modal, TransitionablePortal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { SemanticToastContainer } from 'react-semantic-toasts';

import '../../_css/ModalComponent.css';

const ArtModal = (props) => {
  const {
    children,
    closeIcon,
    closeOnEscape,
    closeOnDimmerClick,
    modalSize,
    modalOpen
  } = props;

  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child,
      { toggleModal: props.toggleModal }
    )
  );

  return (
    <span className={props.className}>
      <span
        tabIndex="-1"
        role="button"
        onClick={props.toggleModal}
        onKeyUp={() => {}}
      >
        {props.trigger}
      </span>

      <TransitionablePortal open={modalOpen} transition={{ animation: 'scale', duration: 500 }}>
        <Modal
          className="art-modal"
          open={modalOpen}
          onClose={props.toggleModal}
          size={modalSize}
          closeIcon={closeIcon}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
        >
          <Modal.Header>{props.modalTitle} <div className="underline" /></Modal.Header>
          <Modal.Content>
            <Modal.Description style={{ width: '100%' }}>
              {childrenWithProps}
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </TransitionablePortal>
      <SemanticToastContainer />
    </span>
  );
};

ArtModal.propTypes = {
  children: PropTypes.node,
  modalTitle: PropTypes.string,
  trigger: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.number
  ]),
  className: PropTypes.string,
  modalSize: PropTypes.string,
  closeOnEscape: PropTypes.bool,
  closeOnDimmerClick: PropTypes.bool,
  closeIcon: PropTypes.bool,
  modalOpen: PropTypes.bool,
  toggleModal: PropTypes.func
};

ArtModal.defaultProps = {
  children: <br />,
  modalTitle: '',
  modalSize: 'small',
  closeOnEscape: true,
  closeOnDimmerClick: true,
  closeIcon: true
};

export default ArtModal;
