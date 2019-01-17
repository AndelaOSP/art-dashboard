import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import ModalComponent from '../common/ModalComponent';
import CentreModalContainer from '../../_components/AndelaCentres/CentreModalContainer';

const AndelaCentresModal = (props) => {
  const {
    showTrigger,
    title,
    onToggleModal,
    modalOpen,
    onChange,
    onSubmit,
    onSelectCountry,
    country
  } = props;

  const trigger = (
    <Button className="add-asset" size="medium">
        ADD CENTRE
    </Button>
  );

  return (
    <ModalComponent
      trigger={showTrigger ? trigger : null}
      modalTitle={title}
      toggleModal={onToggleModal}
      modalOpen={modalOpen}
    >
      <CentreModalContainer
        handleChange={onChange}
        handleSubmit={onSubmit}
        onSelectCountry={onSelectCountry}
        country={country}
      />
    </ModalComponent>
  );
};

AndelaCentresModal.propTypes = {
  showTrigger: PropTypes.bool,
  title: PropTypes.string,
  onToggleModal: PropTypes.func,
  modalOpen: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onSelectCountry: PropTypes.func,
  country: PropTypes.string
};

export default AndelaCentresModal;
