app.controller('BasicJournalController', function($scope, $routeParams, $http, $sce){

    $scope.form = {}
    $scope.ctabs = [
        {
            title: 'Main CSS',
            url: 'app/shared/tabs/css_main.html'
        }, 
        {
            title: 'Header',
            url: 'app/shared/tabs/css_header.html'
        }, 
        {
            title: 'Footer',
            url: 'app/shared/tabs/css_footer.html'
        }
    ];

    $scope.save = save;
    $scope.getJournals = getJournals;

    var menu = "<div class='menu'>";
    menu += "<a href='url' class='link'>Link</a>";
    menu += "<a href='url' class='link'>Link</a>";
    menu += "<a href='url' class='link'>Link</a>";
    menu += "</div>";
    $scope.menu = menu;

    var structs;

    $http.get("/app/basic_journal/data/form2.json").success(function(data) {
        $scope.form = data;
        $scope.allFonts = [
            $scope.form.text.font.family, 
            $scope.form.title.font.family, 
            $scope.form.timestamp.font.family, 
            $scope.form.link.font.family,
            $scope.form.comments.font.family
        ];
        $scope.checkCss = checkCss;
        structs = {
            ".gr-box": $scope.form.box,
            ".gr-top": $scope.form.top,
            ".gr-top h2 a": $scope.form.title,
            ".gr-top .timestamp": $scope.form.timestamp,
            ".text": $scope.form.text,
            ".text a": $scope.form.link,
            "h1": $scope.form.h1,
            "h2": $scope.form.h2,
            "blockquote": $scope.form.blockquote,
            ".bottom": $scope.form.bottom,
            ".commentslink": $scope.form.comments,
            ".menu": $scope.form.menu,
            ".menu .link": $scope.form.link
        }
        checkCss();
    });

    var webSafeFonts = ["georgia", "palatino linotype", "book antiqua", "palatino", "times new roman", "times", "serif", "sans-serif", "cursive", "arial", "helvetica", "comic sans ms", "impact", "lucida sans unicode", "tahoma", "trebuchet ms", "verdana", "geneva", "courier new", "lucida console"];

    function checkCss() {
        console.log("checking");
        $scope.fonts = checkFonts();
        $scope.fontString = getFontString();

        var css = generateCss();
        $scope.small_css = renderHtml(css);
        $scope.css = renderHtml("<style>" + css + "</style>");
    }

    function save(){
        $http.post('/assets/php/saveJson.php', $scope.form).then(function(res) {
            console.log("saved");
            console.log(res);
        });
    }

    function getJournals(){
        $http.get('/assets/php/getJournals.php').then(function(res) {
            console.log(res);
        });
    }

    function checkFonts(){
        var fontArray = [];
        for (var i = 0; i < $scope.allFonts.length; i++) {
            font = $scope.allFonts[i].toLowerCase();
            if (fontArray.indexOf(font) == -1 && webSafeFonts.indexOf(font) == -1){
                fontArray.push(font);
            }
        };
        return fontArray;
    }

    $scope.checkFont = function(font){
        font = font.toLowerCase();
        if ($scope.fonts.indexOf(font) == -1 && webSafeFonts.indexOf(font) == -1){
            $scope.fonts.push(font);
        }
    }

    function getFontString (){
        var str = "";
        for (var i = 0; i < $scope.fonts.length; i++) {
            str += $scope.google($scope.fonts[i]);
        }
        return renderHtml("<style>" + str + "</style>");
    }

    $scope.google = function (font) {
        var caps = font.replace( /\b\w/g, function (m) {
            return m.toUpperCase();
        });
        font_name = font.replace(" ", "+");
        return "@import url(http://fonts.googleapis.com/css?family=" + font_name + ") "
    }


    function renderHtml (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    }

    function background(e) {
        if (e.bg){
            if (e.bg.useImage && e.bg.image){
                var repeat = (e.bg.repeat == "repeat") ? "" : e.bg.repeat;
                return "background: " + formatColor(e.bg.color) + " url(" + e.bg.image + ") " + repeat + ";" + ";\n";
            }
            return "background: " + formatColor(e.bg.color) + ";\n";
        } 
        return "";
    }

    function maxWidth(e) {
        var str = "";
        if (e.useWidth){
            str += "max-width: " + e.width + ";\n";
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
        if (color == null || color == ""){
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

    function margin(e) {
        if (e.margin) {
            return "margin: " + e.margin + "px;\n";
        }
        return "";
    }

    function transform(e) {
        if (e.font && e.font.transform){
            return "text-transform: " + e.font.transform + ";\n";
        }
    }

    function color(e){
        if (e.font && e.font.color){
            return "color: " + formatColor(e.font.color) + ";\n";
        } 
        return "";
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

    function maxWidth(e) {
        if (e.width) {
            var str = "margin: 0 auto;\n";
            return str + "max-width: " + e.width + "px;\n";
        }
        return "";
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

    function textAlign(e) {
        if (e.horizontal){
            return "text-align: " + e.horizontal + ";\n";
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

    function check(name, e){
        var str = "";
        if (name == ".gr-top .timestamp"){
            str += "display: block;\n";
        }
        if (name == ".commentslink"){
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
        return name + "{\n" + str + "}\n\n";
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

    function hr() {
        var f = $scope.form;
        str = 'hr{\n';
        str += 'border-bottom: 1px solid #' + f.hr.color + ';\n';
        str += 'margin: 15px 0 5px;\n';
        str += '}\n\n'
        return str;
    }

    function menuIsBar(){
        return ($scope.form.menu.style == "topbar" || $scope.form.menu.style == "middlebar");
    }

    function menuBackground(e) {
        if (menuIsBar()) {
            return "background: " + formatColor(e.bg.color) + ";\n";
        }
        return "";
    }

    function linkBackground(e) {
        if (!menuIsBar()) {
            return "background: " + formatColor(e.bg.color) + ";\n";
        }
        return "";
    }

    function menuPadding(e) {
        return "padding: " + e.padding + "px 10px;\n";
    }

    function menuMargin(e) {
        return "";
    }

    function createMenu() {
        var str = "";
        str += ".menu {\n";
        str += "width: 100%;\n";
        str += menuBackground($scope.form.menu);
        str += "}\n\n";
        str += ".menu .link {\n";
        str += "width: 100%;\n";
        str += linkBackground($scope.form.menu);
        str += color($scope.form.menu);
        str += transform($scope.form.menu);
        str += menuPadding($scope.form.menu);
        str += menuMargin($scope.form.menu);
        str += "}\n\n";
        return str;
    }

    function generateCss() {
        var css = '';
        css += '*{background:none; \nborder:none; \npadding:0; \nmargin:0;} \n\n';
        css += '.gr{padding:0 !important;}\n';
        css += '.gr-top img, .gr1, .gr2, .gr3 {display:none;}\n';
        css += 'a.external:after {display:none;}\n\n';

        css += ".gr-top h2{\n";
        css += "text-align: " + $scope.form.top.font.align + ";\n";
        css += "}\n\n";

        for (var key in structs) {
            css += check(key, structs[key]);
        }

        css += createMenu();
        css += credits();
        css += hr();
    
        return css;
    }

});