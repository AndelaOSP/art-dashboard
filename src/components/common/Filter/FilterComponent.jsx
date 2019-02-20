import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Form, Menu } from 'semantic-ui-react';
import { isEmpty, isNull } from 'lodash';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import { loadAccordionValue } from '../../../_actions/allFilterValues.actions';
import '../../../_css/FilterComponent.css';

const FilterComponent = (props) => {
  const {
    activeIndex,
    option,
    filterSelection,
    selected,
    index
  } = props;

  const handleTitleClick = (e, titleProps) => {
    // eslint-disable-next-line no-shadow
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    props.loadAccordionValue(newIndex);
  };

  const handleCheckboxChange = (event, { checked, label }) => {
    const selection = {
      label,
      isChecked: checked
    };

    filterSelection(selection, option.title);
  };

  const accordionContent = (
    <Form className="filter-form">
      <Form.Group grouped>
        {
          option.content.map((opt) => {
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
            <Form.Checkbox
              key={uuidv4()}
              label={label}
              name={option.title}
              checked={check()}
              onChange={handleCheckboxChange}
            />
          );
          })
        }
      </Form.Group>
    </Form>
  );

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
          onClick={handleTitleClick}
        />
        <Accordion.Content active={activeIndex === index} content={accordionContent} />
      </Menu.Item>
    </React.Fragment>
  );
};

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

const mapStateToProps = (state) => {
  const { activeIndex } = state.accordion;
  return {
    activeIndex
  };
};

export default connect(
  mapStateToProps,
  { loadAccordionValue }
)(FilterComponent);
