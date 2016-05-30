import moment from 'moment';
import 'moment/min/locales';
import IntlPolyfill from 'intl';

export default {
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

  setLocale(locale) {
    this._locale = locale;
  },

  setTranslations(translations) {
    this.loadTranslations(translations);
  },

  loadTranslations(translations) {
    this._translations = translations;
  },

  setTranslationsGetter(fn) {
    if (typeof fn !== 'function') {
      throw new Error('Translations getter must be a function');
    }
    this._getTranslations = fn;
  },

  setLocaleGetter(fn) {
    if (typeof fn !== 'function') {
      throw new Error('Locale getter must be a function');
    }
    this._getLocale = fn;
  },

  t(key, replacements = {}) {
    return this._translate(key, replacements);
  },

  l(value, options) {
    return this._localize(value, options);
  },

  _translate(key, replacements = {}) {
    let translation = '';
    try {
      translation = this._fetchTranslation(this._translations, `${this._locale}.${key}`);
    } catch (err) {
      console.error(`I18n: Translation ${this._locale}.${key} not found`);
      return key;
    }
    Object.keys(replacements).forEach(replacement => {
      translation = translation.split(`%{${replacement}}`).join(replacements[replacement]);
    });
    return translation;
  },

  _localize(value, options) {
    if ('dateFormat' in options) {
      moment.locale(this._locale);
      return moment(value).format(this.t(options.dateFormat));
    }
    if (typeof value === 'number') {
      if (global.Intl) {
        if (!(Intl.NumberFormat &&
          Intl.NumberFormat.supportedLocalesOf(this._locale).length === 1)) {
          Intl.NumberFormat = IntlPolyfill.NumberFormat;
        }
      } else {
        global.Intl = IntlPolyfill;
      }
      return new Intl.NumberFormat(this._locale, options).format(value);
    }
    console.error(`I18n: Localization of ${value} failed`);
    return value;
  },

  _fetchTranslation(translations, key) {
    const _index = key.indexOf('.');
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
  },
};
