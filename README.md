# fusion-plugin-robots

[![Build status](https://badge.buildkite.com/7a82192275779f6a8ba81f7d4a1b0d294256838faa1dfdf080.svg?branch=master)](https://buildkite.com/uberopensource/fusionjs)

Handles creating and returning a Robots(_robots.txt_) file for your Fusion app.

---

### Table of contents

* [Installation](#installation)
* [Setup](#setup)

---

### Installation

```sh
yarn add fusion-plugin-robots
```

---

### Setup
Create an `Object` to use for your `robots.txt` content.
```js
// src/robots.js
import { assetUrl } from 'fusion-core'

export default `
User-agent: *
Disallow: /search
Allow: /search/about
Allow: /search/static
Allow: /search/howsearchworks

User-agent: facebookexternalhit
Allow: /imgres

Sitemap: https://www.google.com/sitemap.xml
`
```
Register `RobotsToken` with your manifest `Object` and register `RobotsPlugin` for the `__NODE__` env.
```js
// src/main.js
import App from 'fusion-react'
import RobotsPlugin, {
  RobotsToken,
} from 'fusion-plugin-robots'
import Robots from './robots'
export default () => {
  const app = new App(root)
  if (__NODE__) {
    app.register(RobotsToken, Robots)
    app.register(RobotsPlugin)
  }
  return app
}
```
