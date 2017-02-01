/* eslint no-underscore-dangle: "off" */
/* eslint react/no-danger: "off" */
/* eslint react/forbid-prop-types: "off" */

import React from 'react';
import I18n from './I18n';
import BaseComponent from './Base';

export default class Localize extends BaseComponent {

  static propTypes = {
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.object]).isRequired,
    options: React.PropTypes.object,
    dateFormat: React.PropTypes.string,
    dangerousHTML: React.PropTypes.bool,
    className: React.PropTypes.string,
    /**
     * Optional styling
     */
    style: React.PropTypes.objectOf(
      React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string,
      ]),
    ),
  };

  render() {
    const { value, dateFormat, options = {}, dangerousHTML, style, className } = this.props;
    const localization = I18n._localize(value, { ...options, dateFormat });

    if (dangerousHTML) {
      return (
        <span
          style={style}
          className={className}
          dangerouslySetInnerHTML={{ __html: localization }}
        />
      );
    }
    return <span style={style} className={className}>{localization}</span>;
  }
}
