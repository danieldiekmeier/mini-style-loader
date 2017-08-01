# mini-style-loader

A replacement for Webpack's [`style-loader`](https://github.com/webpack-contrib/style-loader) that produces smaller bundles.

## Motivation

I have a special use case where I can't use something like the [Extract Text Webpack Plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin), because the CSS has to be bundled with the JavaScript.

I thought I'd use the `style-loader`, but it produces **~5.4kb** of additional Code, even after uglification. That has mainly to do with all the features it has (hot reload, sourcemaps, etc etc).

So I set out to write a `mini-style-loader`, without any features – except putting the CSS into a `<style>`-Element in your `document.head`. It produces only **~0.3kb** of additional code, because it does less.

**For development, I'd still advise you to use `style-loader`**, but if you want/need a really small production bundle, I hope the `mini-style-loader` can help you.

## Usage

You have to use it in combination with [`extract-loader`](https://github.com/peerigon/extract-loader). The `extract-loader` returns the pure CSS (without JavaScript wrappers from `css-loader`).

In your `webpack.config.js`:

```js
const webpackConfig = {
  // entry, output etc

  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'mini-style-loader',
        'extract-loader',
        'css-loader'
      ]
    }]
  }
}
```

To apply the css to your page:

```js
import './test.css'
```

`mini-style-loader` also adds the hash of your `css` file as the `id` of the `<style>` element, and the imported module returns the hash, so you can do stuff with the element, if you need to.

```js
import hash from './test.css'

// pretty pointless, but you could
document.getElementById(hash).remove()
```

## How does it work?

Feel free to read the source code: `index.js` and `lib/apply-style.js`.

`index.js` contains the Webpack loader, which returns a bit of code that requires the `lib/apply-style.js` and feeds it the CSS.

`lib/apply-style.js` contains the Code that's actually responsible for putting your css into the `document.head`. It uses `styleEl.textContent`, so it's only compatible with IE 9+.
