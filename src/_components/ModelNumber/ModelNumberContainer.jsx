import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import ModelNumberComponent from '../../components/ModelNumber/ModelNumberComponent';
import { ToastMessage } from '../../_utils/ToastMessage';

import { loadAssetMakesDropdown } from '../../_actions/assetMakes.actions';
import { createModelNumbers } from '../../_actions/modelNumbers.actions';
import resetToastMessageContent from '../../_actions/toastMessage.actions';

class ModelNumberContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modelNumber: '',
      assetMake: '',
      saveButtonState: false
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.toastMessageContent.type) {
      if (nextProps.toastMessageContent.type === 'success') {
        ToastMessage.success({
          message: nextProps.toastMessageContent.message
        });
      } else if (nextProps.toastMessageContent.type === 'error') {
        ToastMessage.error({
          message: nextProps.toastMessageContent.message
        });
      }
      nextProps.resetToastMessageContent();
      nextProps.toggleModal();
      return {
        modelNumber: '',
        assetMake: '',
        saveButtonState: false
      };
    }
    return null;
  }

  componentDidMount() {
    if (_.isEmpty(this.props.assetMakes)) {
      this.props.loadAssetMakesDropdown();
    }
  }

  onAddModelNumber = (event) => {
    this.setState({ modelNumber: event.target.value });
  };

  onSelectAssetMake = (event, data) => {
    this.setState({ assetMake: data.value });
  };

  onChangeButtonState = () => {
    this.setState({ saveButtonState: !this.state.saveButtonState });
  };

  handleSubmit = (event) => {
    const newModel = {
      make_label: this.state.assetMake,
      model_number: this.state.modelNumber
    };
    this.props.createModelNumbers(newModel);
    event.target.reset();
  };

  render() {
    return (
      <ModelNumberComponent
        {...this.props}
        onAddModelNumber={this.onAddModelNumber}
        onSelectAssetMake={this.onSelectAssetMake}
        handleSubmit={this.handleSubmit}
        onChangeButtonState={this.onChangeButtonState}
        buttonState={this.state.saveButtonState}
        toggleModal={this.props.toggleModal}
      />
    );
  }
}
ModelNumberContainer.propTypes = {
  loadAssetMakesDropdown: PropTypes.func.isRequired,
  createModelNumbers: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  resetToastMessageContent: PropTypes.func.isRequired,
  assetMakes: PropTypes.array
};

ModelNumberContainer.defaultProps = {
  assetMakes: []
};

const mapStateToProps = ({ assetMakesList, toastMessage }) => ({
  assetMakes: assetMakesList.assetMakes,
  toastMessageContent: toastMessage
});
export default connect(mapStateToProps, {
  loadAssetMakesDropdown,
  createModelNumbers,
  resetToastMessageContent
})(ModelNumberContainer);
