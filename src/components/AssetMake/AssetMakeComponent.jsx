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

import { loadAssetMakes } from '../../_actions/assetMakes.actions';

export class AssetMakeComponent extends React.Component {
  state = {
    activePage: 1,
    limit: 10
  }
  componentDidMount() {
    this.props.loadAssetMakes(this.state.activePage);
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.loadAssetMakes(activePage);
  }

  getTotalPages = () => Math.ceil(this.props.assetMakesCount / this.state.limit)

  render() {
    if (this.props.isLoading) {
      return (
        <NavbarComponent>
          <LoaderComponent size="large" dimmerStyle={{ height: '90vh' }} />
        </NavbarComponent>
      );
    }
    if (!this.props.isLoading && _.isEmpty(this.props.assetMakes)) {
      return (
        <NavbarComponent>
          <Container>
            <h1>
              No Asset Make Found
            </h1>
          </Container>
        </NavbarComponent>
      );
    }
    return (
      <NavbarComponent>
        <Container>
          <Header className="landing-heading" content="Asset Makes" />
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Make</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.props.assetMakes.map(asset => (
                  <TableRowComponent
                    key={asset.id}
                    data={asset}
                    headings={['id', 'asset_type', 'make_label']}
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
                  {!_.isEmpty(this.props.assetMakes) &&
                    <Pagination
                      totalPages={this.getTotalPages()}
                      onPageChange={this.handlePaginationChange}
                      activePage={this.state.activePage}
                    />
                  }
                  <Button circular icon="add" floated="right" data-tooltip="Add new asset make" size="big" />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Container>
      </NavbarComponent>
    );
  }
}

const mapStateToProps = ({ assetMakesList }) => {
  const { assetMakes, assetMakesCount, isLoading } = assetMakesList;
  return {
    assetMakes,
    assetMakesCount,
    isLoading
  };
};

AssetMakeComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loadAssetMakes: PropTypes.func.isRequired,
  assetMakes: PropTypes.array.isRequired,
  assetMakesCount: PropTypes.number.isRequired
};

export default withRouter(connect(mapStateToProps, {
  loadAssetMakes
})(AssetMakeComponent));
