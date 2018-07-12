import React from 'react';
import { Table } from 'semantic-ui-react';

const UserDetailsComponent = () => (
  <div>
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <div className="assets-header">
              Name
            </div>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <div className="assets-header">
              Email Address
            </div>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <div className="assets-header">
              Cohort
            </div>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <div className="assets-header">
              Assets Assigned
            </div>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body />

      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="8" />
        </Table.Row>
      </Table.Footer>
    </Table>
  </div>
);

export default UserDetailsComponent;
