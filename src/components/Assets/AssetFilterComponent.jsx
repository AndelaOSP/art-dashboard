import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Form, Menu } from 'semantic-ui-react';
import { isEmpty } from 'lodash';
import CheckboxComponent from '../common/CheckboxComponent';

import ArtButton from '../common/ButtonComponent';

import '../../_css/FilterComponent.css';

class AssetFilterComponent extends React.Component {
  state = {
    activeIndex: 0,
    checkedFilters: {
      modelNumbers: new Set(),
      assetTypes: new Set()
    }
  };

  handleTitleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  toggleCheckbox = (label, name) => {
    const { modelNumbers, assetTypes } = this.state.checkedFilters;

    if (name === 'Model Numbers') {
      this.updateFilterSet(modelNumbers, label);
    }

    if (name === 'Asset Types') {
      this.updateFilterSet(assetTypes, label);
    }
  };

  updateFilterSet = (filter, label) => {
    if (filter.has(label)) {
      filter.delete(label);
    } else {
      filter.add(label);
    }
  };

  handleFilter = () => {
    this.props.getAssetsAction(
      this.props.activePage,
      this.props.limit,
      this.props.modelNumbers,
      this.props.assetTypes
    );
  };

  render() {
    const { toggleOn, options } = this.props;
    const { activeIndex } = this.state;

    return (
      toggleOn ?
        <div>
          <Accordion as={Menu} vertical className="filter-menu">
            {
              !isEmpty ?
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
                              name={option.title}
                              handleCheckboxChange={this.toggleCheckbox}
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
        </div> :
        null
    );
  }
}

AssetFilterComponent.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleOn: PropTypes.bool.isRequired,
  activePage: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  modelNumbers: PropTypes.array.isRequired,
  assetTypes: PropTypes.array.isRequired,
  getAssetsAction: PropTypes.func.isRequired
};

export default AssetFilterComponent;
