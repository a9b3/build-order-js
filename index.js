#!/usr/bin/env node
// use this for dev, production will use ./bin/index.js
const path = require('path')
require('app-module-path').addPath(path.resolve(__dirname, './src'))
require('babel-register')
require('babel-polyfill')
require('./src')
