import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';

export default (props) => (
  <Dropdown
    style={{width: '65%'}}
    fluid
    search
    selection
    label={props.label}
    options={props.options}
    placeholder={props.placeHolder}
    name={props.name}
    onChange={props.onChange}
  />
);
