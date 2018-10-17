import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createAssetSpec } from '../../_actions/assetSpecs.actions';
import AddAssetSpecComponent from '../../components/AssetSpecs/AddAssetSpecComponent';

class AddAssetSpecContainer extends React.Component {
  state = {
    assetSpec: {
      year_of_manufacture: '',
      processor_speed: '',
      screen_size: '',
      processor_type: '',
      storage: '',
      memory: ''
    }
  };

  handleInputChange = (event, data = {}) => {
    const name = event.target.name || data.name;
    const value = event.target.value || data.value;

    this.setState({
      assetSpec: {
        ...this.state.assetSpec,
        [name]: value
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { assetSpec } = this.state;

    this.props.createAssetSpec(assetSpec);
  };

  render() {
    const { isLoading, toggleModal } = this.props;

    return (
      <AddAssetSpecComponent
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
        toggleModal={toggleModal}
        isLoading={isLoading}
        assetSpec={this.state.assetSpec}
      />
    );
  }
}

AddAssetSpecContainer.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  createAssetSpec: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

AddAssetSpecContainer.defaultProps = {
  isLoading: false
};

const mapStateToProps = ({ assetSpecs }) => ({
  isLoading: assetSpecs.isLoading
});

export default connect(mapStateToProps, {
  createAssetSpec
})(AddAssetSpecContainer);
