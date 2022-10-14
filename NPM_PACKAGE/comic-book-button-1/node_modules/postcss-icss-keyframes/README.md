# postcss-icss-keyframes [![Build Status][travis-img]][travis]

[PostCSS]: https://github.com/postcss/postcss
[travis-img]: https://travis-ci.org/css-modules/postcss-icss-keyframes.svg
[travis]: https://travis-ci.org/css-modules/postcss-icss-keyframes

PostCSS plugin for css-modules to local-scope keyframes.

```css
@keyframes foo {
  from { width: 10px; }
  to { width: 100px; }
}

/* transforms to */

:export {
  foo: __scope__foo
}
@keyframes __scope__foo {
  from { width: 10px; }
  to { width: 100px; }
}
```

## Usage

```js
postcss([ require('postcss-icss-keyframes')(options) ])
```

See [PostCSS] docs for examples for your environment.

### Options

#### generateScopeName(keyframesName, filepath, css)

Converts every new animation name in `@keyframes` defintion to global alias.
By default returns `__filename__keyframesName`.

### Importing animation name from another file

Via [postcss-modules-values](https://github.com/css-modules/postcss-modules-values)

```
/* imported.css */
@keyframes foo {}

/* importer.css */
@value foo from './imported.css';
.bar {
  animation-name: foo;
}
```

### Using globally defined keyframes

Animation names are not replaced if css module does not contain `@keyframes` or `@value` defintions with the same name.

```
.foo {
  animation-name: fade-in;
}
```

### Messages

postcss-icss-keyframes passes result.messages for each defined keyframes

```
{
  plugin: 'postcss-icss-keyframes',
  type: 'icss-scoped',
  name: string, // local name
  value: string // scoped name
}
```

# License

MIT © [Bogdan Chadkin](mailto:trysound@yandex.ru)
