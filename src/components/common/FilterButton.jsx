import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

class FilterButton extends React.Component {
  state = {
    toggleOn: false
  };

  toggleFilter = () => {
    this.setState(({ toggleOn }) => ({ toggleOn: !toggleOn }));
  };

  render() {
    return (
      <div>
        <div
          className={this.state.toggleOn ? 'clicked filter-button' : 'unclicked filter-button'}
          onClick={this.toggleFilter}
          role="presentation"
        >
          {this.state.toggleOn ? <Icon name="close" /> : <Icon name="bars" />}
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
