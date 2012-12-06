var style = {
    gutter: {
        size: 10
    },
    pagingControl: {
        height: 30
    }
};

exports.init = function ScrollableWebViewInit(urlArray) {
    var self = this;
    self.urlArray = urlArray;
    var moreThanOnePage = self.urlArray.length > 1;
    var displayPagingArrows = false;
    var scrollableViewBottom = 0;
    
    switch (Ti.Platform.osname) {
        case 'iphone':
        case 'ipad':
            scrollableViewBottom = moreThanOnePage ? 0 : style.gutter.size;
            break;
        case 'android':
        case 'mobileweb':
            displayPagingArrows = true;
            scrollableViewBottom = moreThanOnePage ? style.pagingControl.height : style.gutter.size;
            break;
        case 'blackberry':
        default:
            log.assert(false, "Cross Platform code not implemented.");
            break;
    }

    $.translucentView.bottom = moreThanOnePage ? style.pagingControl.height : style.gutter.size;
    $.scrollableView.bottom = scrollableViewBottom;
    $.scrollableView.showPagingControl = moreThanOnePage && !displayPagingArrows;
    $.scrollableView.pagingControlHeight = moreThanOnePage ? style.pagingControl.height : 0;

    if (displayPagingArrows && moreThanOnePage) {
        // Set up next/previous indicators
        $.prevButton.addEventListener('click', function PrevButtonClicked(e) {
           $.scrollableView.movePrevious(); 
        });
        $.prevButton.opacity = 1;
        $.nextButton.addEventListener('click', function NextButtonClicked(e) {
           scrollableView.moveNext(); 
        });
        $.nextButton.opacity = 1;
        $.scrollableView.addEventListener('scroll', function ScrollableViewScroll(e) {
                // Enable/disable the prev next buttons as the user pages through the views
                $.nextButton.enabled = (e.currentPage < (self.urlArray.length - 1));
                $.prevButton.enabled = (e.currentPage != 0);
        });
    }

    var aViews = [];
    for (var j = 0; j < self.urlArray.length; j++) {
        aViews[j] = Ti.UI.createWebView({
            url : '/HTML/' + self.urlArray[j] + '.html',
            left: style.gutter.size, right: style.gutter.size,
            backgroundColor : 'transparent',
            scalesPageToFit : false,
            enableZoomControls: false
        });
    }
    $.scrollableView.views = aViews;
};
