#!/usr/bin/env node
import { execute } from './execute';
import { log, resolveProject } from './utils';

// 当文件直接从 Node.js 运行时，则 require.main 被设置为其 module。 这意味着可以通过测试 require.main === module 来确定文件是否被直接运行。
if (require.main === module) {
  const { name, version } = require(resolveProject('../package.json'));
  log.success(`${name}: ${version}`);
  execute();
} else {
  log.error('not in node');
}