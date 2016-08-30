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
    },
    export_0: 'Nothing to export',
    export_1: 'Export %{count} item',
    export_plural: 'Export %{count} items'
  },
  nl: {
    application: {
      title: 'Toffe app met i18n!',
      hello: 'Hallo, %{name}!'
    },
    date: {
      long: 'D MMMM YYYY'
    },
    export_0: 'Niks te exporteren',
    export_1: 'Exporteer %{count} ding',
    export_plural: 'Exporteer %{count} dingen'
  }
});

I18n.setLocale('nl');

console.log(I18n.t('application.title'));
console.log(I18n.t('application.hello', {name: 'Aad'}));
console.log(I18n.t('export', {count: 0}));
console.log(I18n.t('application.weird_key'));
console.log(I18n.l(1385856000000, { dateFormat: 'date.long' }));
console.log(I18n.l(Math.PI, { maximumFractionDigits: 2 }));

function AwesomeComponent() {
  return (
    <div>
      <Translate value="application.title"/>
      <Translate value="application.hello" name="Aad"/>
      <Localize value="2015-09-03" dateFormat="date.long"/>
      <Localize value={10/3} options={{style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2}}/>
      <Translate value="export" count={1} />
      <Translate value="export" count={2} />
    </div>
  );
}

ReactDOM.renderToString(<AwesomeComponent/>);
