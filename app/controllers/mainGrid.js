var mainButtons = {
    ButtonKnight: {
        id: "ButtonKnight",
        title: L("noble_identity"),
        backgroundColor: "#26688b",
        url: [ [ 
            "JoyMountain",
            "NobleIdentityQuestions", 
            "NobleIdentityAnswers", 
            "NobleIdentityRememberWhoseYouAre", 
            "NobleIdentityRememberWhoYouAreMen", 
            "NobleIdentityRememberWhoYourWifeIs" 
        ], [ 
            "JoyMountain",
            "NobleIdentityQuestions", 
            "NobleIdentityAnswers", 
            "NobleIdentityRememberWhoseYouAre", 
            "NobleIdentityRememberWhoYouAreWomen", 
            "NobleIdentityRememberWhoYourHusbandIs" 
        ] ],
        choice: {
            title: L("question_man"),
            options: [ L("button_man"), L("button_woman"), L("button_cancel") ],
            cancel: 2
        }
    }, 
    ButtonEar: {
        id: "ButtonEar",
        title: L("listening"),
        backgroundColor: "#26688b",
        url: [ "Listening" ]
    },   
    ButtonHearts: {
        id: "ButtonHearts",
        title: L("connecting_conversation"),
        backgroundColor: "#558227",
        url: [ "ConnectingConversations", 
        "ConnectingConversations1", 
        "ConnectingConversations2", 
        "ConnectingConversations3", 
        "ConnectingConversations4", 
        "ConnectingConversations5", 
        "ConnectingConversations6", 
        "ConnectingConversations7", 
        "ConnectingConversations8", 
        "ConnectingConversations9" ]
    }, 
    ButtonFlower: {
        id: "ButtonFlower",
        title: L("a_great_response"),
        backgroundColor: "#5869b6",
        url: [ "ComfortingConversation1", 
        "ComfortingConversation2", 
        "ComfortingConversation3", 
        "ComfortingConversation4", 
        "ComfortingConversation5", 
        "ComfortingConversation6", 
        "ComfortingConversation7", 
        "ComfortingConversation8" ]
    }, 
    ButtonCrown: {
        id: "ButtonCrown",
        title: L("courageous_conversation"),
        backgroundColor: "#9e0000",
    }, 
    ButtonDove: {
        id: "ButtonDove",
        title: L("conciliatory_conversation"),
        backgroundColor: "#2f2874",
        url: [ "ConciliatoryConversation1", 
        "ConciliatoryConversation2", 
        "ConciliatoryConversation3" ]
    }, 
    ButtonScales: {
        id: "ButtonScales",
        title: L("collaborating_conversation"),
        backgroundColor: "#b1814b",
        url: [ "CollaboratingConversation1", "CollaboratingConversation2" ]
    }, 
    ButtonCompass: {
        id: "ButtonCompass",
        title: L("character"),
        backgroundColor: "#333333",
        url: [ "CharacterOfChrist", 
        "CharacterDefinitions", 
        "CharacterGroupings" ]
    }, 
    ButtonArmor: {
        id: "ButtonArmor",
        title: L("armor_of_god"),
        backgroundColor: "#333333",
        url: [ "ArmorOfGod", 
        "WarriorsCreed", 
        "BreastPlatePrayer" ]
    } 
};

$.buttongrid.init({
    gridDefaults: {
        assetDir: '/images/buttongrid/'
    },
    buttonDefaults: {
        width: Alloy.isTablet ? 167 : 83,
        height: Alloy.isTablet ? 240 : 120,
        font: { fontSize: Alloy.isTablet ? "20dp" : "10dp" },
        backgroundSelectedColor: "darkgray",
        color: "white",
        selectedColor: "lightgray",
        borderColor: "#888888",
        borderRadius: 10,
        borderWidth: 2,
        shadowColor: "#888888",
        shadowOffset: { x: "1dp", y: "1dp" }
    },
    buttons: _.values(mainButtons),
});

$.buttongrid.on('click', function (e) {
    switch (e.source.id) {
        case 'ButtonCrown':
            // Open up a secondary button grid
            var courageousGrid = Alloy.createController("courageousGrid");
            Alloy.Globals.navGroup.open(courageousGrid.getView());
        break;
        case 'ButtonKnight':
            // Choice before opening the web view window.
            var button = e.source, dlg = Ti.UI.createOptionDialog(button.choice);
            dlg.addEventListener("click", function(e) {
                if (e.index != 2) {
                    var webView = Alloy.createController("webView", {
                        title: mainButtons[button.id].title,
                        urlArray: mainButtons[button.id].url[e.index],
                        currentPage: 0,
                        barColor: button.backgroundColor,
                        toolbar: {
                            backgroundColor: e.source.backgroundColor
                        }
                    });
                    Alloy.Globals.navGroup.open(webView.getView());
                }
            });
            dlg.show();
        break;
        default: 
            if (_.isArray(e.source.url)) {
                // Create a scrollable web view window.
                var webView = Alloy.createController('webView', { 
                    title: mainButtons[e.source.id].title, 
                    urlArray: mainButtons[e.source.id].url,
                    currentPage: 0,
                    barColor: e.source.backgroundColor,
                    toolbar: {
                        backgroundColor: e.source.backgroundColor
                    }
                });
                Alloy.Globals.navGroup.open(webView.getView());
            } else {
                alert("Clicked a button: " + e.source); 
            }
        break;
    }
});

// Set up the info button.
$.info.systemButton = Ti.UI.iPhone.SystemButton.INFO_DARK,
$.info.icon = "images/info.png"; 
$.info.text = L("settings");
$.info.init($.main);
$.info.on("click", function (e) {
    var info = Alloy.createController('info');
    Alloy.Globals.navGroup.open(info.getView());
});
