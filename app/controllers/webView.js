var args = arguments[0];
$.webView.title = args.title;
$.webView.barColor = args.barColor || "#26688b";

$.scrollableWebView.urlArray = args.urlArray;

// After the web page is loaded we apply the user requested font size.
$.scrollableWebView.on('load', function (e) {
    Ti.API.info("Web page loaded " + e.url);
    var font = new (require('font'))();
    e.source.evalJS('document.body.style.fontSize ="' + font.size + 'px"');                  
});