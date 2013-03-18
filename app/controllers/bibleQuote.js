$.baseURL = 'http://rebar.orthlieb.com/';

$.version.init({ 
    parentView: $.bibleQuote
});

var id = arguments[0].version;
var verse = arguments[0].verse;

$.bibleQuote.title = verse;
// Load up the combo box.
function loadVersions() {
    var xhr = Ti.Network.createHTTPClient({
        onload : function (e) {
            var bibles = JSON.parse(this.responseText);
            $.version.choices = bibles;   
            $.version.id = id; 
            $.info.visible = true;
        },
        onerror : function(e) {
            console.error('Error %d Message: %s', e.error, e.message);
            alert("Problem encountered while loading bible versions, please check your internet connection. %s", e.message);
            Alloy.Globals.navGroup.back();
        },
        timeout : 10000
    });

    xhr.open("GET", $.baseURL + "getVersions");
    xhr.send();
}
loadVersions();

// Whenever the user changes the version combobox we relook up the passage.
$.version.on("change", function (e) {
    id = e.id;
    $.passage.value = "";
    loadPassage();
    $.trigger("change", { version: e.id });
});

// Load up the passage
function loadPassage() {
    $.loading.setOpacity(1);
    var xhr = Ti.Network.createHTTPClient({
        onload : function (e) {
            var res = JSON.parse(this.responseText);
            $.passage.value = res.text; 
            $.loading.setOpacity(0);  
        },
        onerror : function(e) {
            console.error('Error %d Message: %s', e.error, e.message);
            alert("Problem encountered while loading passage, please check your internet connection. %s", e.message);
            Alloy.Globals.navGroup.back();        
        },
        timeout : 10000
    });

    var arr = verse.match(/(.+?)\s(\d+?):(.+?$)/);

    console.debug($.baseURL + "getQuote/?version=" + id + "&book=" + arr[1] + "&chapter=" + arr[2] + "&verse=" + arr[3]);
    xhr.open("GET", $.baseURL + "getQUote/?version=" + id + "&book=" + arr[1] + "&chapter=" + arr[2] + "&verse=" + arr[3]);
    xhr.send(); 
}
loadPassage();