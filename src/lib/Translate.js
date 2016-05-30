import React from 'react';
import I18n from './I18n';

export default class Translate extends React.Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
  };

  otherProps = () => {
    const result = { ...this.props };
    delete result.value;
    return result;
  }

  render = () => (
    <span>
      {I18n._translate(this.props.value, this.otherProps())}
    </span>
  );
}
