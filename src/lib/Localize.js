import React from 'react';
import I18n from './I18n';

export default class Localize extends React.Component {
  static propTypes = {
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.object]).isRequired,
    options: React.PropTypes.object,
    dateFormat: React.PropTypes.string,
  };

  render = () => React.createElement(
    'span',
    {},
    I18n._localize(
      this.props.value,
      this.props.dateFormat ? { dateFormat: this.props.dateFormat } : this.props.options
    )
  );
}
