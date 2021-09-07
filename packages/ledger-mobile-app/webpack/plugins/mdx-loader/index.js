// from https://github.com/mdx-js/mdx/blob/v2.0.0-next.9/packages/loader/index.js
// and included this way to prevent dependencies from webpack 4 being included

const { getOptions } = require('loader-utils');
const mdx = require('@mdx-js/mdx');

const DEFAULT_RENDERER = `
import React from 'react'
import {mdx} from '@mdx-js/react'
`;

module.exports = async function (content) {
  const callback = this.async();
  const options = { ...getOptions(this), filepath: this.resourcePath };

  let result;

  try {
    result = await mdx(content, options);
  } catch (err) {
    return callback(err);
  }

  const { renderer = DEFAULT_RENDERER } = options;

  const code = `${renderer}\n${result}`;
  return callback(null, code);
};
