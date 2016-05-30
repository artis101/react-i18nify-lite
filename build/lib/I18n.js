'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('moment/min/locales');

var _intl = require('intl');

var _intl2 = _interopRequireDefault(_intl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  _localeKey: 'en',
  _translationsObject: {},
  _getTranslations: null,
  _getLocale: null,

  get _translations() {
    return this._getTranslations ? this._getTranslations() : this._translationsObject;
  },

  set _translations(translations) {
    this._translationsObject = translations;
  },

  get _locale() {
    return this._getLocale ? this._getLocale() : this._localeKey;
  },

  set _locale(locale) {
    this._localeKey = locale;
  },

  setLocale: function setLocale(locale) {
    this._locale = locale;
  },
  setTranslations: function setTranslations(translations) {
    this.loadTranslations(translations);
  },
  loadTranslations: function loadTranslations(translations) {
    this._translations = translations;
  },
  setTranslationsGetter: function setTranslationsGetter(fn) {
    if (typeof fn !== 'function') {
      throw new Error('Translations getter must be a function');
    }
    this._getTranslations = fn;
  },
  setLocaleGetter: function setLocaleGetter(fn) {
    if (typeof fn !== 'function') {
      throw new Error('Locale getter must be a function');
    }
    this._getLocale = fn;
  },
  t: function t(key) {
    var replacements = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    return this._translate(key, replacements);
  },
  l: function l(value, options) {
    return this._localize(value, options);
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
  _localize: function _localize(value, options) {
    if ('dateFormat' in options) {
      _moment2.default.locale(this._locale);
      return (0, _moment2.default)(value).format(this.t(options.dateFormat));
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