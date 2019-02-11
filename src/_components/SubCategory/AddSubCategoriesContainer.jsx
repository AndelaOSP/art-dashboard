import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import AddSubCategoryComponent from '../../components/SubCategory/AddSubCategoryComponent';
import { ToastMessage } from '../../_utils/ToastMessage';

import { loadCategoriesDropdown } from '../../_actions/category.actions';
import { createSubCategory } from '../../_actions/subcategory.actions';
import resetToastMessageContent from '../../_actions/toastMessage.actions';

class AddSubCategoriesContainer extends React.Component {
  state = {
    subCategory: '',
    category: 0,
    saveButtonState: false
  };

  static getDerivedStateFromProps(nextProps) {
    const { toastMessageContent } = nextProps;

    if (toastMessageContent.type) {
      if (toastMessageContent.type === 'success') {
        ToastMessage.success({
          message: toastMessageContent.message
        });
        nextProps.toggleModal();
      } else if (toastMessageContent.type === 'error') {
        ToastMessage.error({
          message: toastMessageContent.message
        });
      }

      nextProps.resetToastMessageContent();
      return {
        subCategory: '',
        category: 0,
        saveButtonState: false
      };
    }
    return null;
  }

  componentDidMount() {
    if (_.isEmpty(this.props.categoriesList)) {
      this.props.loadCategoriesDropdown();
    }
  }

  onAddSubCategory = (event) => {
    this.setState({ subCategory: event.target.value });
  };

  onSelectCategory = (event, data) => {
    this.setState({ category: data.value });
  };

  onChangeButtonState = () => {
    this.setState({ saveButtonState: !this.state.saveButtonState });
  };

  handleSubmit = (event) => {
    const newSubCategory = {
      name: this.state.subCategory,
      asset_category: this.state.category
    };

    this.props.createSubCategory(newSubCategory);
    event.target.reset();
  };

  render() {
    return (
      <AddSubCategoryComponent
        {...this.props}
        onAddSubCategory={this.onAddSubCategory}
        onSelectCategory={this.onSelectCategory}
        handleSubmit={this.handleSubmit}
        onChangeButtonState={this.onChangeButtonState}
        buttonState={this.state.saveButtonState}
        categorySelectedId={this.state.category}
        toggleModal={this.props.toggleModal}
      />
    );
  }
}

AddSubCategoriesContainer.propTypes = {
  categoriesList: PropTypes.array,
  loadCategoriesDropdown: PropTypes.func.isRequired,
  createSubCategory: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  resetToastMessageContent: PropTypes.func.isRequired
};

AddSubCategoriesContainer.defaultProps = {
  categoriesList: []
};

const mapStateToProps = ({ categoriesList, toastMessage }) => ({
  categoriesList: categoriesList.categoriesDropdown,
  toastMessageContent: toastMessage,
  isLoading: categoriesList.isLoading
});

export default connect(mapStateToProps, {
  loadCategoriesDropdown,
  createSubCategory,
  resetToastMessageContent
})(AddSubCategoriesContainer);
