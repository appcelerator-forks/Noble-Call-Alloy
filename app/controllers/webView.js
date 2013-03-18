var args = arguments[0];
$.webView.title = args.title;
$.webView.barColor = args.barColor || "#26688b";

$.scrollableWebView.urlArray = args.urlArray;

// Font Size
var fontSizeMap = {
    small: "12px",
    medium: "14px",
    large: "16px",
    xlarge: "20px"
};

$.scrollableWebView.on('load', function (e) {
    Ti.API.info("Web page loaded " + e.url);
    var fontSizeName = Ti.App.Properties.getString('FontSizeName', "medium");
    e.source.evalJS('document.body.style.fontSize =' + fontSizeMap[fontSizeName]);                  
});