import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import InputFluid from '../common/TextInputComponent';
import ArtButton from '../common/ButtonComponent';
import DropdownComponent from '../common/DropdownComponent';
import StatusComponent from '../common/StatusComponent';
import ModalComponent from '../common/ModalComponent';

export default class Temp extends React.Component {
  state = {
    modalOpen: false,
    country: '',
    centre: ''
  };

  handleModalToggle = (id) => {
    console.log('Location ID: ', id);
    this.setState({ modalOpen: !this.state.modalOpen });
    this.props.resetMessage();
  }

	// handleEditToggleModal = (id) => {
  //   this.setState({
  //     editModalOpen: !this.state.editModalOpen,
  //     locationId: id
  //   });
  //   this.props.resetMessage();
  // }

  handleInputChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = () => {
    this.props.createOfficeLocation({
      centre_name: this.state.centre,
      country: this.state.country
    });
  }

  // equivalent of handleEditSubmit
  handleUpdate = (event, id) => {
    event.preventDefault();
    console.group('UPDATE SUBMIT');
    console.log('id: ', id);
    console.log('event: ', event);
    console.groupEnd();

    // this.props.updateAndelaCentre(this.state.locationId, {
    //   centre_name: this.state.centre,
    //   country: this.state.country
    // });
  }

  handleSelect = (event, data) => {
    this.setState({ country: data.value });
  }

  generateDropdownOptions = () => {
    const { countries = [] } = this.props;
    return countries.map(country => ({
      key: country.id,
      text: country.name,
      value: country.name
    }));
  }

  render() {
    const {
      title,
      showStatus,
      successMessage,
      errorMessage,
      resetMessage,
      isLoading,
      showTrigger,
      mode
    } = this.props;

    const trigger = (
      <Button className="add-asset" size="medium">
        ADD CENTRE
      </Button>
    );

    return (
      <ModalComponent
        modalTitle={title}
        trigger={showTrigger ? trigger : null}
        toggleModal={this.handleModalToggle}
        modalOpen={this.state.modalOpen}
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
            <label htmlFor="centre" className="label-style">
              Centre Name
              <InputFluid
                name="centre"
                value={this.state.centre}
                onChange={this.handleInputChange}
                placeHolder="Enter Centre Name"
                data-test="centers-name-input"
              />
            </label>
            <br />

            <label htmlFor="asset-make" className="label-style">
              Country
              <DropdownComponent
                customClass="form-dropdown add-asset-dropdown"
                label="Country"
                placeholder="Select Country"
                name="country"
                value={this.state.country}
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
                handleClick={this.handleModalToggle}
              />

              <ArtButton
                customCss="save"
                buttonName="Save"
                color="primary"
                handleClick={mode === 'add' ? this.handleSubmit : this.handleUpdate}
                buttonState={isLoading}
              />
            </div>
          </Form>
        </React.Fragment>
      </ModalComponent>
    );
  }
}

Temp.propTypes = {
  showTrigger: PropTypes.bool, //
  title: PropTypes.string, //
  mode: PropTypes.string, // either 'edit' or 'add'
  showStatus: PropTypes.bool,
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  resetMessage: PropTypes.func,
  countries: PropTypes.array,
  isLoading: PropTypes.bool,
  createOfficeLocation: PropTypes.func,
  updateAndelaCentre: PropTypes.func
};

Temp.defaultProps = {
  showTrigger: false,
  mode: 'add',
  title: 'Modal'
};
