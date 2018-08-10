import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import '../_css/FilterComponent.css';

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
  'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const FilterUserComponent = props => (
  <div>
    {props.toggleOn ?
      <div id="filter-container">
        <Image id="funnel" src="images/funnel.png" />
        <div id="filter-text">Filter by</div>
        <div id="letters">
          {alphabet.map(letter => (<div key={letter} className="letter">{letter}</div>))}
        </div>
      </div> : null}
  </div>
);
FilterUserComponent.propTypes = {
  toggleOn: PropTypes.bool.isRequired
};
export default FilterUserComponent;
