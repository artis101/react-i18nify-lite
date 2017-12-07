# react-i18nify-lite

Simple i18n translation components and helpers for React applications.

This fork was created to avoid pulling in `moment` library for applications
that deal with date formatting and localization separately.

If you're using Redux or Fluxible, feel free to use [react-redux-i18n](https://github.com/artisavotins/react-redux-i18n-lite) or [react-fluxible-i18n](https://github.com/zoover/react-fluxible-i18n) instead.

## Table of contents

* [Installation](#installation)
* [Getting started](#getting-started)
* [Components](#components)
* [Helpers](#helpers)
* [API reference](#api-reference)

## Installation

Install by using yarn:

```
$ yarn add react-i18nify-lite
```

Install by using npm:

```
$ npm i --save react-i18nify-lite
```

## Getting started

Start by loading setting translations and locale to be used:

```javascript
import { I18n } from 'react-i18nify-lite';

I18n.setTranslations({
  en: {
    application: {
      title: 'Awesome app with i18n!',
      hello: 'Hello, %{name}!'
    },
    date: {
      long: 'MMMM Do, YYYY'
    },
    export: 'Export %{count} items',
    export_0: 'Nothing to export',
    export_1: 'Export %{count} item',
    two_lines: 'Line 1<br />Line 2'
  },
  nl: {
    application: {
      title: 'Toffe app met i18n!',
      hello: 'Hallo, %{name}!'
    },
    date: {
      long: 'D MMMM YYYY'
    },
    export: 'Exporteer %{count} dingen',
    export_0: 'Niks te exporteren',
    export_1: 'Exporteer %{count} ding',
    two_lines: 'Regel 1<br />Regel 2'
  }
});

I18n.setLocale('nl');
```

And that is it!

## Components

The easiest way to translate copies in your React components is by using the `Translate` component:

```javascript
import React from 'react';
import { Translate } from 'react-i18nify-lite';


const AwesomeComponent = () => (
  <div>
    <Translate value="application.title"/>
    // => returns '<span>Toffe app met i18n!</span>' for locale 'nl'
    <Translate value="application.title" style={{ fontWeight: 'bold', fontSize: '14px' }} />
    // => returns '<span style="font-weight:bold;font-size:14px;">Toffe app met i18n!</span>' for locale 'nl'
    <Translate value="application.hello" name="Aad"/>
    // => returns '<span>Hallo, Aad!</span>' for locale 'nl'
  </div>
);
```

## Helpers

If for some reason, you cannot use a regular React component, you can use the `I18n.t` helper instead.
These helpers are functions and therefore will not be re-rendered. You have to handle state updates
yourself in places where `I18n.t` is used.

```javascript
import { I18n } from 'react-i18nify-lite';

I18n.t('application.title'); // => returns 'Toffe app met i18n!' for locale 'nl'
I18n.t('application.hello', {name: 'Aad'}); // => returns 'Hallo, Aad!' for locale 'nl'
I18n.t('export', {count: 0}); // => returns 'Niks te exporteren' for locale 'nl'
I18n.t('application.unknown_translation'); // => returns 'Unknown Translation' as translation is missing
I18n.t('application', {name: 'Aad'}); // => returns {hello: "Hallo, Aad!", title: "Toffe app met i18n!"} for locale 'nl'
```

## API Reference

### `I18n`

Main module for handling all configurations and translations, with the following functions:

#### `setLocale(locale, rerenderComponents = true)`

The used locale can be set with this function. By default, changing the locale will re-render all components.
This behavior can be prevented by providing `false` as a second argument.

#### `setTranslations(translations, rerenderComponents = true)`

The used translations can be set with this function. By default, changing the translations will re-render all components.
This behavior can be prevented by providing `false` as a second argument.

#### `setLocaleGetter(fn)`

Alternatively to using `setLocale`, you can provide a callback to return the locale with `setLocaleGetter`:

```javascript
import { I18n } from 'react-i18nify-lite';

const locale = () => 'nl';

I18n.setLocaleGetter(locale);
```

#### `setTranslationsGetter(fn)`

Alternatively to using `setTranslations`, you can provide a callback to return the translations with `setTranslationsGetter`:

```javascript
import { I18n } from 'react-i18nify-lite';

const translation = () => ({
  en: { ... },
  nl: { ... }
});

I18n.setTranslationsGetter(translation);
```

#### `setHandleMissingTranslation(fn)`

By default, when a translation is missing, the translation key will be returned in a slightly formatted way,
as can be seen in the `I18n.t('application.unknown_translation');` example above.
You can however overwrite this behavior by setting a function to handle missing translations.

```javascript
import { I18n } from 'react-i18nify-lite';

const myHandleMissingTranslation = (key, replacements) => `Missing translation: ${key}`;

I18n.setHandleMissingTranslation(myHandleMissingTranslation);

I18n.t('application.unknown_translation'); // => returns 'Missing translation: application.unknown_translation'
```

#### `t(key, replacements = {})`

Helper function to translate a `key`, given an optional set of `replacements`. See the above Helpers section for examples.

#### `forceComponentsUpdate()`

This function can be called to force a re-render of all I18n components.

### `<Translate>`

React translate component, with the following props:

#### `value` (string)

The translation key to translate.

#### `dangerousHTML` (bool)

If `true`, HTML is allowed in the translation.

#### `className` (string)

Optional CSS classname.

#### `style` (object)

Optional inline styling

#### Other props

All other provided props will be used as replacements for the translation string.

[version-image]: https://img.shields.io/npm/v/react-i18nify-lite.svg
[downloads-image]: https://img.shields.io/npm/dm/react-i18nify-lite.svg

[npm-url]: https://npmjs.org/package/react-i18nify-lite
