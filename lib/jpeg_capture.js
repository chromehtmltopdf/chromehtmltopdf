'use strict';

module.exports = function(page, options) {
    const jpegOptions = {
        format: 'jpeg',
        quality: options.imageQuality || 94
    };
    return page.captureScreenshot(jpegOptions);
}
