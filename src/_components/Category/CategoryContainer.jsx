import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CategoryComponent from '../../components/Category/AddCategoryComponent';
import { createCategory } from '../../_actions/category.actions';
import { ToastMessage } from '../../_utils/ToastMessage';
import resetToastMessageContent from '../../_actions/toastMessage.actions';

class CategoryContainer extends React.Component {
  state = {
    categoryName: '',
    saveButtonState: false
  };

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
        categoryName: '',
        saveButtonState: false
      };
    }
    return null;
  }
  onChangeButtonState = () => {
    this.setState({ saveButtonState: !this.state.saveButtonState });
  };

  handleSubmit = (event) => {
    const newCategory = {
      category_name: this.state.categoryName
    };
    this.props.createCategory(newCategory);
    event.target.reset();
  }

  onAddCategory = (event) => {
    this.setState({ categoryName: event.target.value });
  }

  render() {
    return (
      <CategoryComponent
        {...this.props}
        onaddCategoryName={this.onAddCategory}
        categoryName={this.state.categoryName}
        handleSubmit={this.handleSubmit}
        onChangeButtonState={this.onChangeButtonState}
        buttonState={this.state.saveButtonState}
        toggleModal={this.props.toggleModal}
      />
    );
  }
}
CategoryContainer.propTypes = {
  createCategory: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  resetToastMessageContent: PropTypes.func.isRequired
};
const mapStateToProps = ({ categories, toastMessage }) => ({
  categories,
  toastMessageContent: toastMessage
});
export default connect(mapStateToProps, {
  createCategory,
  resetToastMessageContent
})(CategoryContainer);
