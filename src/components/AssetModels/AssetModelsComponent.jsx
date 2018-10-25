import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Table, Pagination, Segment, Divider, Button } from 'semantic-ui-react';
import _ from 'lodash';
import TableRow from '../TableRowComponent';
import NavBarComponent from '../../_components/NavBarContainer';
import rowOptions from '../../_utils/pageRowOptions';
import DropdownComponent from '../../components/common/DropdownComponent';
import LoaderComponent from '../../components/LoaderComponent';
import formatDate from '../../_utils/dateFormatter';
import ModalComponent from '../common/ModalComponent';
import ModelNumberContainer from '../../_components/ModelNumber/ModelNumberContainer';

import { loadAssetModels } from '../../_actions/assetModels.action';
import '../../_css/AssetsComponent.css';
import ItemsNotFoundComponent from '../common/ItemsNotFoundComponent';

export class AssetModelsComponent extends React.Component {
  state = {
    activePage: 1,
    limit: 10
  };

  componentDidMount() {
    this.props.loadAssetModels(this.state.activePage, this.state.limit);
  }

  handleRowChange = (e, data) => {
    this.setState({ limit: data.value });
    this.props.loadAssetModels(this.state.activePage, data.value);
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.loadAssetModels(activePage, this.state.limit);
  };

  getTotalPages = () => Math.ceil(this.props.assetModelsCount / this.state.limit);

  render() {
    if (this.props.isLoading) {
      return (
        <NavBarComponent>
          <LoaderComponent />
        </NavBarComponent>
      );
    }
    if (!this.props.isLoading && _.isEmpty(this.props.assetModels)) {
      return (
        <NavBarComponent>
          <ItemsNotFoundComponent
            header="No Asset model found!"
            message="Please try again later to see if there will be asset models to show you"
          />
        </NavBarComponent>
      );
    }
    return (
      <NavBarComponent>
        <div className="assets-list">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="Asset Models" />
            <Divider id="assets-divider" />
            <div className="header-modal-button">
              <ModalComponent
                trigger={
                  <Button
                    className="add-asset"
                    size="medium"
                  >
                    ADD MODEL NUMBER
                  </Button>
                }
                modalTitle="Add Model Number"
              >
                <ModelNumberContainer />
              </ModalComponent>
            </div>
          </div>
          <Table basic selectable>
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
                    <TableRow
                      key={assetModel.id}
                      data={assetModel}
                      headings={['model_number', 'make_label', 'formatted_create', 'formatted_modified']}
                    />
                  );
                })
              }
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                {!_.isEmpty(this.props.assetModels) && (
                  <Table.HeaderCell colSpan="5" id="pagination-header">
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
      </NavBarComponent>
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
