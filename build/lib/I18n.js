'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _momentWithLocalesMin = require('moment/min/moment-with-locales.min.js');

var _momentWithLocalesMin2 = _interopRequireDefault(_momentWithLocalesMin);

var _intl = require('intl');

var _intl2 = _interopRequireDefault(_intl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  _locale: 'en',
  _translations: {},

  setLocale: function setLocale(locale) {
    this._locale = locale;
  },
  setTranslations: function setTranslations(translations) {
    this._translations = translations;
  },
  t: function t(key) {
    var replacements = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    return this._translate(key, replacements);
  },
  _translate: function _translate(key) {
    var replacements = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var translation = '';
    try {
      translation = this._fetchTranslation(this._translations, this._locale + '.' + key);
    } catch (err) {
      console.error('I18n: Translation ' + this._locale + '.' + key + ' not found');
      return key;
    }
    Object.keys(replacements).forEach(function (replacement) {
      translation = translation.split('%{' + replacement + '}').join(replacements[replacement]);
    });
    return translation;
  },
  l: function l(value, options) {
    return this._localize(value, options);
  },
  _localize: function _localize(value, options) {
    if ('dateFormat' in options) {
      _momentWithLocalesMin2.default.locale(this._locale);
      return (0, _momentWithLocalesMin2.default)(value).format(this.t(options.dateFormat));
    }
    if (typeof value === 'number') {
      if (global.Intl) {
        if (!(Intl.NumberFormat && Intl.NumberFormat.supportedLocalesOf(this._locale).length === 1)) {
          Intl.NumberFormat = _intl2.default.NumberFormat;
        }
      } else {
        global.Intl = _intl2.default;
      }
      return new Intl.NumberFormat(this._locale, options).format(value);
    }
    console.error('I18n: Localization of ' + value + ' failed');
    return value;
  },
  _fetchTranslation: function _fetchTranslation(translations, key) {
    var _index = key.indexOf('.');
    if (typeof translations === 'undefined') {
      throw new Error('not found');
    }
    if (_index > -1) {
      return this._fetchTranslation(translations[key.substring(0, _index)], key.substr(_index + 1));
    }
    if (translations[key]) {
      return translations[key];
    }
    throw new Error('not found');
  }
};