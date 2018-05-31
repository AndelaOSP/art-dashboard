import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';

class CustomDropdown extends React.Component {
  render() {
    return (
      <Dropdown
        style={{width: '65%'}}
        fluid
        search
        selection
        label={this.props.label}
        options={this.props.options}
        placeholder={this.props.placeHolder}
        name={this.props.name}
        onChange={this.props.onChange}
      />
    );
  }
}
export default CustomDropdown;
