import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Container, Table, Header, Pagination } from 'semantic-ui-react';

import TableRowComponent from './TableRowComponent.jsx';
import NavbarComponent from './NavBarComponent';

import { loadIncidenceReports } from '../_actions/incidenceReports.actions';

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
        <Container>
          <Header className="landing-heading" content="Incidence Reports" />
          <Table celled>
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
                      <Pagination
                        totalPages={this.handlePageTotal()}
                        onPageChange={this.handlePaginationChange}
                        activePage={this.state.activePage}
                      />
                    )
                  }
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Container>
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
