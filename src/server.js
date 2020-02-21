/** Copyright (c) 2020 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import {createPlugin, html} from 'fusion-core';
import type {FusionPlugin} from 'fusion-core';
import {RobotsToken} from './tokens';
import type {DepsType} from './types';

const plugin =
  __NODE__ &&
  createPlugin<DepsType, void>({
    deps: {
      robots: RobotsToken,
    },
    middleware({robots}) {
      return (ctx, next) => {
        if (ctx.element) {
          ctx.template.head.push(
            html`
              <meta name="robots" all />
            `
          );
        }
        if (ctx.method === 'GET' && ctx.path === '/robots.txt') {
          ctx.body = robots;
        }
        return next();
      };
    },
  });

export default ((plugin: any): FusionPlugin<DepsType, void>);
