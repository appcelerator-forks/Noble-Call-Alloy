$.index.open();

// Make main window and navigation group available globally.
Alloy.Globals.mainWindow = $.getView();
Alloy.Globals.navGroup = $.navgroup;

// Create the main button grid.
var mainGrid = Alloy.createController('mainGrid');
Alloy.Globals.navGroup.open(mainGrid.getView(), { animated: true, transition: Ti.UI.iPhone.AnimationStyle.CURL_UP });

// Register a system wide event to look up a bible quote.
Ti.App.addEventListener('requestBibleQuote', function (e) {
    Ti.API.info("HTML button clicked: '" + e.verse + "'");
    if (!Ti.Network.online) {
        alert("You need a working internet connection to lookup passages. Please check your wifi or cellular signal.");
        return;
    }
    
    var bibleQuote = Alloy.createController("bibleQuote", { 
        version: Ti.App.Properties.getString('BibleVersion', "kjv"), verse: e.verse 
    } );
    bibleQuote.on("change", function (e) {
       Ti.App.Properties.setString("BibleVersion", e.version); // Store for future use 
    });
    Alloy.Globals.navGroup.open(bibleQuote.getView());
});
