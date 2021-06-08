# Documentation

## Getting started

To preview the documentation locally, you have two ways. Install the docsify dependency or simply server the `./docs`
folder with a webserver.

1. With `node` and the `docsify-cli`

   Install docsify

   ```bash
   npm i
   ```

   Server docs

   ```bash
   npm run start
   ```

2. With python

   If you already have python installed you can use the `http.server` module to server the static `docs` folder.

   ```bash
   cd docs && python -m http.server 3000
   ```

## Linting

The files are linted with markdownlint and pretty formatted with prettier. Lint locally with:

1. Install linter and prettier:

   ```bash
   npm i
   ```

2. Lint

   ```bash
   npm run lint
   ```

3. Fix auto fixable issues

   ```bash
   npm run lint:fix
   ```

## Guidelines

### Syntax highlighting

If you need syntax highlighting for other languages feel free to add the [prism.js](https://prismjs.com/) component to
the `index.html` file.

1. Goto the [all supported languages](https://prismjs.com/#supported-languages) page
2. Search for your language
3. Open `index.html` and add your language after the others
