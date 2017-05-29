'use strict';

var PageDriver = function(client) {
    this.client = client;
    this.page = this.client.Page;
    this.network = this.client.Network;
}

PageDriver.prototype.navigate = function(url) {
    return this.page.navigate({url: url});
};

PageDriver.prototype.setUserAgent = function(userAgent) {
    return this.network.setUserAgentOverride({userAgent: userAgent});
};

PageDriver.prototype.setContent = function(html) {
    // hack to get the root frameId
    return this.page.navigate({url: 'about:blank'}).then((result) => {
        this.page.setDocumentContent({frameId: result.frameId, html: html});
    });
};

module.exports.PageDriver = PageDriver;
