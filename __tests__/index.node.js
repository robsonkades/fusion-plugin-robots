/** Copyright (c) 2020 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import React from 'react';
import {consumeSanitizedHTML} from 'fusion-core';

import Plugin from '../src/index.js';

const TEST_ROBOTS = `User-agent: googlebot
Disallow: /directory1/
Disallow: /directory2/
Allow: /directory2/subdirectory1/

# Block the entire site from anothercrawler.
User-agent: anothercrawler
Disallow: /`;

test('injects robots', async done => {
  const element = React.createElement('div');
  const setupContext: any = {element, template: {head: [], body: []}};

  expect.assertions(1);
  if (!Plugin.middleware) {
    done();
    return;
  }

  // $FlowFixMe
  await Plugin.middleware({robots: TEST_ROBOTS})(setupContext, () =>
    Promise.resolve()
  );
  const robotsLink = '<meta name="robots" all />';
  expect(
    // $FlowFixMe
    consumeSanitizedHTML(setupContext.template.head[0]).match(robotsLink)[0]
  ).toBe(robotsLink);
  done();
});

test('returns robots', async done => {
  const requestContext: any = {
    undefined,
    method: 'GET',
    path: '/robots.txt',
  };

  expect.assertions(1);
  if (!Plugin.middleware) {
    done();
    return;
  }
  // $FlowFixMe
  await Plugin.middleware({robots: TEST_ROBOTS})(requestContext, () =>
    Promise.resolve()
  );
  // $FlowFixMe
  expect(requestContext.body).toBe(TEST_ROBOTS);
  done();
});
