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
    activeIndex: 0,
    checkedFilters: this.handleCheckedFilters()
  };

  handleTitleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  toggleCheckbox = (label, name) => {
    const { checkedFilters } = this.state;

    for (const key in checkedFilters) {
      if (name === key) {
        if (checkedFilters[name].has(label)) {
          checkedFilters[name].delete(label);
        } else {
          checkedFilters[name].add(label);
        }
      }
    }
  };

  keepCheckboxChecked = (label, name) => {
    const { checkedFilters } = this.state;
    return !isEmpty(checkedFilters[name]) && checkedFilters[name].has(label);
  }

  handleFilter = () => {
    this.props.handleClose();
    const { checkedFilters } = this.state;
    const filters = {};

    for (const key in checkedFilters) {
      if (checkedFilters.hasOwnProperty(key)) {
        filters[key] = [Array.from(checkedFilters[key])];
      }
    }

    this.props.filterAction(
      this.props.activePage,
      this.props.limit,
      filters
    );

    this.props.addCheckedFilter(checkedFilters);
  };

  handleCheckedFilters() {
    const { checkedFilters, filterSets } = this.props;

    if (Object.values(checkedFilters).length === 0) {
      return filterSets;
    }
    return checkedFilters;
  }

  render() {
    const { options } = this.props;
    const { activeIndex } = this.state;

    return (
      <React.Fragment>
        <Accordion as={Menu} vertical className="filter-menu">
          {
            !isEmpty(options)
              ? options.map((option, index) => (
                <Menu.Item key={uuidv4()}>
                  <Accordion.Title
                    active={activeIndex === index}
                    content={option.title}
                    index={index}
                    onClick={this.handleTitleClick}
                  />

                  <Accordion.Content active={activeIndex === index}>
                    <Form>
                      {
                        option.content.map(opt =>
                          (<CheckboxComponent
                            key={uuidv4()}
                            label={opt.option}
                            name={option.title}
                            handleCheckboxChange={this.toggleCheckbox}
                            keepCheckboxChecked={this.keepCheckboxChecked}
                          />)
                        )
                      }
                    </Form>
                  </Accordion.Content>
                </Menu.Item>
                  ))
            : <span>Loading filters...</span>
          }
        </Accordion>

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
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterSets: PropTypes.object.isRequired,
  activePage: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  filterAction: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  addCheckedFilter: PropTypes.func.isRequired,
  checkedFilters: PropTypes.object.isRequired
};

export default FilterComponent;
