function NavigationController() {
    this.windowStack = [];
}

function NavigationControllerOpen(/*Ti.UI.Window*/windowToOpen) {
    //add the window to the stack of windows managed by the controller
    this.windowStack.push(windowToOpen);

    //grab a copy of the current nav controller for use in the callback
    var that = this;
    windowToOpen.addEventListener('close', function() {
        that.windowStack.pop();
    });
    //hack - setting this property ensures the window is "heavyweight" (associated with an Android activity)
    windowToOpen.navBarHidden = windowToOpen.navBarHidden || false;

    //This is the first window
    if (this.windowStack.length === 1) {
        var containerWindow;

        switch (Ti.Platform.osname) {
            case 'iphone':
            case 'ipad':
                this.navGroup = Ti.UI.iPhone.createNavigationGroup({
                    window : windowToOpen
                });
                containerWindow = Ti.UI.createWindow();
                containerWindow.add(this.navGroup);
                containerWindow.open({
                    transition : Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
                });
                break;
            case 'android':
                windowToOpen.exitOnClose = true;
                windowToOpen.open();
                break;
            case 'mobileweb':
                this.navGroup = Ti.UI.MobileWeb.createNavigationGroup({
                    window : windowToOpen
                });
                containerWindow = Ti.UI.createWindow();
                containerWindow.add(this.navGroup);
                containerWindow.open();
                break;
            default:
                Ti.API.error("NavigationController: " + Ti.Platform.osname + " not supported.");
                break;
        }
    } else {
        switch (Ti.Platform.osname) {
            case 'iphone':
            case 'ipad':
                this.navGroup.open(windowToOpen);
                break;
            case 'android':
                windowToOpen.open();
                break;
            case 'mobileweb':
                this.navGroup.open(windowToOpen);
                break;
            default:
                Ti.API.error("NavigationController: " + Ti.Platform.osname + " not supported.");
                break;
        }
    }
}

// Go back to the initial window of the NavigationController
function NavigationControllerHome() {
    // Store a copy of all the current windows on the stack
    var windows = this.windowStack.concat([]);
    for (var i = 1, l = windows.length; i < l; i++) {
        if (this.navGroup) {
            this.navGroup.close(windows[i]);
        } else { 
            windows[i].close();
        }
    }
    //reset stack
    this.windowStack = [this.windowStack[0]];
}

// External interface
NavigationController.prototype.open = NavigationControllerOpen;
NavigationController.prototype.home = NavigationControllerHome;
module.exports = NavigationController;
