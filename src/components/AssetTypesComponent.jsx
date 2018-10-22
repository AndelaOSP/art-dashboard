import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Table, Pagination, Segment, Divider, Button } from 'semantic-ui-react';
import _ from 'lodash';

import TableRow from './TableRowComponent';
import rowOptions from '../_utils/pageRowOptions';
import NavbarComponent from './NavBarComponent';
import DropdownComponent from '../components/common/DropdownComponent';
import LoaderComponent from '../components/LoaderComponent';
import AssetTypesContainer from '../_components/AssetTypes/AddAssetTypesContainer';
import ModalComponent from './common/ModalComponent';

import '../_css/AssetsComponent.css';
import { loadAssetTypes } from '../_actions/assetTypes.actions';
import ItemsNotFoundComponent from './common/ItemsNotFoundComponent';
import { addPaginationHistory, resetPaginationHistory } from '../_actions/paginationHistory.actions';

export class AssetTypesComponent extends React.Component {
  state = {
    activePage: 1,
    limit: 10,
    currentPage: []
  };

  componentDidMount() {
    this.props.resetPaginationHistory();
    this.props.loadAssetTypes(this.state.activePage, this.state.limit).then(() => {
      if (!this.state.currentPage.length) {
        this.setState({ currentPage: this.props.assetTypes });
        this.handlePaginationHistory(this.state.activePage);
      }
    });
  }

  handleRowChange = (e, data) => {
    this.setState({ limit: data.value });
    this.props.loadAssetTypes(this.state.activePage, data.value);
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    if (this.props.paginationHistory.hasOwnProperty([`page-${activePage}`])) {
      const currentPage = this.props.paginationHistory[`page-${activePage}`];
      this.setState({ currentPage });
    } else {
      this.props.loadAssetTypes(this.state.activePage, this.state.limit).then(() => {
        this.setState({ currentPage: this.props.assetTypes });
        this.handlePaginationHistory(activePage);
      });
    }
  };

  handlePaginationHistory = (activePage) => {
    const paginationHistoryPayload = {
      activePage,
      pageHistory: this.props.assetTypes
    };
    this.props.addPaginationHistory(paginationHistoryPayload);
  }

  getTotalPages = () => Math.ceil(this.props.assetTypesCount / this.state.limit);

  render() {
    if (this.props.isLoading) {
      return (
        <NavbarComponent>
          <LoaderComponent />
        </NavbarComponent>
      );
    }
    if (!this.props.isLoading && _.isEmpty(this.props.assetTypes)) {
      return (
        <NavbarComponent>
          <ItemsNotFoundComponent
            header="No Asset types found!"
            message="Please try again later to see if there will be asset types to show you"
          />
        </NavbarComponent>
      );
    }
    return (
      <NavbarComponent>
        <div className="assets-list">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="Asset Types" />
            <Divider id="assets-divider" />
            <div className="header-modal-button">
              <ModalComponent
                trigger={
                  <Button
                    className="add-asset"
                    size="small"
                  >
                    ADD ASSET TYPE
                  </Button>
                }
                modalTitle="Add Asset Type"
              >
                <AssetTypesContainer />
              </ModalComponent>
            </div>
          </div>
          <Table basic selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Sub-category</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.state.currentPage.map(assetType => (
                  <TableRow
                    key={assetType.id}
                    data={assetType}
                    headings={['asset_sub_category', 'asset_type']}
                  />
                ))
              }
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                {!_.isEmpty(this.state.currentPage) && (
                  <Table.HeaderCell colSpan="3" id="pagination-header">
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

const mapStateToProps = ({ assetTypesList, paginationHistory }) => {
  const { assetTypes, assetTypesCount, isLoading } = assetTypesList;
  return {
    assetTypes,
    assetTypesCount,
    isLoading,
    paginationHistory
  };
};

AssetTypesComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loadAssetTypes: PropTypes.func.isRequired,
  assetTypes: PropTypes.array.isRequired,
  assetTypesCount: PropTypes.number.isRequired,
  paginationHistory: PropTypes.object.isRequired,
  addPaginationHistory: PropTypes.func.isRequired,
  resetPaginationHistory: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, {
  loadAssetTypes,
  addPaginationHistory,
  resetPaginationHistory
})(AssetTypesComponent));
