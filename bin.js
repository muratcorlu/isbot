#!/usr/bin/env node

var { readFile } = require('fs')
var { join } = require('path')
var { man } = require('./package.json')
var isbot = require('.')

var [, , ...rest] = process.argv

var ua = rest.join(' ');

(function () {
  var help = rest.includes('--help') || rest.includes('-h')

  if (help) {
    readFile(
      join(__dirname, man),
      function (error, result) {
        if (error) {
          console.error(error)
          process.exit(1)
        }
        console.log(result.toString())
        process.exit(0)
      }
    )
    return
  }

  if (!ua) {
    console.log(
      'Missing user agent string input.',
      '\n',
      man
    )
    readFile(
      join(__dirname, man),
      function (error, result) {
        error
          ? console.error(error)
          : console.log(result.toString())
        process.exit(1)
      }
    )
    return
  }

  console.log(
    'Check user agent',
    '\n',
    ua
  )

  var result = isbot(ua)

  if (result) {
    console.log('User agent is bot. The matched string is ' + isbot.find(ua))
    process.exit(0)
  }

  console.log('User agent is not any known bot or crawler')
  process.exit(1)
})()
