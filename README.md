# chromehtmltopdf
webkithtmltopdf for chrome using the remote debugger protocol on nodejs

this is an attempt to implement [webkithtmltopdf](https://wkhtmltopdf.org/) on chrome.

# Install

```
npm install -g chromehtmltopdf
```

# Usage

install the bleeding edge version of chrome for your platform.  then run the following to get started.

```
google-chrome-unstable --headless --disable-gpu --remote-debugging-port=9222
```

```
chromehtmltopdf http://www.google.com example.pdf
```
