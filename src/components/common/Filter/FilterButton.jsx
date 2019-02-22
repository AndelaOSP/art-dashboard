import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Button, Icon, Menu, Popup } from 'semantic-ui-react';

import ArtButton from '../ButtonComponent';

class FilterButton extends React.Component {
  state = {
    toggleOn: false
  };

  handleOpen = () => {
    this.setState({ toggleOn: true });
    document.body.classList.add('popup-open');
  };

  handleClose = () => {
    this.setState({ toggleOn: false });
    document.body.classList.add('popup-closed');
  };

  handleFilter = () => {
    this.handleClose();
    const { selected } = this.props;
    if (this.props.selected['Verification Status']) {
      if (this.props.selected['Verification Status'][0] === 'Verified') {
        this.props.selected['Verification Status'][0] = true;
      }
      if (this.props.selected['Verification Status'][1] === 'Verified') {
        this.props.selected['Verification Status'][0] = true;
      }
      if (this.props.selected['Verification Status'][0] === 'UnVerified') {
        this.props.selected['Verification Status'][0] = false;
      }
      if (this.props.selected['Verification Status'][1] === 'UnVerified') {
        this.props.selected['Verification Status'][1] = false;
      }
      if (this.props.selected['Verification Status'][0] === 'Verified' || this.props.selected['Verification Status'][1] === 'Verified') {
        if (this.props.selected['Verification Status'][0] === 'UnVerified' || this.props.selected['Verification Status'][1] === 'UnVerified') {
          this.props.selected['Verification Status'] = null;
        }
      }
    }

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
          <Button
            className={this.state.toggleOn ? 'filter-button clicked' : 'filter-button'}
            disabled={this.props.disabled}
          >
            {this.state.toggleOn ? <Icon name="close" /> : <Icon name="bars" />}
            FILTERS
          </Button>
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
  selected: PropTypes.object,
  disabled: PropTypes.bool
};

FilterButton.defaultProps = {
  filterAction: () => { },
  activePage: 1,
  limit: 10,
  selected: {},
  disabled: false
};

export default FilterButton;
