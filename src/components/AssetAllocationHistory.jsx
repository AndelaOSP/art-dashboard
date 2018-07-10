import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import { isEmpty } from 'lodash';
import '../_css/AssetAllocationHistory.css';

const AssetAllocationHistory = ({ allocationHistory }) => {
  if (isEmpty(allocationHistory)) {
    return (
      <p className="history-unavailable">Allocation history is not available for this asset</p>
    );
  }

  return (
    <ul>
      {allocationHistory.map(allocationRecord => (
        <li className="history-list" key={allocationRecord.created_at}>
          <Image avatar src={allocationRecord.picture} />
          <p>{allocationRecord.email}</p>
          <p>{allocationRecord.slackHandle}</p>
          <p>{allocationRecord.created_at}</p>
          <p>{allocationRecord.status}</p>
          <p>{allocationRecord.condition}</p>
        </li>
      ))
      }
    </ul>
  );
};

AssetAllocationHistory.propTypes = {
  allocationHistory: PropTypes.array
};

export default AssetAllocationHistory;
