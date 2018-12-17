import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Header } from 'semantic-ui-react';

const PageHeader = ({ children, header }) => (
  <div className="users-list">
    <div id="page-heading-section">
      <Header as="h1" id="page-headings" floated="left" content={header} />
      <Divider id="assets-divider" />
      {children}
    </div>
  </div>
);

PageHeader.propTypes = {
  children: PropTypes.node,
  header: PropTypes.string
};

export default PageHeader;
