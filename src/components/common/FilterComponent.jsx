import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Form, Menu } from 'semantic-ui-react';
import CheckboxComponent from './CheckboxComponent';

import ArtButton from '../common/ButtonComponent';

import '../../_css/FilterComponent.css';

class FilterComponent extends React.Component {
  state = {
    activeIndex: 0,
    checkedFilters: new Set()
  };

  handleTitleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  toggleCheckbox = (label) => {
    const { checkedFilters } = this.state;

    if (checkedFilters.has(label)) {
      checkedFilters.delete(label);
    } else {
      checkedFilters.add(label);
    }
  };

  handleFilter = () => {
    const selectedFilers = [];

    for (const checkbox of this.state.checkedFilters) {
      selectedFilers.push(checkbox);
    }

    console.log('Selected filters: ', selectedFilers);
  };

  render() {
    const { toggleOn, options } = this.props;
    const { activeIndex } = this.state;

    return (
      toggleOn ?
        <div>
          <Accordion as={Menu} vertical className="filter-menu">
            {
              options.map((option, index) => (
                <Menu.Item key={option.id}>
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
                            key={opt.id}
                            label={opt.option}
                            handleCheckboxChange={this.toggleCheckbox}
                          />)
                        )
                      }
                    </Form>
                  </Accordion.Content>
                </Menu.Item>
              ))
            }
          </Accordion>

          <ArtButton
            customCss="apply-filter"
            buttonName="apply filters"
            color="primary"
            handleClick={this.handleFilter}
          />
        </div> :
        null
    );
  }
}

FilterComponent.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  toggleOn: PropTypes.bool.isRequired
};

export default FilterComponent;
