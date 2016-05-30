var React = require('react');
var ReactDOM = require('react-dom/server');

var I18n = require('react-i18nify').I18n;
var Translate = require('react-i18nify').Translate;
var Localize = require('react-i18nify').Localize;

I18n.loadTranslations({
  en: {
    application: {
      title: 'Awesome app with i18n!',
      hello: 'Hello, %{name}!'
    },
    date: {
      long: 'MMMM Do, YYYY'
    }
  },
  nl: {
    application: {
      title: 'Toffe app met i18n!',
      hello: 'Hallo, %{name}!'
    },
    date: {
      long: 'D MMMM YYYY'
    }
  }
});

I18n.setLocale('nl');

console.log(I18n.t('application.title'));
console.log(I18n.t('application.hello', {name: 'Aad'}));
console.log(I18n.l(1385856000000, { dateFormat: 'date.long' }));
console.log(I18n.l(Math.PI, { maximumFractionDigits: 2 }));

ReactDOM.renderToString(
  <div>
    <Translate value="application.title"/><br/>
    <Translate value="application.hello" name="Aad"/><br/>
    <Localize value="2015-09-03" dateFormat="date.long"/><br/>
    <Localize value={10/3} options={{style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2}}/><br/>
  </div>
);
