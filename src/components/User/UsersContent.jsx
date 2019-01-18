import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

import TableHeader from '../common/Table/TableHeaderComponent';
import TableContent from '../common/Table/TableContent';
import { USERS_HEADERS, USERS_HEADERS_TO_DATA_KEYS } from '../../_enums';

const UsersContent = ({ users, hasUsers, entity = '' }) => {
  if (!hasUsers) {
    return null;
  }

  return (
    <Table basic selectable>
      <TableHeader
        titles={USERS_HEADERS[entity]}
      />
      <TableContent
        data={users}
        headings={USERS_HEADERS_TO_DATA_KEYS[entity]}
        urlEntity={entity === 'users' ? 'users' : ''}
      />
    </Table>
  );
};

UsersContent.propTypes = {
  hasUsers: PropTypes.bool,
  users: PropTypes.array,
  entity: PropTypes.string
};

export default UsersContent;
