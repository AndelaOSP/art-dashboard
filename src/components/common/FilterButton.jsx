import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Popup } from 'semantic-ui-react';

class FilterButton extends React.Component {
  state = {
    toggleOn: false
  };

  toggleFilter = () => {
    this.setState(({ toggleOn }) => ({ toggleOn: !toggleOn }));
  };

  render() {
    return (
      <Popup
        wide
        className="filter-popup"
        trigger={
          <div
            className={this.state.toggleOn ? 'filter-button clicked' : 'filter-button'}
            onClick={this.toggleFilter}
            role="presentation"
          >
            {this.state.toggleOn ? <Icon name="close" /> : <Icon name="bars" />}
            FILTERS
          </div>
        }
        on="click"
        open={this.state.toggleOn}
        position="bottom right"
      >

        {this.props.render(this.state.toggleOn)}
      </Popup>
    );
  }
}

FilterButton.propTypes = {
  render: PropTypes.func
};

FilterButton.defaultProps = {
  render: () => {
  }
};

export default FilterButton;
