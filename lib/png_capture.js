'use strict';

module.exports = function(page, options) {
    const pngOptions = {
        format: 'png'
    };
    return page.captureScreenshot(pngOptions);
}
