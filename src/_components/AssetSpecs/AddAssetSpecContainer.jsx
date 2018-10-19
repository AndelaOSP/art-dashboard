import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Divider, Grid, Header } from 'semantic-ui-react';
import { createAssetSpec } from '../../_actions/assetSpecs.actions';
import NavbarComponent from '../../components/NavBarComponent';
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

    this.setState(prevState => ({
      assetSpec: {
        ...prevState.assetSpec,
        [name]: value
      }
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { assetSpec } = this.state;

    this.props.createAssetSpec(assetSpec)
      .then(() => this.props.history.push('/asset-specs'));
  };

  render() {
    const { isLoading } = this.props;

    return (
      <NavbarComponent>
        <div className="add-asset">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="Add Asset Spec Group" />
            <Divider id="assets-divider" />
          </div>

          <Grid centered columns={2}>
            <Grid.Column>
              <AddAssetSpecComponent
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                isLoading={isLoading}
                assetSpec={this.state.assetSpec}
              />
            </Grid.Column>
          </Grid>
        </div>
      </NavbarComponent>
    );
  }
}

AddAssetSpecContainer.propTypes = {
  createAssetSpec: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  history: PropTypes.object
};

AddAssetSpecContainer.defaultProps = {
  isLoading: false,
  history: {}
};

const mapStateToProps = ({ assetSpecs }) => ({
  isLoading: assetSpecs.isLoading
});

export default connect(mapStateToProps, {
  createAssetSpec
})(AddAssetSpecContainer);
