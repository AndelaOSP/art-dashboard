import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Icon, Menu, Popup } from 'semantic-ui-react';

import ArtButton from './ButtonComponent';

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

  handleFilter = () => {
    this.handleClose();
    const { selected } = this.props;

    this.props.filterAction(
      this.props.activePage,
      this.props.limit,
      selected
    );
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
          {this.props.children}
        </Accordion>

        <ArtButton
          customCss="apply-filter"
          buttonName="apply filters"
          color="primary"
          handleClick={this.handleFilter}
        />
      </Popup>
    );
  }
}

FilterButton.propTypes = {
  children: PropTypes.node,
  filterAction: PropTypes.func,
  activePage: PropTypes.number,
  limit: PropTypes.number,
  selected: PropTypes.object
};

FilterButton.defaultProps = {
  filterAction: () => {},
  activePage: 1,
  limit: 10,
  selected: {}
};

export default FilterButton;
