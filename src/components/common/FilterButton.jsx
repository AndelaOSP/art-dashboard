import React from 'react';
import PropTypes from 'prop-types';

class FilterButton extends React.Component {
  state = {
    toggleOn: false
  }

  toggleFilter = () => {
    this.setState(({ toggleOn }) => ({ toggleOn: !toggleOn }));
  }

  render() {
    return (
      <div>
        <div
          className={this.state.toggleOn ? 'clicked' : 'unclicked'}
          id="filter-button"
          onClick={this.toggleFilter}
          role="presentation"
        >
          {this.state.toggleOn ?
            <div id="close-filter">
            close
            </div> :
            <div id="lines">
              <div className="burger-line" />
              <div className="burger-line" />
              <div className="burger-line" />
            </div>
        }
        FILTERS
        </div>
        {this.props.render(this.state.toggleOn)}
      </div>
    );
  }
}
FilterButton.propTypes = {
  render: PropTypes.func.isRequired
};
export default FilterButton;
