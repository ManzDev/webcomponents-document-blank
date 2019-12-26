# webcomponents-document-blank

Sample experimental document-blank boilerplate for webcomponents with RollUp & atomico React hooks.

_Note_: This repository is **experimental**.

![WebComponents](src/assets/webcomponents.png)
![RollUp](src/assets/rollup.png)

### Features

- WebComponents / ESModules support
- Transform node_modules import for unpkg CDN. [babel-plugin-replace-imports](https://github.com/041616/babel-plugin-replace-imports)
- Uses PostCSS + postcss-preset-env for transform CSS

### Steps

1. Create component on `src/components` folder. Uses React hooks ( [atomico](https://atomico.gitbook.io/doc/) ).
2. Add component load import on `src/wcloader.js` file.

### To Do

- WebComponents are global at the moment. Here, a [local scope proposal](https://github.com/w3c/webcomponents/issues/716).
- Add [import-maps](https://github.com/WICG/import-maps) support (when better browser compatibility)
- Automatic creation of `wcloader.js`.
