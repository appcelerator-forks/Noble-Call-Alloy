$.version.text = L('version_group') + ' ' + L('version_number') + ' ';

// Set up the combobox.
var Bibles = require('bibles');
var bibles = new Bibles();
bibles.getVersions(
    function (versions) {
        $.bibleversion.choices = versions;
        $.bibleversion.id = Ti.App.Properties.getString('BibleVersion', "kjv");        
    },
    function (e) {
        alert(L("no_versions"));
        $.bible_container.visible = false;
    }
);
$.bibleversion.init({ 
    parentView: $.main
});
$.bibleversion.on("change", function (e) {
   Ti.App.Properties.setString("BibleVersion", e.id); // Store for future use 
});

// Set up the logo.
function SetLogo(o) {
    var isLandscape = o ==  Ti.UI.LANDSCAPE_LEFT || o == Ti.UI.LANDSCAPE_RIGHT;
    var isPortrait = o == Ti.UI.PORTRAIT || o == Ti.UI.UPSIDE_PORTRAIT;
    if (isLandscape || isPortrait)
        $.logo.image = 'images/Info' + (isLandscape ? "Landscape" : "Portrait") + ".png";    
}
SetLogo(Ti.Gesture.orientation);

Ti.Gesture.addEventListener('orientationchange', function (e) {
    SetLogo(e.orientation);
});

// Set up the email button.
$.email.title = L('button_bug') ;      
$.email.addEventListener("click", function (e) {
    var emailDialog = Ti.UI.createEmailDialog();
    emailDialog.subject = L('email_subject');
    emailDialog.toRecipients = ['noblecall@orthlieb.com'];
    emailDialog.messageBody = L('email_body');
    emailDialog.open();
});

// Handle the font size buttons.
function SelectRadioButton(buttons, selected) {
   for (var i = 0; i < buttons.length; i++) {
        $[buttons[i]].borderColor = "white";
        $[buttons[i]].backgroundColor = "transparent";
     }    
    $[selected].borderColor = "white";
    $[selected].backgroundColor = "black";
} 

var buttons = [ "small", "medium", "large", "xlarge" ];
var fontSizeName = Ti.App.Properties.getString('FontSizeName', 'medium');
SelectRadioButton(buttons, fontSizeName);

function SizeClick(e) {
    SelectRadioButton(buttons, e.source.id);
    Ti.App.Properties.setString('FontSizeName', e.source.id);
}

// // Set up the info button.
// $.info.systemButton = Ti.UI.iPhone.SystemButton.INFO_DARK,
// $.info.icon = "images/info.png"; 
// $.info.text = L("about");
// $.info.init($.bibleQuote);
// $.info.on("click", function (e) {    
    // var info = Alloy.createController('bibleInfo', { description: $.version.choices[$.version.id].description + "\n\n" + $.version.choices[$.version.id].copyright });
    // Alloy.Globals.navGroup.open(info.getView());
// });
// $.info.visible = false;     // Until the versions are loaded.
// 
