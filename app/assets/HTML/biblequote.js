// Reclass all buttons to request a bible quote
window.onload = function() {
	var buttons = document.getElementsByTagName('button');
    for (var i = 0; i < buttons.length; i++) {
		buttons[i].setAttribute('onClick', "Ti.App.fireEvent('requestBibleQuote', { verse: '" + buttons[i].innerHTML.replace(/^\s+|\s+$/g, '') + "'});");
	}
};

Ti.App.addEventListener('changeFontSize', function (e) {
    Ti.API.info('Changing font size to ' + e.fontSize);
    document.body.style.fontSize = e.fontSize; 
});
