import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Form, Menu } from 'semantic-ui-react';
import { isEmpty, isNull } from 'lodash';
import uuidv4 from 'uuid/v4';
import CheckboxComponent from '../CheckboxComponent';
import '../../../_css/FilterComponent.css';

class FilterComponent extends React.Component {
  handleTitleClick = (e, titleProps) => {
    const { activeIndex, loadAccordionValue } = this.props;
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    loadAccordionValue(newIndex);
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
    const { activeIndex, option, selected, index } = this.props;
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
            <Form className="filter-form">
              {option.content.map((opt) => {
                const label = isNull(opt.option) ? 'unspecified' : opt.option;
                const selectedOptions = selected[option.title] || [];

                const check = () => {
                  if (selectedOptions[0] === true) {
                    selectedOptions[0] = 'Verified';
                  }
                  if (selectedOptions[0] === false) {
                    selectedOptions[0] = 'UnVerified';
                  }
                  return selectedOptions.includes(label.toString());
                };

                return (
                  <CheckboxComponent
                    key={uuidv4()}
                    label={label}
                    name={option.title}
                    isChecked={check()}
                    handleCheckboxChange={this.handleCheckboxChange}
                  />
                );
              })}
            </Form>
          </Accordion.Content>
        </Menu.Item>
      </React.Fragment>
    );
  }
}

FilterComponent.propTypes = {
  index: PropTypes.number,
  activeIndex: PropTypes.number,
  option: PropTypes.object,
  filterSelection: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
  loadAccordionValue: PropTypes.func
};

FilterComponent.defaultProps = {
  index: 0,
  option: {}
};

export default FilterComponent;
