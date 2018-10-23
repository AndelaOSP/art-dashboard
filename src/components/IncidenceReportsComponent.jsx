import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Table, Header, Pagination, Segment, Divider } from 'semantic-ui-react';

import TableRow from './TableRowComponent.jsx';
import NavBarComponent from '../_components/NavBarContainer';
import rowOptions from '../_utils/pageRowOptions';
import DropdownComponent from '../components/common/DropdownComponent';
import { loadIncidenceReports } from '../_actions/incidenceReports.actions';
import '../_css/IncidenceReportsComponent.css';
import ItemsNotFoundComponent from './common/ItemsNotFoundComponent';

export class IncidenceReportsComponent extends React.Component {
  state = {
    activePage: 1,
    limit: 10
  }

  componentDidMount() {
    this.props.loadIncidenceReports(this.state.activePage, this.state.limit);
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.loadIncidenceReports(activePage, this.state.limit);
  }

  handleRowChange = (e, data) => {
    this.setState({ limit: data.value });
    this.props.loadIncidenceReports(this.state.activePage, data.value);
  }

  handlePageTotal = () => Math.ceil(this.props.incidenceReportsCount / this.state.limit)

  emptyReportsCheck = () => (_.isEmpty(this.props.reports))

  render() {
    if (this.emptyReportsCheck()) {
      return (
        <NavBarComponent>
          <ItemsNotFoundComponent
            message="Please try again later to see if there will be incident reports to show you."
          />
        </NavBarComponent>
      );
    }
    return (
      <NavBarComponent>
        <div className="incidence-list">
          <div id="page-heading-section">
            <Header as="h1" id="page-headings" floated="left" content="Incidence Reports" />
            <Divider id="assets-divider" />
          </div>
          <Table basic>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Asset</Table.HeaderCell>
                <Table.HeaderCell>Incident Type</Table.HeaderCell>
                <Table.HeaderCell>Incident Location</Table.HeaderCell>
                <Table.HeaderCell>Incident Description</Table.HeaderCell>
                <Table.HeaderCell>Injuries Sustained</Table.HeaderCell>
                <Table.HeaderCell>Loss of Property</Table.HeaderCell>
                <Table.HeaderCell>Witnesses</Table.HeaderCell>
                <Table.HeaderCell>Police Abstract</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
            (this.props.reports.map(incidenceReport => (
              <TableRow
                key={incidenceReport.id}
                data={incidenceReport}
                headings={['asset',
                  'incident_type',
                  'incident_location',
                  'incident_description',
                  'injuries_sustained',
                  'loss_of_property',
                  'witnesses',
                  'police_abstract_obtained'
                ]}
              />)))
              }
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="8" id="pagination-header">
                  <Segment.Group horizontal id="art-pagination-section">
                    <Segment>
                      <Pagination
                        totalPages={this.handlePageTotal()}
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
              </Table.Row>
            </Table.Footer>
          </Table>
        </div>
      </NavBarComponent>
    );
  }
}

IncidenceReportsComponent.propTypes = {
  reports: PropTypes.array,
  incidenceReportsCount: PropTypes.number,
  loadIncidenceReports: PropTypes.func
};

const mapStateToProps = ({ incidenceReports }) => {
  const { incidenceReportsCount, reports } = incidenceReports;
  return {
    incidenceReportsCount,
    reports
  };
};

export default connect(mapStateToProps, { loadIncidenceReports })(IncidenceReportsComponent);
