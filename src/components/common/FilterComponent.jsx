import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Form, Menu } from 'semantic-ui-react';

import '../../_css/FilterComponent.css';

class FilterComponent extends React.Component {
  state = {
    activeIndex: 0
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { toggleOn, options } = this.props;
    const { activeIndex } = this.state;

    return (
      toggleOn ?
        <div>
          <div className="fake-border" />

          <Accordion as={Menu} vertical className="filter-menu">
            {
              options.map((option, index) => (
                <Menu.Item key={option.id}>
                  <Accordion.Title
                    active={activeIndex === index}
                    content={option.title}
                    index={index}
                    onClick={this.handleClick}
                  />

                  <Accordion.Content active={activeIndex === index}>
                    <Form>
                      {
                        option.content.map(opt =>
                          (<Form.Checkbox
                            key={opt.id}
                            label={opt.option}
                            name={option.title}
                            value={opt.option}
                          />)
                        )
                      }
                    </Form>
                  </Accordion.Content>
                </Menu.Item>
              ))
            }
          </Accordion>
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
