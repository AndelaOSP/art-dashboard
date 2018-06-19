import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CategoryComponent from '../../components/Category/AddCategoryComponent';
import { createCategory } from '../../_actions/category.actions';

class CategoryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: ""
    }
  }

  handleSubmit = (event, data) => {
    let newCategory = {
      "category_name": this.state.categoryName
    }
    this.props.createCategory(newCategory)
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
        toggleModal={this.props.toggleModal}
      />
    );
  }
}
CategoryContainer.propTypes = {
  createCategory: PropTypes.func.isRequired
}
const mapStateToProps = ({ categories }) => ({
  categories
});
export default connect(mapStateToProps, {
  createCategory
})(CategoryContainer);
