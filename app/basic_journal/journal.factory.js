app.factory("JournalFactory", JournalFactory);

// JournalFactory.$inject = ['HttpService'];

/* @ngInject */
function JournalFactory() {
	var service = {
        getCss: getCss,
        formatJournal: formatJournal,
        getBackground: getBackground
	};
	return service;

	////////////////

    function getBackground(e) {
        if (e.useImage && notNull(e.image)) {
            return e.color + ' url(' + e.image + ')';
        }
        return e.color;
    }

    function formatJournal(j) {
        var toCheck = [j.box.bg, j.top.bg, j.text.bg, j.bottom.bg, j.menu.bg]
        var toCheckColors = [j.title.font, j.text.font, j.h1.font, j.h2.font]
        var boxes = [];

        while (boxes.length < 4 && toCheck.length > 0) {
            var e = toCheck.pop();
            if (useForBox(e)){
                var box = {
                    style: "background: " + e.color + " url('" + e.image + "');"
                }
                boxes.push(box);
            }
        }
        while (boxes.length < 4 && toCheckColors.length > 0) {
            var e = toCheckColors.pop();
            if (notNull(e.color)) {
                var box = {
                    style: "background: " + e.color + " url('" + e.image + "');"
                }
                boxes.push(box);
            }
        }
        return boxes;
    }

    function useForBox(e) {
        return notNull(e.color) || (e.useImage && notNull(e.image));
    }

    function notNull(field) {
        return !(field == null || field == "");
    }

    function isNull(field) {
        return (field == null || field == "");
    }

    function getCss(form, structs) {
        var css = '';
        css += '*{background:none; \nborder:none; \npadding:0; \nmargin:0;} \n\n';
        css += '.gr{padding:0 !important;}\n';
        css += '.gr-top img, .gr1, .gr2, .gr3 {display:none;}\n';
        css += 'a.external:after {display:none;}\n\n';

        css += ".gr-top h2{\n";
        css += "text-align: " + form.top.font.align + ";\n";
        css += "}\n\n";

        var structs = {
            ".gr-box": form.box,
            ".gr-top": form.top,
            ".gr-top h2 a": form.title,
            ".gr-top .timestamp": form.timestamp,
            ".text": form.text,
            ".text a": form.link,
            "h1": form.h1,
            "h2": form.h2,
            "blockquote": form.blockquote,
            ".bottom": form.bottom,
            ".commentslink": form.comments,
            ".menu": form.menu,
            ".menu .link": form.link
        }

        for (var key in structs) {
            css += check(key, structs[key]);
        }

        css += createMenu(form);
        css += credits();
        css += hr(form);
    
        return css;
    }

    // Helper functions

    function createMenu(form) {
        var str = "";
        str += ".menu {\n";
        str += "width: 100%;\n";
        str += menuBackground(form);
        str += "}\n\n";

        str += ".menu .link {\n";
        str += "width: 100%;\n";
        str += linkBackground(form);
        str += color(form.menu);
        str += transform(form.menu);
        str += menuPadding(form.menu);
        str += menuMargin(form.menu);
        str += "}\n\n";
        return str;
    }

    function check(name, e){
        var str = "";
        if (name == ".gr-top .timestamp"){
            str += "display: inline-block;\n";
        }
        if (name == ".commentslink"){
            str += "display: inline-block;\n";
        } 
        if (name == ".gr-top h2 a") {
            str += "display: inline-block;\n";
        }
        str += background(e);
        str += borderRadius(e);
        str += border(e);
        str += maxWidth(e);
        str += height(e);
        str += fontStyle(e);
        str += lineHeight(e);
        str += padding(e);
        str += margin(e);
        str += scroll(e);
        return name + "{\n" + str + "}\n\n";
    }

    function menuPadding(e) {
        return "padding: " + e.padding + "px 10px;\n";
    }

    function menuMargin(e) {
        return "";
    }

	function hr($form) {
        var f = $form;
        str = 'hr{\n';
        str += 'border-bottom: 1px solid #' + f.hr.color + ';\n';
        str += 'margin: 15px 0 5px;\n';
        str += '}\n\n'
        return str;
    }

    function menuIsBar($form){
        return ($form.menu.style == "topbar" || $form.menu.style == "middlebar");
    }

	function menuBackground($form) {
        if (menuIsBar($form)) {
            return "background: " + formatColor($form.menu.bg.color) + ";\n";
        }
        return "";
    }

    function linkBackground($form) {
        if (!menuIsBar($form)) {
            return "background: " + formatColor($form.menu.bg.color) + ";\n";
        }
        return "";
    }

	function scroll(e) {
        var str = "";
        if (e.useScroll && e.scrollHeight) {
            str += "height: " + e.scrollHeight + "px;\n";
            str += "overflow: scroll;\n";
        }   
        return str;
    }

	function padding(e){
        if (e.top && e.bottom){
            return "padding: " + e.top + "px 5% " + e.bottom + "px;\n";
        }
        if (e.padding) {
            return "padding: " + e.padding + "px;\n";
        }
        return "";
    }

    function margin(e) {
        if (e.margin) {
            return "margin: " + e.margin + "px;\n";
        }
        return "";
    }

	function credits() {
	    str = "";
	    str += '.credit {\n';
	    str += 'left: 0;\n';
	    str += 'width: 100%;\n';
	    str += 'text-align: center;\n';
	    str += 'position: absolute;\n';
	    str += 'bottom: 10px; \n'
	    str += '}\n\n';

	    str += '.credit, .credit a{\n';
	    str += 'text-decoration:none;'
	    str += 'color: #222!important;\n';
	    str += 'font-size: 10px;\n';
	    str += '}\n\n';
	    return str;
	}

	function background(e) {
	    if (e.bg){
	        if (e.bg.useImage && e.bg.image){
	            var repeat = (e.bg.repeat == "repeat") ? "" : e.bg.repeat;
	            return "background: " + formatColor(e.bg.color) + " url(" + e.bg.image + ") " + repeat + ";\n";
	        }
	        return "background: " + formatColor(e.bg.color) + ";\n";
	    } 
	    return "";
	}

	function maxWidth(e) {
	    var str = "";
	    if (e.width){
	        str += "max-width: " + e.width + "px;\n";
	        str += "margin: 0 auto;\n";
	    }
	    return str;
	}

	function borderRadius(e) {
	    var str = "";
	    if (e.roundness && e.roundness != "0"){
	        str += "border-radius: " + e.roundness + "px;\n";
	        str += "webkit-border-radius: " + e.roundness + "px;\n";
	        str += "-moz-border-radius: " + e.roundness + "px;\n";
	    }
	    return str;
	}

	function formatColor(color){
	    if (isNull(color)){
	        return " transparent";
	    } else {
	        return " "  + color;
	    }
	}

	function border(e) {
        if (e.border){
            if (e.border.style != "none"){
                return "border: " + e.border.width + "px " + e.border.style + formatColor(e.border.color) + ";\n";
            }
        }
        return "";
    }

    function color(e){
        if (e.font && e.font.color){
            return "color: " + formatColor(e.font.color) + ";\n";
        } 
        return "";
    }

    function transform(e) {
        if (e.font && e.font.transform){
            return "text-transform: " + e.font.transform + ";\n";
        }
    }

    function fontStyle(e) {
        var str = "";
        if (e.font){
            str += color(e);
            if (e.font.family){
                str += "font-family: " + e.font.family + ";\n";
            }
            if (e.font.size){
                str += "font-size: " + e.font.size + "px;\n";
            }
            if (e.font.align){
                str += "text-align: " + e.font.align + ";\n";
            }
            if (e.font.bold) {
                str += "font-weight: 700;\n";
            }
            if (e.font.italic) {
                str += "font-style: italic;\n";
            }
            if (e.font.underline) {
                str += "text-decoration: underline;\n";
            }
            transform(e);
        }
        return str;
    }

    function lineHeight(e) {
        if (e.lineheight){
            return "line-height: " + e.lineheight + "em;\n";
        }
        return "";
    }

    function height(e) {
        var str = "";
        if (e.height && e.padding && e.vertical){
            var height = parseInt(e.height);
            var pad = parseInt(e.padding);
            var full = height + pad + pad;
            var top;
            var bottom;
            if (e.vertical == "top") {
                top = pad;
                bottom = full - top;
            } else if (e.vertical == "center") {
                top = full/2;
                bottom = full/2;
            } else {
                top = full - pad;
                bottom = pad;
            }
            return "padding: " + top + "px " + pad + "px " + bottom + "px;\n";
        }
        return "";
    }
}

