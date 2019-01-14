import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createOfficeLocation } from '../../_actions/officeLocations.actions';

import CentreModalComponent from '../../components/CentreModal/CentreModal';

class CentreModal extends Component {
  state = {
    name: '',
    country: ''
  };

  onAddCentre = (event) => {
    this.setState({ name: event.target.value });
  };

  onAddCountry = (event) => {
    this.setState({ country: event.target.value });
  };

  handleSubmit = () => {
    const newCentre = {
      centre_name: this.state.name,
      centre_country: this.state.country
    };
    this.props.createOfficeLocation(newCentre);
  };
  render() {
    return (
      <CentreModalComponent
        {...this.props}
        onAddCentre={this.onAddCentre}
        onAddCountry={this.onAddCountry}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

CentreModal.propTypes = {
  createOfficeLocation: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    createOfficeLocation
  }
)(CentreModal);
