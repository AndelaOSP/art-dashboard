import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

import TableHeader from '../common/Table/TableHeaderComponent';
import TableContent from '../common/Table/TableContent';

const UsersContent = ({ users, hasUsers }) => {
  if (!hasUsers) {
    return null;
  }

  return (
    <Table basic selectable className="users-list">
      <TableHeader
        titles={[
          'Name',
          'Email Address',
          'Cohort',
          'Assets Assigned'
        ]}
      />
      <TableContent
        data={users}
        headings={[
          'full_name',
          'email',
          'cohort',
          'assets_assigned'
        ]}
        urlEntity="users"
      />
    </Table>
  );
};

UsersContent.propTypes = {
  hasUsers: PropTypes.bool,
  users: PropTypes.array
};

export default UsersContent;
