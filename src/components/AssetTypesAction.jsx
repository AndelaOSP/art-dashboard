import React from 'react';
import PropTypes from 'prop-types';
import ActionComponent from '../components/ActionComponent';
import ArtModal from './common/ModalComponent';
import formatDate from '../_utils/dateFormatter';
import '../_css/AssetTypesComponent.css';

class AssetTypesAction extends React.Component {
  state = { modalOpen: false }

  handleToggleModal = () => this.setState({ modalOpen: !this.state.modalOpen });

  render() {
    return (
      <ActionComponent
        viewWrapper={element => (
          <ArtModal
            className="inline"
            trigger={element}
            modalTitle={this.props.details.name}
            toggleModal={this.handleToggleModal}
            modalOpen={this.state.modalOpen}
          >
            {
              Object.keys(this.props.details).map(
                (key) => {
                  if (key === 'created_at' || key === 'last_modified') {
                  return <div className="bottom-20" key={key}>{key}: {formatDate(this.props.details[key])}</div>;
                }
                  return <div className="bottom-20" key={key}>{key}: {this.props.details[key]}</div>;
                }
              )
            }
          </ArtModal>
        )}
      />
    );
  }
}

AssetTypesAction.propTypes = {
  details: PropTypes.object
};

AssetTypesAction.defaultProps = {
  details: {}
};

export default AssetTypesAction;
