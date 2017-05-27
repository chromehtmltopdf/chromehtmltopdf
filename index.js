'use strict';


const CDP = require('chrome-remote-interface');
const fs = require('fs');
const path = require('path');
const pdf_capture = require('./lib/pdf_capture');
const png_capture = require('./lib/png_capture');
const jpeg_capture = require('./lib/jpeg_capture');

const jpeg_extnames = {
    '.jpg': null, '.jpeg': null, '.jpe': null,
    '.jif': null, '.jfif': null, '.jfi': null
};

module.exports = function(url, filePath, options) {
    CDP(options, (client) => {
        // Extract used DevTools domains.
        const Network = client.Network;
        const Page = client.Page;

        if (typeof(options.capture_strategy) === 'undefined') {
            options.capture_strategy = pdf_capture;

            if (filePath) {
                const extname = path.extname(filePath.toLowerCase());
                if (extname in jpeg_extnames) {
                    options.capture_strategy = jpeg_capture;
                } else if (extname === '.png') {
                    options.capture_strategy = png_capture;
                }
            }
        }

        // Enable events on domains we are interested in.
        Promise.all([
            Network.enable(),
            Page.enable()
        ]).then(() => {
            return Page.navigate({url: url}).catch((err) => {
                console.error('Unable to navigate to %s :', url, err)
                client.close();
            });
        });

        Page.loadEventFired(() => {
            options.capture_strategy(Page, options).then((result) => {
                if (filePath) {
                    const data = Buffer.from(result.data, 'base64')
                    fs.writeFileSync(filePath, data);
                } else {
                    console.log(result.data);
                }
                client.close();
            }).catch((err) => {
                console.error('Screenshot Failed: ', err);
                client.close();
            });
        });
    }).on('error', (err) => {
        console.error('Cannot connect to browser:', err);
    });
};
