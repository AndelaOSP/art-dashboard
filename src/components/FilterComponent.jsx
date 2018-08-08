import * as React from 'react';
import { Image } from 'semantic-ui-react';
import '../_css/FilterComponent.css';

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
  'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const FilterComponent = () => (
  <div id="filter-container">
    <Image id="funnel" src="images/funnel.png" />
    <div id="filter-text">Filter by</div>
    <div id="letters">
      {alphabet.map(letter => (<div className="letter">{letter}</div>))}
    </div>
  </div>
);
export default FilterComponent;
