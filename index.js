'use strict';


const CDP = require('chrome-remote-interface');
const fs = require('fs');

module.exports = function(url, filePath, options) {
    CDP(options, (client) => {
        // Extract used DevTools domains.
        const Network = client.Network;
        const Page = client.Page;

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
            const pdfOptions = {
                marginBottom: options.marginBottom || 0,
                marginTop: options.marginTop || 0,
                marginRight: options.marginRight || 1,
                marginLeft: options.marginLeft || 1,
                paperHeight: options.pageHeight || 11,
                paperWidth: options.pageWidth || 8.5
            };
            Page.printToPDF(pdfOptions).then((result) => {
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
