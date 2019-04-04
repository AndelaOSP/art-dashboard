import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import InputFluid from '../common/TextInputComponent';
import ArtButton from '../common/ButtonComponent';
import StatusComponent from '../common/StatusComponent';
import ModalComponent from '../common/ModalComponent';

export default class Modal extends React.Component {
  state = {
    department: this.props.data.name || ''
  };

  handleInputChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    this.props.createDepartment({
      name: this.state.department
    });
  };

  handleUpdate = (event) => {
    event.preventDefault();

    const { data } = this.props;
    this.props.updateAndelaCentre(data.id, {
      name: this.state.department
    });
  };

  handleSelect = (event, data) => {
    this.setState({ department: data.value });
  };

  handleToggle = () => {
    this.props.onToggle();
    this.setState({
      department: ''
    });
  };

  render() {
    const {
      title,
      showStatus,
      successMessage,
      errorMessage,
      resetMessage,
      isLoading,
      showTrigger,
      mode,
      open
    } = this.props;

    const trigger = (
      <Button className="filter-button" size="medium">
        ADD DEPARTMENT
      </Button>
    );

    return (
      <ModalComponent
        modalTitle={title}
        trigger={showTrigger ? trigger : null}
        toggleModal={this.handleToggle}
        modalOpen={open}
        data-test="departments-modal-wrapper"
      >
        <React.Fragment>
          {showStatus && (
            <StatusComponent
              message={successMessage || errorMessage}
              className={successMessage ? 'success-status' : 'error-status'}
              reset={resetMessage}
              data-test="departments-status"
            />
          )}

          <Form data-test="departments-form">
            <label htmlFor="department" className="label-style">
              Department Name
              <InputFluid
                name="department"
                value={this.state.department}
                onChange={this.handleInputChange}
                placeHolder="Enter Department Name"
                data-test="departments-name-input"
              />
            </label>
            <br />

            <div className="modal__buttons">
              <ArtButton
                customCss="cancel"
                buttonName="Cancel"
                handleClick={this.handleToggle}
                data-test="departments-cancel-button"
              />

              <ArtButton
                customCss="save"
                buttonName="Save"
                color="primary"
                handleClick={mode === 'add' ? this.handleSubmit : this.handleUpdate}
                buttonState={isLoading}
                data-test="departments-save-button"
              />
            </div>
          </Form>
        </React.Fragment>
      </ModalComponent>
    );
  }
}

Modal.propTypes = {
  showTrigger: PropTypes.bool,
  title: PropTypes.string,
  mode: PropTypes.string,
  showStatus: PropTypes.bool,
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  resetMessage: PropTypes.func,
  isLoading: PropTypes.bool,
  createDepartment: PropTypes.func,
  updateAndelaCentre: PropTypes.func,
  onToggle: PropTypes.func,
  open: PropTypes.bool,
  data: PropTypes.object
};

Modal.defaultProps = {
  showTrigger: false,
  mode: 'add',
  title: 'Modal',
  data: {}
};
