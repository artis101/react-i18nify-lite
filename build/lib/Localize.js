'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Localize;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _I18n = require('./I18n');

var _I18n2 = _interopRequireDefault(_I18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-underscore-dangle: "off" */

function Localize(_ref) {
  var value = _ref.value;
  var options = _ref.options;
  var dateFormat = _ref.dateFormat;

  return _react2.default.createElement(
    'span',
    null,
    _I18n2.default._localize(value, dateFormat ? { dateFormat: dateFormat } : options)
  );
}

Localize.propTypes = {
  value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number, _react2.default.PropTypes.object]).isRequired,
  options: _react2.default.PropTypes.object,
  dateFormat: _react2.default.PropTypes.string
};