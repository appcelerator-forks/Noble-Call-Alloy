$.version.text = L('version_group') + ' ' + L('version_number') + ' ';

// Set up the combobox.
var bibles = new (require('bibles'))();
bibles.getVersions(
    function (versions) {
        $.bibleversion.choices = versions;
        $.bibleversion.id = bibles.selectedVersion;  
        $.description.value = versions[$.bibleversion.id].description + '\n\n' + versions[$.bibleversion.id].copyright;      
    },
    function (e) {
        alert(L("no_versions"));
        $.bible_container.visible = false;
    }
);
$.bibleversion.init($.main);
$.bibleversion.on("change", function (e) {
    $.description.value = $.bibleversion.choices[e.id].description + '\n\n' + $.bibleversion.choices[e.id].copyright;      
    bibles.selectedVersion = e.id; 
});

// Set up the logo.
function SetLogo(e) {
    var o = e.orientation;
    Ti.API.info("Rotating Logo");
    var isLandscape = o ==  Ti.UI.LANDSCAPE_LEFT || o == Ti.UI.LANDSCAPE_RIGHT;
    var isPortrait = o == Ti.UI.PORTRAIT || o == Ti.UI.UPSIDE_PORTRAIT;
    if (isLandscape || isPortrait)
        $.logo.image = 'images/Info' + (isLandscape ? "Landscape" : "Portrait") + ".png";    
}
SetLogo({ o: Ti.Gesture.orientation });
Ti.Gesture.addEventListener('orientationchange', SetLogo);
$.main.addEventListener('close', SetLogo);  // Remember to clean up.

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
var font = new (require('font'))();
SelectRadioButton(buttons, font.sizeName);

function SizeClick(e) {
    SelectRadioButton(buttons, e.source.id);
    font.sizeName = e.source.id;
}
