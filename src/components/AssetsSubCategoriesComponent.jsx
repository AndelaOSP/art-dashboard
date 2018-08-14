import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Table, Pagination, Segment, Divider, Container, Button } from 'semantic-ui-react';
import _ from 'lodash';

import TableRowComponent from './TableRowComponent';
import NavbarComponent from './NavBarComponent';
import rowOptions from '../_utils/pageRowOptions';
import DropdownComponent from '../components/common/DropdownComponent';
import LoaderComponent from '../components/LoaderComponent';
import '../_css/AssetsComponent.css';
import { loadSubCategories } from '../_actions/subcategory.actions';

export class AssetSubCategoriesComponent extends React.Component {
  state = {
    activePage: 1,
    limit: 10
  };

  componentDidMount() {
    this.props.loadSubCategories(this.state.activePage, this.state.limit);
  }

  handleRowChange = (e, data) => {
    this.setState({ limit: data.value });
    this.props.loadSubCategories(this.state.activePage, data.value);
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.loadSubCategories(activePage, this.state.limit);
  };

  getTotalPages = () => Math.ceil(this.props.assetSubCategoriesCount / this.state.limit);

  render() {
    if (this.props.isLoading) {
      return (
        <NavbarComponent>
          <LoaderComponent size="large" dimmerStyle={{ height: '90vh' }} />
        </NavbarComponent>
      );
    }
    if (!this.props.isLoading && this.props.hasError) {
      return (
        <NavbarComponent>
          <Container>
            <h1>
              An Error Occurred While Trying To Display The Asset SubCategories.
            </h1>
            <Button onClick={() => { this.props.loadSubCategories(this.state.activePage); }}>
              Try Again.
            </Button>
          </Container>
        </NavbarComponent>
      );
    }
    return (
      <NavbarComponent>
        <div className="assets-list">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="Asset Sub-Categories" />
            <Divider id="assets-divider" />
          </div>
          <Table basic selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Sub-Category</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                (_.isEmpty(this.props.assetSubCategories))
                ? <Table.Row><Table.Cell colSpan="3">No Asset Sub Category Found</Table.Cell></Table.Row>
                : this.props.assetSubCategories.map(subCategory => (
                  <TableRowComponent
                    key={subCategory.id}
                    data={subCategory}
                    headings={['id', 'sub_category_name', 'asset_category']}
                  />
                   ))
              }
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                {!_.isEmpty(this.props.assetSubCategories) && (
                  <Table.HeaderCell colSpan="4" id="pagination-header">
                    <Segment.Group horizontal id="art-pagination-section">
                      <Segment>
                        <Pagination
                          totalPages={this.getTotalPages()}
                          onPageChange={this.handlePaginationChange}
                          activePage={this.state.activePage}
                        />
                      </Segment>
                      <Segment>
                        <DropdownComponent
                          customClass="page-limit"
                          placeHolder="Show Rows"
                          options={rowOptions}
                          upward
                          value={this.state.limit}
                          onChange={this.handleRowChange}
                        />
                      </Segment>
                    </Segment.Group>
                  </Table.HeaderCell>
                )}
              </Table.Row>
            </Table.Footer>
          </Table>
        </div>
      </NavbarComponent>
    );
  }
}

const mapStateToProps = ({ subcategoriesList }) => {
  const { assetSubCategories, assetSubCategoriesCount, isLoading, hasError } = subcategoriesList;
  return {
    assetSubCategories,
    assetSubCategoriesCount,
    isLoading,
    hasError
  };
};

AssetSubCategoriesComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loadSubCategories: PropTypes.func.isRequired,
  assetSubCategories: PropTypes.array.isRequired,
  assetSubCategoriesCount: PropTypes.number.isRequired,
  hasError: PropTypes.bool
};

export default withRouter(connect(mapStateToProps, {
  loadSubCategories
})(AssetSubCategoriesComponent));
