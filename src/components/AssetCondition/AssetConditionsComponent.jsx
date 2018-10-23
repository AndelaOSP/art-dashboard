import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Table, Header, Pagination, Segment, Divider } from 'semantic-ui-react';

import TableRow from '../TableRowComponent.jsx';
import rowOptions from '../../_utils/pageRowOptions';
import DropdownComponent from '../../components/common/DropdownComponent';
import NavBarComponent from '../../_components/NavBarContainer';
import LoaderComponent from '../../components/LoaderComponent';
import '../../_css/AssetsComponent.css';
import { loadAssetConditions } from '../../_actions/assetCondition.actions';
import formatDate from '../../_utils/dateFormatter';
import ItemsNotFoundComponent from '../common/ItemsNotFoundComponent';

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
    this.props.loadAssetConditions(activePage, this.state.limit);
  };

  handleRowChange = (e, data) => {
    this.setState({ limit: data.value });
    this.props.loadAssetConditions(this.state.activePage, data.value);
  };

  getTotalPages = () => Math.ceil(this.props.assetConditionsCount / this.state.limit);

  render() {
    if (this.props.isLoading) {
      return (
        <NavBarComponent>
          <LoaderComponent />
        </NavBarComponent>
      );
    }
    if (!this.props.isLoading && _.isEmpty(this.props.assetConditionsList)) {
      return (
        <NavBarComponent>
          <ItemsNotFoundComponent
            header="No Asset condition found!"
            message="Please try again later to see if we'll have asset conditions to show you."
          />
        </NavBarComponent>
      );
    }
    return (
      <NavBarComponent>
        <div className="assets-list">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="Asset Conditions" />
            <Divider id="assets-divider" />
          </div>
          <Table basic selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Asset</Table.HeaderCell>
                <Table.HeaderCell>Condition</Table.HeaderCell>
                <Table.HeaderCell>Date Created</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.props.assetConditionsList.map((assetCondition) => {
                  assetCondition.formatted_date = formatDate(assetCondition.created_at);
                  return (
                    <TableRow
                      key={assetCondition.id}
                      data={assetCondition}
                      headings={['asset', 'asset_condition', 'formatted_date']}
                    />
                  );
                })
              }
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                {!_.isEmpty(this.props.assetConditionsList) && (
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
                          onChange={this.handleRowChange}
                          value={this.state.limit}
                          upward
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
