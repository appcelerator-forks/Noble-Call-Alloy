var NavigationController = require('NavigationController');
Alloy.globals.navController = new NavigationController();

var mainGrid = Alloy.createController('mainGrid');
Alloy.globals.navController.open(mainGrid.getView());