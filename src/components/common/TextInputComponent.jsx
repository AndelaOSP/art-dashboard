import React from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const TextInputComponent = props => (
  <Input
    fluid
    size="large"
    style={{ width: '65%' }}
    icon="pencil"
    placeholder={props.placeHolder}
    name={props.name}
    onChange={props.onChange}
  />
);

TextInputComponent.propTypes = {
  placeHolder: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

TextInputComponent.defaultProps = {
  placeHolder: '',
  onChange: () => {}
};

export default TextInputComponent;
