import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Table, Header, Pagination, Segment, Divider } from 'semantic-ui-react';

import TableRowComponent from '../TableRowComponent.jsx';
import DropdownComponent from '../../_components/DropdownComponent';
import NavbarComponent from '../NavBarComponent';
import LoaderComponent from '../../components/LoaderComponent';
import AssetConditionActionComponent from './AssetConditionActionComponent';

import '../../_css/AssetsComponent.css';
import { loadAssetConditions } from '../../_actions/assetCondition.actions';
import formatDate from '../../_utils/dateFormatter';

export class AssetConditionsComponent extends React.Component {
  state = {
    activePage: 1,
    limit: 10
  };

  componentDidMount() {
    this.props.loadAssetConditions(this.state.activePage);
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.loadAssetConditions(activePage);
  };

  getTotalPages = () => Math.ceil(this.props.assetConditionsCount / this.state.limit);

  render() {
    if (this.props.isLoading) {
      return (
        <NavbarComponent>
          <LoaderComponent size="large" dimmerStyle={{ height: '90vh' }} />
        </NavbarComponent>
      );
    }
    if (!this.props.isLoading && _.isEmpty(this.props.assetConditionsList)) {
      return (
        <NavbarComponent>
          <div className="assets-list">
            <h1>
              No Asset Conditions Found
            </h1>
          </div>
        </NavbarComponent>
      );
    }
    return (
      <NavbarComponent>
        <div className="assets-list">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="Asset Conditions" />
            <Divider id="assets-divider" />
          </div>
          <Table basic>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Asset</Table.HeaderCell>
                <Table.HeaderCell>Condition</Table.HeaderCell>
                <Table.HeaderCell>Date Created</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.props.assetConditionsList.map((assetCondition) => {
                  assetCondition.formatted_date = formatDate(assetCondition.created_at);
                  return (
                    <TableRowComponent
                      key={assetCondition.id}
                      data={assetCondition}
                      headings={['asset', 'asset_condition', 'formatted_date']}
                    >
                      <Table.Cell>
                        <AssetConditionActionComponent details={assetCondition} />
                      </Table.Cell>
                    </TableRowComponent>
                  );
                })
              }
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="4" id="pagination-header">
                  {!_.isEmpty(this.props.assetConditionsList) && (
                  <Segment.Group horizontal id="art-pagination-section">
                    <Segment>
                      <Pagination
                        totalPages={this.getTotalPages()}
                        onPageChange={this.handlePaginationChange}
                        activePage={this.state.activePage}
                      />
                    </Segment>
                    <Segment>
                      <DropdownComponent />
                    </Segment>
                  </Segment.Group>
                  )}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </div>
      </NavbarComponent>
    );
  }
}

AssetConditionsComponent.propTypes = {
  assetConditionsList: PropTypes.array.isRequired,
  assetConditionsCount: PropTypes.number.isRequired,
  loadAssetConditions: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = ({ assetConditions }) => {
  const { assetConditionsList, assetConditionsCount, isLoading } = assetConditions;

  return {
    assetConditionsList,
    assetConditionsCount,
    isLoading
  };
};

export default connect(mapStateToProps, { loadAssetConditions })(AssetConditionsComponent);

