#! /usr/bin/env node
const path = require('path')
const Liftoff = require('liftoff')
const minimist = require('minimist')
const ovrw = require('..')

new Liftoff({
    name: 'ovrw',
    processTitle: 'ovrw',
}).launch({}, (env, argv) => {
    const lastBinIndex = argv.findIndex(arg => arg.match(/ovrw(\.js)?$/))
    const { _: [ src ], dist, port } = minimist(argv.slice(lastBinIndex < 0 ? 0 : lastBinIndex + 1), { alias: { d: 'dist', p: 'port' } })
    const cwd = process.cwd()
    ovrw(src ? path.resolve(cwd, src) : cwd, {
        ...dist && { dist: path.resolve(cwd, dist) },
        ...port && { port },
    })
});
