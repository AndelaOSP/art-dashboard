import React from 'react';
import PropTypes from 'prop-types';
import ActionComponent from '../components/ActionComponent';
import ArtModal from './common/ModalComponent';
import formatDate from '../_utils/dateFormatter';
import '../_css/AssetTypesComponent.css';


const AssetTypesAction = props => (
  <ActionComponent
    viewWrapper={element => (
      <ArtModal
        className="inline"
        trigger={element}
        modalTitle={props.details.asset_type}
      >
        {
          Object.keys(props.details).map(
            (key) => {
              if (key === 'created_at' || key === 'last_modified') {
              return <div className="bottom-20" key={key}>{key}: {formatDate(props.details[key])}</div>;
            }
              return <div className="bottom-20" key={key}>{key}: {props.details[key]}</div>;
            }
          )
        }
      </ArtModal>
    )}
  />
);

AssetTypesAction.propTypes = {
  details: PropTypes.object
};

AssetTypesAction.defaultProps = {
  details: {}
};

export default AssetTypesAction;
