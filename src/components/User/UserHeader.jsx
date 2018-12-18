import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import UserFilter from '../../_components/User/UserFilterContainer';

import PageHeader from '../common/PageHeader';

import '../../_css/UsersComponent.css';
import { titleCase } from '../../_utils/helpers';

const UserHeader = ({ name, limit }) => {
  const isUsersPage = name === 'users';

  return (
    <PageHeader header={titleCase(name)}>
      {isUsersPage && (
        <UserFilter
          limit={limit}
          data-test="user-filter"
        />
      )}

      {!isUsersPage && (
        <Button className="filter-button">
          <Link to="/security-users/create">
            ADD SECURITY USER
          </Link>
        </Button>
      )}
    </PageHeader>
  );
};

UserHeader.propTypes = {
  limit: PropTypes.number,
  name: PropTypes.string
};

export default UserHeader;
