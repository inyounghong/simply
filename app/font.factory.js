app.factory("FontFactory", FontFactory);

FontFactory.$inject = ['$sce'];

/* @ngInject */
function FontFactory($sce) {
    var webSafeFonts = ["georgia", "palatino linotype", "book antiqua", "palatino", "times new roman", "times", "serif", "sans-serif", "cursive", "arial", "helvetica", "comic sans ms", "impact", "lucida sans unicode", "tahoma", "trebuchet ms", "verdana", "geneva", "courier new", "lucida console"];

	var service = {
        webSafeFonts: webSafeFonts,
	    getFontString: getFontString,
        checkFonts: checkFonts
	};
	return service;

	////////////////

    function getFontString (fontsToImport){
        var str = "";
        for (var i = 0; i < fontsToImport.length; i++) {
            str += importFont(fontsToImport[i]);
        }
        return renderHtml("<style>" + str + "</style>");
    }

    function checkFonts(fonts){
        var fontArray = [];
        for (var i = 0; i < fonts.length; i++) {
            font = fonts[i].toLowerCase();
            if (fontArray.indexOf(font) == -1 && webSafeFonts.indexOf(font) == -1){
                fontArray.push(font);
            }
        };
        return fontArray;
    }

    // Helper functions

    function renderHtml (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    }
    
    function importFont(font) {
        var caps = font.replace( /\b\w/g, function (m) {
            return m.toUpperCase();
        });
        font_name = font.replace(" ", "+");
        return "@import url(http://fonts.googleapis.com/css?family=" + font_name + ") "
    }
}

