import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import InputFluid from '../common/TextInputComponent';
import ArtButton from '../common/ButtonComponent';
import DropdownComponent from '../common/DropdownComponent';
import StatusComponent from '../common/StatusComponent';
import ModalComponent from '../common/ModalComponent';

import { ToastMessage } from '../../_utils/ToastMessage';

export default class Modal extends React.Component {
  state = {
    location: this.props.data.location || '',
    block: this.props.data.name || ''
  };

  componentWillReceiveProps({ successMessage }) {
    if (successMessage && successMessage === 'Block added successfully.') {
      this.handleToggle();
      ToastMessage.error({ message: successMessage });
    }
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    this.props.createOfficeBlock({
      name: this.state.block,
      location: this.state.location
    });
  };

  handleUpdate = (event) => {
    event.preventDefault();
    ToastMessage.error({ message: 'Update not available currently' });
  };

  handleSelect = (event, data) => {
    this.setState({ location: data.value });
  };

  handleToggle = () => {
    this.props.onToggle();
    this.setState({
      block: '',
      location: ''
    });
  };

  generateDropdownOptions = () => {
    const { locationList = [] } = this.props;
    return locationList.map(country => ({
      key: country.id,
      text: country.name,
      value: country.id
    }));
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
        ADD OFFICE BLOCK
      </Button>
    );

    return (
      <ModalComponent
        modalTitle={title}
        trigger={showTrigger ? trigger : null}
        toggleModal={this.handleToggle}
        modalOpen={open}
        data-test="centers-modal-wrapper"
      >
        <React.Fragment>
          {showStatus && (
            <StatusComponent
              message={successMessage || errorMessage}
              className={successMessage ? 'success-status' : 'error-status'}
              reset={resetMessage}
              data-test="centers-status"
            />
          )}

          <Form data-test="centers-form">
            <label htmlFor="block" className="label-style">
              Block Name
              <InputFluid
                name="block"
                value={this.state.block}
                onChange={this.handleInputChange}
                placeHolder="Enter Centre Name"
                data-test="centers-name-input"
              />
            </label>
            <br />

            <label htmlFor="asset-make" className="label-style">
              Location
              <DropdownComponent
                customClass="form-dropdown add-asset-dropdown"
                label="location"
                placeholder="Select Location"
                name="location"
                value={this.state.location}
                options={this.generateDropdownOptions()}
                onChange={this.handleSelect}
                upward={false}
                data-test="centers-country-dropdown"
              />
            </label>

            <div className="modal__buttons">
              <ArtButton
                customCss="cancel"
                buttonName="Cancel"
                handleClick={this.handleToggle}
                data-test="centers-cancel-button"
              />

              <ArtButton
                customCss="save"
                buttonName="Save"
                color="primary"
                handleClick={mode === 'add' ? this.handleSubmit : this.handleUpdate}
                buttonState={isLoading}
                data-test="centers-save-button"
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
  locationList: PropTypes.array,
  isLoading: PropTypes.bool,
  createOfficeBlock: PropTypes.func,
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
