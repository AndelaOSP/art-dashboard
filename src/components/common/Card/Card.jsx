import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import _ from 'lodash';
import { Icon } from 'semantic-ui-react';

import CardContent from './CardContent';

import '../../../_css/Card.css';

export class Card extends React.Component {
  handleCardView = (viewDetailsRoute, data, event) => {
    if (this.hasClickedOnCardDiv(event) && !_.isEmpty(viewDetailsRoute)) {
      const { history } = this.props;
      return history.push(viewDetailsRoute, data);
    }
    return null;
  };
  hasClickedOnCardDiv = event => event.target.nodeName === 'DIV';

  hasClickedOnCardEditIcon = event => event.target.nodeName === 'I';

  handleEditIconClick = (data, event) => {
    if (this.hasClickedOnCardEditIcon(event)) this.props.onClick(data);
  };

  render() {
    const { customCss, data, headings, urlEntity = '', imageName, showAction } = this.props;
    const backgroundImage = {
      background: `url("/images/${imageName}") no-repeat center`
    };

    return (
      <div className="card-container">
        {
          data.map((info) => {
            const viewUrl = urlEntity ? `${urlEntity}/${info.id}/view` : '';

            return (
              <div
                key={uuidv4()}
                className={`card ${customCss}`}
                onClick={(event) => {
                  event.persist();
                  this.handleCardView(viewUrl, info, event);
                }}
                onKeyUp={() => {}}
                role="button"
                tabIndex={0}
              >
                {showAction &&
                  <Icon
                    className="overlay-icon"
                    data={this.props.data}
                    name="edit"
                    onClick={(event) => {
                      event.persist();
                      this.handleEditIconClick(info, event);
                    }}
                  />}

                <div className="bottom-right">
                  <CardContent
                    key={uuidv4()}
                    headings={headings}
                    data={info}
                  />
                </div>

                <div className="image-overlay" style={backgroundImage} />
                <div className="overlay" />
              </div>
            );
          })
        }
      </div>
    );
  }
}

Card.propTypes = {
  headings: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  history: PropTypes.object,
  customCss: PropTypes.string,
  urlEntity: PropTypes.string,
  imageName: PropTypes.string,
  showAction: PropTypes.bool,
  onClick: PropTypes.func
};

Card.defaultProps = {
  customCss: '',
  imageName: 'map.svg'
};

export default withRouter(Card);
