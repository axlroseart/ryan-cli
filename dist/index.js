#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const execute_1 = require("./execute");
const utils_1 = require("./utils");
// 当文件直接从 Node.js 运行时，则 require.main 被设置为其 module。 这意味着可以通过测试 require.main === module 来确定文件是否被直接运行。
if (require.main === module) {
    const { name, version } = require(utils_1.resolveProject('../package.json'));
    utils_1.log.success(`${name}: ${version}`);
    execute_1.execute();
}
else {
    utils_1.log.error('not in node');
}
