function injectIcon(id) { //helper method to inject an icon using Iconic
    var iconEl;
    iconic.inject(id, {
        each: function (svg) {
            iconEl = $(svg);
        }
    }, function (count) {
        iconEl.show(); //show the icon after it has been injected
    });
}

function nl2br(str) {
	return str.replace(/(\n)/g, '<br>');
}
function br2nl(str) {
	return str.replace(/(<br>)/g, '\n');
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function activateHtml(text) {
    return text.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp/g, "&");
}

//Rgb to Hex
function rgbToHex(rgb){
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function signum(number) {
    return (number > 0) - (number < 0);
}
