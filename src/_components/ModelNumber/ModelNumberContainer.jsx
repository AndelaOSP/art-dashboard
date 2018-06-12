import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import ModelNumberComponent from '../../components/ModelNumber/ModelNumberComponent'
import { ToastMessage } from '../../_utils/ToastMessage';

import { loadAssetMakes } from '../../_actions/assetMakes.actions';
import { createModelNumbers } from '../../_actions/modelNumbers.actions';

class ModelNumberContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modelNumber:  "",
      assetMake: "",
      modelNumbers: props.modelNumbers || []
    }
  }

  componentDidMount(){
    console.log(this.props)
    if (_.isEmpty(this.props.assetMakes)) {
      this.props.loadAssetMakes();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.modelNumbers.length !== prevState.modelNumbers.length) {
      ToastMessage.success({ message: 'Model Number Saved Successfully' });
      return {
        modelNumber:  "",
        assetMake: "",
        modelNumbers: nextProps.modelNumbers
      }
    }
    return null;
  }

  handleSubmit = (event, data) => {
    let newModel = {
      "asset_make": this.state.assetMake,
      "model_number": this.state.modelNumber
    }
    this.props.createModelNumbers(newModel)
    event.target.reset();
  }

  onAddModelNumber = (event) => {
    this.setState({ modelNumber: event.target.value });
  }

  onSelectAssetMake = (event, data) => {
    this.setState({ assetMake: data.value });
  }

  render(){
    return (
        <ModelNumberComponent
          {...this.props}
          onAddModelNumber={this.onAddModelNumber}
          modelNumber={this.state.modelNumber}
          onSelectAssetMake={this.onSelectAssetMake}
          handleSubmit={this.handleSubmit}
          toggleModal={this.props.toggleModal}
        />
    );
  }
}
ModelNumberContainer.propTypes = {
  loadAssetMakes: PropTypes.func.isRequired,
  createModelNumbers: PropTypes.func.isRequired
}
const mapStateToProps = ({ assetMakesList, modelNumbersList }) => ({
  assetMakes: assetMakesList,
  modelNumbers: modelNumbersList
});
export default connect(mapStateToProps, {
    loadAssetMakes,
    createModelNumbers
})(ModelNumberContainer);
