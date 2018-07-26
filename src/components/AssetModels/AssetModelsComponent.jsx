import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Header, Table, Button, Pagination } from 'semantic-ui-react';
import _ from 'lodash';

import TableRowComponent from '../TableRowComponent';
import NavbarComponent from '../NavBarComponent';
import LoaderComponent from '../../components/LoaderComponent';
import ActionComponent from '../../components/ActionComponent';
import formatDate from '../../_utils/dateFormatter';

import { loadAssetModels } from '../../_actions/assetModels.action';

export class AssetModelsComponent extends React.Component {
  state = {
    activePage: 1,
    limit: 10
  };

  componentDidMount() {
    this.props.loadAssetModels(this.state.activePage, this.state.limit);
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.loadAssetModels(activePage, this.state.limit);
  };

  getTotalPages = () => Math.ceil(this.props.assetModelsCount / this.state.limit);

  render() {
    if (this.props.isLoading) {
      return (
        <NavbarComponent>
          <LoaderComponent size="large" dimmerStyle={{ height: '90vh' }} />
        </NavbarComponent>
      );
    }
    if (!this.props.isLoading && _.isEmpty(this.props.assetModels)) {
      return (
        <NavbarComponent>
          <Container>
            <h1>
              No Asset Models Found
            </h1>
          </Container>
        </NavbarComponent>
      );
    }
    return (
      <NavbarComponent>
        <Container>
          <Header className="landing-heading" content="Asset Models" />
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Model Number</Table.HeaderCell>
                <Table.HeaderCell>Make</Table.HeaderCell>
                <Table.HeaderCell>Created</Table.HeaderCell>
                <Table.HeaderCell>Modified</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.props.assetModels.map((assetModel) => {
                  assetModel.formatted_create = formatDate(assetModel.created_at);
                  assetModel.formatted_modified = formatDate(assetModel.last_modified);

                  return (
                    <TableRowComponent
                      key={assetModel.id}
                      data={assetModel}
                      headings={['model_number', 'make_label', 'formatted_create', 'formatted_modified']}
                    >
                      <Table.Cell>
                        <ActionComponent />
                      </Table.Cell>
                    </TableRowComponent>
                  );
                })
              }
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="4">
                  {!_.isEmpty(this.props.assetModels) &&
                    <Pagination
                      totalPages={this.getTotalPages()}
                      onPageChange={this.handlePaginationChange}
                      activePage={this.state.activePage}
                    />
                  }
                  <Button circular icon="add" floated="right" data-tooltip="Add new asset model" size="big" />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Container>
      </NavbarComponent>
    );
  }
}

const mapStateToProps = ({ assetModelsList }) => {
  const { assetModels, assetModelsCount, isLoading } = assetModelsList;

  return {
    assetModels,
    assetModelsCount,
    isLoading
  };
};

AssetModelsComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loadAssetModels: PropTypes.func.isRequired,
  assetModels: PropTypes.array.isRequired,
  assetModelsCount: PropTypes.number.isRequired
};

export default withRouter(connect(mapStateToProps, {
  loadAssetModels
})(AssetModelsComponent));
