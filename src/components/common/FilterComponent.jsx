import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Form, Menu } from 'semantic-ui-react';
import { isEmpty } from 'lodash';
import uuidv4 from 'uuid/v4';

import CheckboxComponent from './CheckboxComponent';

import '../../_css/FilterComponent.css';

class FilterComponent extends React.Component {
  state = {
    activeIndex: 0
  };

  handleTitleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  handleCheckboxChange = (event) => {
    const { option } = this.props;
    const { checked, value } = event.target;

    const selection = {
      label: value,
      isChecked: checked
    };

    this.props.filterSelection(selection, option.title);
  };

  render() {
    const { index, option } = this.props;
    const { activeIndex } = this.state;

    if (isEmpty(option)) {
      return <p>Loading filters</p>;
    }

    return (
      <React.Fragment>
        <Menu.Item>
          <Accordion.Title
            index={index}
            active={activeIndex === index}
            content={option.title}
            onClick={this.handleTitleClick}
          />
          <Accordion.Content active={activeIndex === index}>
            <Form>
              {
                  option.content.map((opt) => {
                    const selectedOptions = this.props.selected[option.title] || [];

                    return (
                      <CheckboxComponent
                        key={uuidv4()}
                        label={opt.option}
                        name={option.title}
                        isChecked={selectedOptions.includes(opt.option)}
                        handleCheckboxChange={this.handleCheckboxChange}
                      />
                      );
                    }
                  )
              }
            </Form>
          </Accordion.Content>
        </Menu.Item>
      </React.Fragment>
    );
  }
}

FilterComponent.propTypes = {
  index: PropTypes.number.isRequired,
  option: PropTypes.object.isRequired,
  filterSelection: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired
};

export default FilterComponent;
