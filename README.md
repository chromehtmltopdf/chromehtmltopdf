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

webpage to pdf

```
chromehtmltopdf http://www.google.com example.pdf
```

webpage to image.  png and jpeg are supported.

```
chromehtmltopdf http://www.google.com example.png
```

local html document to pdf

```
chromehtmltopdf index.html example.pdf
```

## Command Line Options

```
Usage: chromehtmltopdf [options] <url> [output]

Options:

  -h, --help                            output usage information
  -V, --version                         output the version number
  --port <port>                         chrome remote debugging port
  -B, --margin-bottom <marginBottom>    Set the page bottom margin
  -L, --margin-left <marginLeft>        Set the page left margin
  -R, --margin-right <marginRight>      Set the page right margin
  -T, --margin-top <marginTop>          Set the page top margin
  --page-height <pageHeight>            Page height
  --page-width <pageWidth>              Page width
  --image-quality <imageQuality>        When jpeg compressing images use this quality (default 94)
  --user-agent <userAgent>              Override the default user agent
  --javascript-delay <javascriptDelay>  Wait some milliseconds for javascript after the load event is fired.
```

# Liscense

MIT
