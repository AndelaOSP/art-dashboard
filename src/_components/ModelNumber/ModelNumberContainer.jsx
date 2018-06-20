import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import ModelNumberComponent from '../../components/ModelNumber/ModelNumberComponent';
import { ToastMessage } from '../../_utils/ToastMessage';

import { loadAssetMakes } from '../../_actions/assetMakes.actions';
import { createModelNumbers } from '../../_actions/modelNumbers.actions';
import { resetToastMessageContent } from '../../_actions/resetToastMessage.actions';

class ModelNumberContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modelNumber: '',
      assetMake: '',
      saveButtonState: false,
      toastMessageContent: {
        type: '',
        message: ''
      }
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.toastMessageContent.type !== prevState.toastMessageContent.type) {
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
        toastMessageContent: {
          type: '',
          message: ''
        },
        saveButtonState: false
      };
    }
    return null;
  }

  componentDidMount() {
    if (_.isEmpty(this.props.assetMakes)) {
      this.props.loadAssetMakes();
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
      asset_make: this.state.assetMake,
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
  loadAssetMakes: PropTypes.func.isRequired,
  createModelNumbers: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  resetToastMessageContent: PropTypes.func.isRequired,
  assetMakes: PropTypes.array
};

ModelNumberContainer.defaultProps = {
  assetMakes: []
};

const mapStateToProps = ({ assetMakesList, toastMessage }) => ({
  assetMakes: assetMakesList,
  toastMessageContent: toastMessage
});
export default connect(mapStateToProps, {
  loadAssetMakes,
  createModelNumbers,
  resetToastMessageContent
})(ModelNumberContainer);
