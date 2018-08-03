import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Container, Header } from 'semantic-ui-react/dist/commonjs';


const AssetNoteComponent = ({ assetNotes }) => {
  if (isEmpty(assetNotes) || assetNotes === " ") { //eslint-disable-line
    return (
      <p className="notes-unavialable">
        No Notes for this Asset
      </p>
    );
  }
  return (
    <Container>
      <Header as="h3" content="Asset Notes" />
      <div className="asset-notes">
        {assetNotes}
      </div>
    </Container>
  );
};

AssetNoteComponent.propTypes = {
  assetNotes: PropTypes.string
};

export default AssetNoteComponent;
