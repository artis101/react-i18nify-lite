/* eslint no-underscore-dangle: "off" */
/* eslint react/no-danger: "off" */

import React from 'react';
import I18n from './I18n';
import BaseComponent from './Base';

export default class Translate extends BaseComponent {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    html: React.PropTypes.bool,
  };

  otherProps = () => {
    const result = { ...this.props };
    delete result.value;
    return result;
  }

  render = () => {
    const translation = I18n._translate(this.props.value, this.otherProps());
    if (this.props.html) {
      return <span dangerouslySetInnerHTML={{ __html: translation }} />;
    }
    return <span>{translation}</span>;
  }
}
