import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import uuidv4 from 'uuid/v4';

import CardContent from './CardContent';

import '../../../_css/Card.css';

export class Card extends React.Component {
  handleView = (viewDetailsRoute, data) => {
    const { history } = this.props;

    if (!viewDetailsRoute) {
      return null;
    }

    return history.push(viewDetailsRoute, data);
  };

  render() {
    const { customCss, data, headings, urlEntity = '' } = this.props;

    return (
      <React.Fragment>
        {
          data.map((info) => {
            const viewUrl = urlEntity ? `${urlEntity}/${info.id}/view` : '';

            return (
              <div
                key={uuidv4()}
                className={`card2 ${customCss}`}
                onClick={this.handleView(viewUrl, info)}
                onKeyUp={() => {}}
                role="button"
                tabIndex={0}
              >
                <div className="bottom-right">
                  <CardContent
                    key={info.id}
                    headings={headings}
                    data={info}
                    data-test="card-content"
                  />
                </div>

                <div className="overlay2" />
              </div>
            );
          })
        }
      </React.Fragment>
    );
  }
}

Card.propTypes = {
  headings: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  history: PropTypes.object,
  customCss: PropTypes.string,
  urlEntity: PropTypes.string
};

Card.defaultProps = {
  customCss: ''
};

export default withRouter(Card);
