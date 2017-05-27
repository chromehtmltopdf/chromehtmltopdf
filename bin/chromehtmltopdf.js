#!/usr/bin/env node

'use strict';

const chromehtmltopdf = require('../');

var program = require('commander');

var action;

program
  .version('0.0.2')
  .option('--port <port>', 'chrome remote debugging port')
  .option('-B, --margin-bottom <marginBottom>', 'Set the page bottom margin', parseFloat)
  .option('-L, --margin-left <marginLeft>', 'Set the page left margin', parseFloat)
  .option('-R, --margin-right <marginRight>', 'Set the page right margin', parseFloat)
  .option('-T, --margin-top <marginTop>', 'Set the page top margin', parseFloat)
  .option('--page-height <pageHeight>', 'Page height', parseFloat)
  .option('--page-width <pageWidth>', 'Page width', parseFloat)
  .arguments('<url> [output]')
  .action(function(url, output) {
      action = chromehtmltopdf.bind(null, url, output);
  });

program.parse(process.argv);

if (action) {
    action(program);
} else {
    program.outputHelp();
    process.exit(1);
}

