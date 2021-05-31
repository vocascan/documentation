# Documentation

Preview the documentation locally in two ways.

### 1. via node and the docsify-cli

Install docsify
```bash
npm i
```

Server docs
```bash
npm run start
```

### 2. via python

If you already have python installed you can use the `http.server` module to server the static `docs` folder.

```
cd docs && python -m http.server 3000
```