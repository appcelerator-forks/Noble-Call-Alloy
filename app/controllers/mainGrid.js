var mainButtons = [
    // id: image name, label, bottom offset for label
    {
        id : 'ButtonDove',
        title : L('conciliatory_conversation'),
        backgroundColor: '#2f2874',
        backgroundSelectedColor: '#1f1b4d',
        url : ['ConciliatoryConversation1', 'ConciliatoryConversation2', 'ConciliatoryConversation3']
    },
    {
        id : 'ButtonFlower',
        title : L('a_great_response'),
        backgroundColor: '#5869b6',
        backgroundSelectedColor: '#3d4980',
        url : ['ComfortingConversation1', 'ComfortingConversation2', 'ComfortingConversation3', 'ComfortingConversation4', 'ComfortingConversation5', 'ComfortingConversation6', 'ComfortingConversation7', 'ComfortingConversation8']
    },
    {
        id : 'ButtonCrown',
        title : L('courageous_conversation'),
        backgroundColor: '#f1512c',
        backgroundSelectedColor: '#98331c',
        click: function (e) { 
            var courageousGrid = Alloy.createController('courageousGrid');
            Alloy.globals.navController.open(courageousGrid.getView());
        }
    },
    {
        id : 'ButtonHearts',
        title : L('connecting_conversation'),
        backgroundColor: '#558227',
        backgroundSelectedColor: '#314d16',
        url : ['ConnectingConversations', 'ConnectingConversations1', 'ConnectingConversations2', 'ConnectingConversations3', 'ConnectingConversations4', 'ConnectingConversations5', 'ConnectingConversations6', 'ConnectingConversations7', 'ConnectingConversations8', 'ConnectingConversations9']
    },
    {
        id : 'ButtonScales',
        title : L('collaborating_conversation'),
        backgroundColor: '#b1814b',
        backgroundSelectedColor: '#67482a',
        url : ['CollaboratingConversation1']
    },
    {
        id : 'ButtonKnight',
        title : L('noble_identity'),
        backgroundColor: '#2f2874',
        backgroundSelectedColor: '#1f1b4d',
        url : [['NobleIdentityRememberWhoseYouAre', 'NobleIdentityRememberWhoYouAreMen', 'NobleIdentityRememberWhoYourWifeIs'], ['NobleIdentityRememberWhoseYouAre', 'NobleIdentityRememberWhoYouAreWomen', 'NobleIdentityRememberWhoYourHusbandIs']],
        choice: {         
            title : L('question_man'),
            options : [L('button_man'), L('button_woman'), L('button_cancel')],
            cancel : 2
		},
		click: function (e) {
			var button = e.source;
			// There are 2 or more paths through this one. Use the choice property to ask the user.
        	var dlg = Ti.UI.createOptionDialog(button.choice);
            dlg.addEventListener('click', function(e) {
                if (e.index != 2) {
		            // Create a scrollable web view window.
		            var webView = Alloy.createController('webView', { title: button.title, urlArray: button.url[e.index] });
		            Alloy.globals.navController.open(webView.getView());
                }
            });
        	dlg.show();
        }
    },
    {
        id : 'ButtonCompass',
        title : L('character'),
        backgroundColor: '#5869b6',
        backgroundSelectedColor: '#3d4980',
        url : ['CharacterOfChrist', 'CharacterDefinitions', 'CharacterGroupings']
    },
    {
        id : 'ButtonArmor',
        title : L('armor_of_god'),
        backgroundColor: '#f1512c',
        backgroundSelectedColor: '#98331c',
        url : ['ArmorOfGod', 'WarriorsCreed', 'BreastPlatePrayer']
    }
];

$.buttongrid.init({
    buttons: mainButtons,
    buttonWidth: Alloy.isTablet ? 167 : 83,
    buttonHeight: Alloy.isTablet ? 240 : 120,
    duration: 1000,
    assetDir: '/images/buttongrid/',
    click: function (e) { 
        if (_.isArray(e.source.url)) {
            // Create a scrollable web view window.
            var webView = Alloy.createController('webView', { title: e.source.title, urlArray: e.source.url });
            Alloy.globals.navController.open(webView.getView());
        } else {
            alert("Clicked a button: " + e.source); 
        }
    }
});
