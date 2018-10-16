import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Header,
  Table,
  Pagination,
  Segment,
  Divider,
  Button
} from 'semantic-ui-react';
import _ from 'lodash';

import TableRow from '../TableRowComponent';
import NavbarComponent from '../NavBarComponent';
import DropdownComponent from '../../_components/DropdownComponent';
import LoaderComponent from '../../components/LoaderComponent';
import { loadAssetMakes } from '../../_actions/assetMakes.actions';
import rowOptions from '../../_utils/pageRowOptions';
import ModalComponent from '../common/ModalComponent';
import AssetMakeContainer from '../../_components/AssetMake/AssetMakeContainer';
import ItemsNotFoundComponent from '../common/ItemsNotFoundComponent';
import { addPaginationHistory, resetPaginationHistory } from '../../_actions/paginationHistory.actions';

export class AssetMakeComponent extends React.Component {
  state = {
    activePage: 1,
    limit: 10,
    currentPage: []
  };

  componentDidMount() {
    this.props.resetPaginationHistory();
    this.props.loadAssetMakes(this.state.activePage).then(() => {
      if (!this.state.currentPage.length) {
        this.setState({ currentPage: this.props.assetMakes });
      }
    });
  }

  handleRowChange = (e, data) => {
    this.setState({ limit: data.value });
    this.props.loadAssetConditions(this.state.activePage, data.value);
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    if (this.props.paginationHistory.hasOwnProperty([`page-${activePage}`])) {
      const currentPage = this.props.paginationHistory[`page-${activePage}`];
      this.setState({ currentPage });
    } else {
      this.props.addPaginationHistory(this.props.assetMakes);
      this.props.loadAssetMakes(activePage).then(() => {
        this.setState({ currentPage: this.props.assetMakes });
      });
    }
  };

  getTotalPages = () => Math.ceil(this.props.assetMakesCount / this.state.limit);

  render() {
    if (this.props.isLoading) {
      return (
        <NavbarComponent>
          <LoaderComponent />
        </NavbarComponent>
      );
    }
    if (!this.props.isLoading && _.isEmpty(this.props.assetMakes)) {
      return (
        <NavbarComponent>
          <ItemsNotFoundComponent
            header="No Asset make found!"
            message="Please try again later to see if there will be asset makes to show you"
          />
        </NavbarComponent>
      );
    }
    return (
      <NavbarComponent>
        <div className="incidence-list">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="Asset Makes" />
            <Divider id="assets-divider" />
            <div className="header-modal-button">
              <ModalComponent
                trigger={
                  <Button
                    className="add-asset"
                    size="medium"
                  >
                    ADD ASSET MAKE
                  </Button>
                }
                modalTitle="Add Asset Make"
              >
                <AssetMakeContainer />
              </ModalComponent>
            </div>
          </div>
          <Table basic>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Make</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.state.currentPage.map(asset => (
                  <TableRow
                    key={asset.id}
                    data={asset}
                    headings={['id', 'asset_type', 'make_label']}
                  />
                ))
              }
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                {!_.isEmpty(this.state.currentPage) && (
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

const mapStateToProps = ({ assetMakesList, paginationHistory }) => {
  const { assetMakes, assetMakesCount, isLoading } = assetMakesList;
  return {
    assetMakes,
    assetMakesCount,
    isLoading,
    paginationHistory
  };
};

AssetMakeComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loadAssetMakes: PropTypes.func.isRequired,
  loadAssetConditions: PropTypes.func,
  assetMakes: PropTypes.array.isRequired,
  assetMakesCount: PropTypes.number.isRequired,
  paginationHistory: PropTypes.object.isRequired,
  addPaginationHistory: PropTypes.func.isRequired,
  resetPaginationHistory: PropTypes.func.isRequired
};

AssetMakeComponent.defaultProps = {
  loadAssetConditions: () => {}
};

export default withRouter(connect(mapStateToProps, {
  loadAssetMakes,
  addPaginationHistory,
  resetPaginationHistory
})(AssetMakeComponent));
