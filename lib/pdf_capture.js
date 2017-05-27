'use strict';

module.exports = function(page, options) {
    const pdfOptions = {
        marginBottom: options.marginBottom || 0,
        marginTop: options.marginTop || 0,
        marginRight: options.marginRight || 1,
        marginLeft: options.marginLeft || 1,
        paperHeight: options.pageHeight || 11,
        paperWidth: options.pageWidth || 8.5
    };
    return page.printToPDF(pdfOptions);
}
