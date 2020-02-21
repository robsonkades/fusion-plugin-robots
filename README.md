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
Create an `Const` to use for your `robots.js` content.
```js
// src/robots.js
export const Robots = `User-agent: googlebot
Disallow: /directory1/
Disallow: /directory2/
Allow: /directory2/subdirectory1/

# Block the entire site from anothercrawler.
User-agent: anothercrawler
Disallow: /`
`
```
Register `RobotsToken` with your robots `File` and register `RobotsPlugin` for the `__NODE__` env.
```js
// src/main.js
import App from 'fusion-react'
import RobotsPlugin, {
  RobotsToken
} from 'fusion-plugin-robots'
import { Robots } from './robots'
export default () => {
  const app = new App(root)
  if (__NODE__) {
    app.register(RobotsToken, Robots)
    app.register(RobotsPlugin)
  }
  return app
}
```
