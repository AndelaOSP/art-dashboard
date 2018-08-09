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
          className={this.state.toggleOn ? 'clicked filter-button' : 'unclicked filter-button'}
          onClick={this.toggleFilter}
          role="presentation"
        >
          {this.state.toggleOn ?
            <div id="close-filter">
            close
            </div> :
            <div className="lines">
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
  render: PropTypes.func
};

FilterButton.defaultProps = {
  render: () => {}
};

export default FilterButton;
