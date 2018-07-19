import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Button, Container, Pagination, Table, Header } from 'semantic-ui-react';

import TableRowComponent from './TableRowComponent';
import NavbarComponent from './NavBarComponent';
import LoaderComponent from './LoaderComponent';
import ActionComponent from './ActionComponent';

import { loadAssetCategories } from '../_actions/assetCategories.actions';

export class AssetCategoriesComponent extends React.Component {
  state = {
    activePage: 1,
    limit: 10
  }

  componentDidMount() {
    this.props.loadAssetCategories(this.state.activePage);
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.loadAssetCategories(activePage);
  }

  handlePageTotal = () => Math.ceil(this.props.assetCategoriesCount / this.state.limit)

  emptyCategoriesCheck = () => (_.isEmpty(this.props.categories))

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
              An Error Occurred While Trying To Display The Asset Categories
            </h1>
            <Button onClick={() => { this.props.loadAssetCategories(this.state.activePage); }}>
              Try Again
            </Button>
          </Container>
        </NavbarComponent>
      );
    }
    if (!this.props.isLoading && this.emptyCategoriesCheck()) {
      return (
        <NavbarComponent>
          <Container>
            <h1>
              No Asset Categories Found.
            </h1>
          </Container>
        </NavbarComponent>
      );
    }
    return (
      <NavbarComponent>
        <Container>
          <Header className="landing-heading" content="Asset Categories" />
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.props.categories.map(category => (
                  <TableRowComponent
                    key={category.id}
                    data={category}
                    headings={['id', 'category_name']}
                  >
                    <Table.Cell>
                      <ActionComponent />
                    </Table.Cell>
                  </TableRowComponent>
                ))
              }
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="3">
                  {
                    !this.emptyCategoriesCheck() && (
                      <Pagination
                        totalPages={this.handlePageTotal()}
                        onPageChange={this.handlePaginationChange}
                        activePage={this.state.activePage}
                      />
                    )
                  }
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Container>
      </NavbarComponent>
    );
  }
}

AssetCategoriesComponent.propTypes = {
  categories: PropTypes.array.isRequired,
  assetCategoriesCount: PropTypes.number.isRequired,
  loadAssetCategories: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired
};

const mapStateToProps = ({ assetCategories }) => {
  const { categories, assetCategoriesCount, isLoading, hasError } = assetCategories;
  return {
    categories,
    assetCategoriesCount,
    isLoading,
    hasError
  };
};

export default connect(mapStateToProps, { loadAssetCategories })(AssetCategoriesComponent);
