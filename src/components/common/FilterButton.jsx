import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Icon, Menu, Popup } from 'semantic-ui-react';

class FilterButton extends React.Component {
  state = {
    toggleOn: false
  };

  handleOpen = () => {
    this.setState({ toggleOn: true });
  };

  handleClose = () => {
    this.setState({ toggleOn: false });
  };

  render() {
    return (
      <Popup
        wide
        className="filter-popup"
        trigger={
          <div
            className={this.state.toggleOn ? 'filter-button clicked' : 'filter-button'}
            role="presentation"
          >
            {this.state.toggleOn ? <Icon name="close" /> : <Icon name="bars" />}
            FILTERS
          </div>
        }
        on="click"
        open={this.state.toggleOn}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        position="bottom right"
      >
        <Accordion as={Menu} vertical className="filter-menu">
          {React.cloneElement(this.props.children, { handleClose: this.handleClose })}
        </Accordion>
      </Popup>
    );
  }
}

FilterButton.propTypes = {
  children: PropTypes.node.isRequired
};

export default FilterButton;
