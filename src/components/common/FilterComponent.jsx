import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Form, Menu } from 'semantic-ui-react';
import { isEmpty } from 'lodash';
import uuidv4 from 'uuid/v4';

import CheckboxComponent from './CheckboxComponent';
import ArtButton from './ButtonComponent';

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

  handleFilter = () => {
    this.props.handleClose();
    const { selected } = this.props;

    this.props.filterAction(
      this.props.activePage,
      this.props.limit,
      selected
    );
  };

  render() {
    const { option } = this.props;
    const { activeIndex } = this.state;

    if (isEmpty(option)) {
      return <span>Loading filters</span>;
    }

    return (
      <React.Fragment>
        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 0}
            content={option.title}
            onClick={this.handleTitleClick}
          />
          <Accordion.Content active={activeIndex === 0}>
            <Form>
              {
                  option.content.map((opt) => {
                    const isChecked = this.props.selected[option.title]
                      ? this.props.selected[option.title].includes(opt.option)
                      : false;

                    return (
                      <CheckboxComponent
                        key={uuidv4()}
                        label={opt.option}
                        name={option.title}
                        isChecked={isChecked}
                        handleCheckboxChange={this.handleCheckboxChange}
                      />
                      );
                    }
                  )
              }
            </Form>
          </Accordion.Content>
        </Menu.Item>

        <ArtButton
          customCss="apply-filter"
          buttonName="apply filters"
          color="primary"
          handleClick={this.handleFilter}
        />
      </React.Fragment>
    );
  }
}

FilterComponent.propTypes = {
  option: PropTypes.object.isRequired,
  activePage: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  filterAction: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
  filterSelection: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired
};

export default FilterComponent;
