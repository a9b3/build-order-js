#!/usr/bin/env node
const path = require('path')
require('app-module-path').addPath(path.resolve(__dirname, './lib'))
require('./lib')
