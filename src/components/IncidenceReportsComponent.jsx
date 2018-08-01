import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Table, Header, Pagination, Segment, Dropdown, Divider } from 'semantic-ui-react';

import TableRowComponent from './TableRowComponent.jsx';
import NavbarComponent from './NavBarComponent';

import { loadIncidenceReports } from '../_actions/incidenceReports.actions';
import '../_css/IncidenceReportsComponent.css';


const rowOptions = [
  {
    text: '10 Rows',
    value: 10
  },
  {
    text: '20 Rows',
    value: 20
  },
  {
    text: '30 Rows',
    value: 30
  }
];

const definedPageLimits = () => (
  <span className="defined-row-limt">
    <Dropdown
      id="dropdown-limit"
      placeholder="Show Rows"
      fluid
      selection
      options={rowOptions}
    />
  </span>
);

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

  handlePageTotal = () => Math.ceil(this.props.incidenceReportsCount / this.state.limit)

  emptyReportsCheck = () => (_.isEmpty(this.props.reports))

  render() {
    return (
      <NavbarComponent>
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
                (this.emptyReportsCheck())
                  ? <Table.Row><Table.Cell colSpan="8">No Data Found</Table.Cell></Table.Row>
                  : (this.props.reports.map(incidenceReport => (
                    <TableRowComponent
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
                <Table.HeaderCell colSpan="8">
                  {
                    !this.emptyReportsCheck() && (
                    <Segment.Group horizontal id="art-pagination-section">
                      <Segment>
                        <Pagination
                          totalPages={this.handlePageTotal()}
                          onPageChange={this.handlePaginationChange}
                          activePage={this.state.activePage}
                        />
                      </Segment>
                      <Segment>
                        {definedPageLimits()}
                      </Segment>
                    </Segment.Group>
                    )
                  }
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </div>
      </NavbarComponent>
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
