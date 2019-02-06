import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Form, Menu } from 'semantic-ui-react';
import { isEmpty, isNull } from 'lodash';
import uuidv4 from 'uuid/v4';
import CheckboxComponent from '../CheckboxComponent';
import '../../../_css/FilterComponent.css';

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

    console.log('option>>>>>>>>>>>>', this.props.option);
    console.log('ischecked>>>>>>>>>>>', checked);

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
            <Form className="filter-form">
              {
                option.content.map((opt) => {
                  const label = isNull(opt.option) ? 'unspecified' : opt.option;
                  const selectedOptions = this.props.selected[option.title] || [];

                  return (
                    <CheckboxComponent
                      key={uuidv4()}
                      label={label}
                      name={option.title}
                      isChecked={selectedOptions.includes((label).toString())}
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
  index: PropTypes.number,
  option: PropTypes.object,
  filterSelection: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired
};

FilterComponent.defaultProps = {
  index: 0,
  option: {}
};

export default FilterComponent;
