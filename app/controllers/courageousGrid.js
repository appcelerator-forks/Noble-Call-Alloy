var courageousButtons = {
    ButtonAgreement: {
        id : 'ButtonAgreement',
        title : L('the_two_agreements'),
        backgroundColor: '#9e0000',
        url : ['TheTwoAgreementsListener', 'TheTwoAgreementsSpeaker']
    }, 
    ButtonPray: {
        id : 'ButtonPray',
        title : L('prayers'),
        backgroundColor: 'white',
        color: "#9e0000",
        url : [['CourageousPrayerHusbandAsListener', 'CourageousPrayerWifeAsSpeaker'], ['CourageousPrayerWifeAsListener', 'CourageousPrayerHusbandAsSpeaker']],
		choice: {
            title : L('question_listener'),
            options : [L('button_listener'), L('button_speaker'), L('button_cancel')],
            cancel : 2
        }    
    },
    ButtonQuestion: {
        id : 'ButtonQuestion',
        title : L('questions'),
        backgroundColor: '#9e0000',
        url : ['CourageousConversationIntro', 'CourageousConversationQuestion1', 'CourageousConversationQuestion2', 'CourageousConversationQuestion3', 'CourageousConversationQuestion4', 'CourageousConversationQuestion5', 'CourageousConversationQuestion6', 'CourageousConversationQuestion7', 'CourageousConversationQuestion8', 'CourageousConversationQuestion9', 'CourageousConversationQuestion10']
    },
    ButtonEmotions: {
        id : 'ButtonEmotions',
        title : L('emotion_words'),
        backgroundColor: 'white',
        color: "9e0000",
        url : [['SoulInAdversityMen'], ['SoulInAdversityWomen']],
        choice: {
            title : L('question_man'),
            options : [L('button_man'), L('button_woman'), L('button_cancel')],
            cancel : 2
        },
    }
};

$.buttongrid.init({
    gridDefaults: {
        assetDir: '/images/buttongrid/',
        duration: 1000 
    },
    buttonDefaults: {
        width: Alloy.isTablet ? 167 : 83,
        height: Alloy.isTablet ? 240 : 120,
        font: { fontSize: Alloy.isTablet ? "20dp" : "10dp" },
        backgroundSelectedColor: "darkgray",
        color: "white",
        selectedColor: "lightgray",
        borderColor: "#888888",
        borderRadius: "10dp",
        borderWidth: "2dp",        
        shadowColor: "#888888",
        shadowOffset: { x: "1dp", y: "1dp" }
    },
    buttons: _.values(courageousButtons),
});

$.buttongrid.on('click', function (e) { 
	if (e.source.choice) {
		var button = e.source;
		// There are 2 or more paths through this one. Use the choice property to ask the user.
    	var dlg = Ti.UI.createOptionDialog(e.source.choice);
        dlg.addEventListener('click', function(f) {
            if (f.index != 2) {
	            // Create a scrollable web view window.
	            var webView = Alloy.createController('webView', { 
	                title: courageousButtons[e.source.id].title, 
	                urlArray: courageousButtons[e.source.id].url[f.index],
	                currentPage: 0,
	                barColor: "#9e0000",
                    toolbar: {
                        backgroundColor: "#9e0000"
                    }
	             });
	            Alloy.Globals.navGroup.open(webView.getView());
            }
        });
    	dlg.show();
	} else if (_.isArray(e.source.url)) {
        // Create a scrollable web view window.
        var webView = Alloy.createController('webView', { 
            title:  courageousButtons[e.source.id].title, 
            urlArray: courageousButtons[e.source.id].url,
            currentPage: 0,
            barColor: "#9e0000", 
            toolbar: {
                backgroundColor: "#9e0000"
            }
    });
        Alloy.Globals.navGroup.open(webView.getView());
	} else {
        alert("Clicked a button: " + e.source); 
    }
});

// Ensure that the button grid gets relayed out when the device is rotated.
function relayout() { $.buttongrid.relayout(); }
Ti.Gesture.addEventListener("orientationchange", relayout);
$.main.addEventListener('close', function (e) { Ti.Gesture.removeEventListener('orientationchange', relayout); });

// Set up the info button.
$.info.systemButton = Ti.UI.iPhone.SystemButton.INFO_DARK,
$.info.icon = "images/info.png"; 
$.info.text = L("settings");
$.info.init($.main);
$.info.on("click", function (e) {
    var info = Alloy.createController('info');
    Alloy.Globals.navGroup.open(info.getView());
});

