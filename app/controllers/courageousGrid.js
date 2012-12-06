var courageousButtons = [
    {
        id : 'ButtonAgreement',
        title : L('the_two_agreements'),
        backgroundColor: '#2f2874',
        backgroundSelectedColor: '#1f1b4d',
        url : ['TheTwoAgreementsListener', 'TheTwoAgreementsSpeaker']
    }, 
    {
        id : 'ButtonPray',
        title : L('prayers'),
        backgroundColor: '#5869b6',
        backgroundSelectedColor: '#3d4980',
        url : [['CourageousPrayerHusbandAsListener', 'CourageousPrayerWifeAsSpeaker'], ['CourageousPrayerWifeAsListener', 'CourageousPrayerHusbandAsSpeaker']],
		choice: {
            title : L('question_listener'),
            options : [L('button_listener'), L('button_speaker'), L('button_cancel')],
            cancel : 2
        }    
    },
    {
        id : 'ButtonQuestion',
        title : L('questions'),
        backgroundColor: '#f1512c',
        backgroundSelectedColor: '#98331c',
        url : ['CourageousConversationIntro', 'CourageousConversationQuestion1', 'CourageousConversationQuestion2', 'CourageousConversationQuestion3', 'CourageousConversationQuestion4', 'CourageousConversationQuestion5', 'CourageousConversationQuestion6', 'CourageousConversationQuestion7', 'CourageousConversationQuestion8', 'CourageousConversationQuestion9', 'CourageousConversationQuestion10']
    },
    {
        id : 'ButtonEmotions',
        title : L('emotion_words'),
        backgroundColor: '#558227',
        backgroundSelectedColor: '#314d16',
        url : [['SoulInAdversityMen'], ['SoulInAdversityWomen']],
        choice: {
            title : L('question_man'),
            options : [L('button_man'), L('button_woman'), L('button_cancel')],
            cancel : 2
        },
    }
];

$.buttongrid.init({
    buttons: courageousButtons,
    buttonWidth: Alloy.isTablet ? 167 : 83,
    buttonHeight: Alloy.isTablet ? 240 : 120,
    duration: 1000,
    assetDir: '/images/buttongrid/',
    click: function (e) { 
    	if (e.source.choice) {
			var button = e.source;
			// There are 2 or more paths through this one. Use the choice property to ask the user.
        	var dlg = Ti.UI.createOptionDialog(e.source.choice);
            dlg.addEventListener('click', function(e) {
                if (e.index != 2) {
		            // Create a scrollable web view window.
		            var webView = Alloy.createController('webView', { title: e.source.title, urlArray: e.source.url[e.index] });
		            Alloy.globals.navController.open(webView.getView());
                }
            });
        	dlg.show();
    	} else if (_.isArray(e.source.url)) {
            // Create a scrollable web view window.
            var webView = Alloy.createController('webView', { title: e.source.title, urlArray: e.source.url });
            Alloy.globals.navController.open(webView.getView());
   		} else {
            alert("Clicked a button: " + e.source); 
        }
    }
});
