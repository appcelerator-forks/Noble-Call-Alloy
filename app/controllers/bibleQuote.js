var id = arguments[0].version;
var verse = arguments[0].verse;

var bibles = new (require('bibles'))();
$.bibleQuote.title = verse + " (" + bibles.selectedVersion + ")";

var font = new (require('font'))();
$.passage.font = {
    fontFamily: 'Optima-Regular',
    fontSize: font.size  
};

// Break out the arguments and lookup the passage.
var arr = verse.match(/(.+?)\s(\d+?):(.+?$)/);
$.loading.setOpacity(1);
bibles.getQuote({
    version: bibles.selectedVersion,
    book: arr[1],
    chapter: arr[2],
    verse: arr[3]
}, function (r) {   // Success
    $.passage.value = r.text; 
    $.loading.setOpacity(0);  
}, function (e) {   // Error
    alert("Problem encountered while loading passage, please check your internet connection.\n\n" + e.error);
    Alloy.Globals.navGroup.back();        
});
