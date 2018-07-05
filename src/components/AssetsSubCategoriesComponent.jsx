import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Header, Table, Button, Pagination } from 'semantic-ui-react';
import _ from 'lodash';

import TableRowComponent from './TableRowComponent';
import SideMenuComponent from '../_components/SideMenuComponent';
import LoaderComponent from '../components/LoaderComponent';
import ActionComponent from '../components/ActionComponent';

import { loadSubCategories } from '../_actions/subcategory.actions';

export class AssetSubCategoriesComponent extends React.Component {
  state = {
    activePage: 1,
    limit: 10
  }
  componentDidMount() {
    this.props.loadSubCategories(this.state.activePage);
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.loadSubCategories(this.state.activePage);
  }

  getTotalPages = () => Math.ceil(this.props.assetSubCategoriesCount / this.state.limit)

  render() {
    if (this.props.isLoading) {
      return (
        <SideMenuComponent>
          <LoaderComponent size="large" dimmerStyle={{ height: '90vh' }} />
        </SideMenuComponent>
      );
    }
    if (!this.props.isLoading && _.isEmpty(this.props.assetSubCategories)) {
      return (
        <SideMenuComponent>
          <Container>
            <h1>
              No Asset Sub Category Found
            </h1>
          </Container>
        </SideMenuComponent>
      );
    }
    return (
      <SideMenuComponent>
        <Container>
          <Header className="landing-heading" content="Asset Sub-Categories" />
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Sub-Category</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.props.assetSubCategories.map(assetType => (
                  <TableRowComponent
                    key={assetType.id}
                    data={assetType}
                    headings={['id', 'sub_category_name', 'asset_category']}
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
                <Table.HeaderCell colSpan="4">
                  {!_.isEmpty(this.props.assetSubCategories) &&
                    <Pagination
                      totalPages={this.getTotalPages()}
                      onPageChange={this.handlePaginationChange}
                      activePage={this.state.activePage}
                    />
                  }
                  <Button circular icon="add" floated="right" data-tooltip="Add new sub category" size="big" />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Container>
      </SideMenuComponent>
    );
  }
}

const mapStateToProps = ({ subcategoriesList }) => {
  const { assetSubCategories, assetSubCategoriesCount, isLoading } = subcategoriesList;
  return {
    assetSubCategories,
    assetSubCategoriesCount,
    isLoading
  };
};

AssetSubCategoriesComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loadSubCategories: PropTypes.func.isRequired,
  assetSubCategories: PropTypes.array.isRequired,
  assetSubCategoriesCount: PropTypes.number.isRequired
};

export default withRouter(connect(mapStateToProps, {
  loadSubCategories
})(AssetSubCategoriesComponent));
