import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Header, Table, Button, Pagination } from 'semantic-ui-react';

import TableRowComponent from './TableRowComponent';
import SideMenuComponent from '../_components/SideMenuComponent';

import { loadAssetTypeAction } from '../_actions/assetType.action';

export class AssetTypesComponent extends React.Component {
  state = {
    activePage: 1,
    limit: 10,
    offset: 0,
    currentAssetTypes: []
  }
  componentDidMount() {
    this.props.loadAssetTypeAction();
  }

  componentDidUpdate(prevProps) {
    if (this.props.assetTypes.length !== prevProps.assetTypes.length) {
      this.setCurrentAssetTypes();
    }
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({
      activePage,
      offset: (activePage - 1) * this.state.limit
    }, () => this.setCurrentAssetTypes());
  }

  setCurrentAssetTypes = () => {
    const currentAssetTypes = this.props.assetTypes.slice(this.state.offset,
      (this.state.activePage * this.state.limit));
    this.setState({
      currentAssetTypes
    });
  };

  handlePageTotal = () => Math.ceil(this.props.assetTypes.length / this.state.limit)

  emptyAssetTypeCheck = () => (this.props.assetTypes.length === 0)

  loadRoles = () => {
    let assetTypes = null;
    if (this.emptyAssetTypeCheck()) {
      assetTypes = <Table.Row><Table.Cell colSpan="2">No Data found</Table.Cell></Table.Row>;
    } else {
      assetTypes = this.state.currentAssetTypes.map(assetType => (
        <TableRowComponent
          key={assetType.id}
          data={assetType}
          headings={['id', 'asset_type', 'asset_sub_category']}
          action
        />
      ));
    }
    return assetTypes;
  }

  render() {
    return (
      <SideMenuComponent>
        <Container>
          <Header className="landing-heading" content="Asset Types" />
          <Button className="ui button" data-tooltip="Add new asset types">
            <i className="plus icon" /> New
          </Button>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Sub-category</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.loadRoles()
              }
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="4">
                  {
                    (this.emptyAssetTypeCheck()) ? '' :
                    <Pagination
                      totalPages={this.handlePageTotal()}
                      onPageChange={this.handlePaginationChange}
                      activePage={this.state.activePage}
                    />
                  }
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Container>
      </SideMenuComponent>
    );
  }
}

AssetTypesComponent.propTypes = {
  loadAssetTypeAction: PropTypes.func.isRequired,
  assetTypes: PropTypes.array,
};
AssetTypesComponent.defaultProps = {
  assetTypes: []
};


const mapStateToProps = ({ assetTypesList }) => {
  const { assetTypes, assetTypesCount } = assetTypesList;
  return {
    assetTypes,
    assetTypesCount,
  };
};

export default withRouter(connect(mapStateToProps, {
  loadAssetTypeAction,
})(AssetTypesComponent));
