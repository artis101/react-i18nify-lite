import React from 'react';
import I18n from './I18n';

export default function Localize({ value, options, dateFormat }) {
  return (
    <span>
      {I18n._localize(value, dateFormat ? { dateFormat } : options)}
    </span>
  );
}

Localize.propTypes = {
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.object]).isRequired,
  options: React.PropTypes.object,
  dateFormat: React.PropTypes.string,
};
