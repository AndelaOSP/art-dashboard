import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import rowOptions from '../_utils/pageRowOptions';

const DropdownComponent = () => (
  <span className="defined-row-limt">
    <Dropdown
      id="dropdown-limit"
      placeholder="Show Rows"
      fluid
      selection
      options={rowOptions}
    />
  </span>
);

export default DropdownComponent;
