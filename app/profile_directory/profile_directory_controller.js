app.controller('CtabController', function($scope, $routeParams, $http){
    $scope.current_ctab = $scope.ctabs[0].url;

    $scope.on_click_ctab = function(tab){
     $scope.current_ctab = tab.url;
    }
    $scope.is_active_ctab = function(tab) {
        return tab.url == $scope.current_ctab;
    }
});

app.controller('ProfileDirectoryController', function($scope, $routeParams, $http, $sce){

	// $http.get("/app/.js").success(function(data) {
 //     	$scope.resources = data;
 //    });

    $scope.tabs = [
    	{
            title: 'Directory',
            url: 'app/profile_directory/tabs/directory.html'
        }, 
        {
            title: 'Colors',
            url: 'app/profile_directory/tabs/colors.html'
        }, 
        {
            title: 'Buttons',
            url: 'app/profile_directory/tabs/buttons.html'
    	},
    	{
            title: 'Status',
            url: 'app/profile_directory/tabs/status.html'
    	},
    	{
            title: 'Purchase',
            url: 'app/profile_directory/tabs/purchase.html'
    	}
    ];

    $scope.ctabs = [
    	{
            title: 'Widget',
            url: 'app/shared/tabs/widget.html'
        }, 
        {
            title: 'HTML',
            url: 'app/shared/tabs/html.html'
        }, 
        {
            title: 'CSS',
            url: 'app/shared/tabs/css.html'
    	}
    ];

    $scope.form = {
        backgroundImg: "",
        font: "",
        italic: false,
        bold: false,
        letterSpacing: false,
        maxWidth: 500,
        topMargin: 0,
        includeTransitions: true,
        includeArrow: false,
        button: {
            font: "Open Sans",
            fontSize: 14,
            padding: 10,
            rightMargin: 1.0,
            bottomMargin: 5,
            radius: 0
        }
    };

    $scope.form.buttons = [
        {
            name: "My Button",
            url: "",
            isLong: false,
        },
        {
            name: "My Button",
            url: "",
            isLong: false,
        },
        {
            name: "My Button",
            url: "",
            isLong: false,
        },
        {
            name: "My Button",
            url: "",
            isLong: false,
        },
        {
            name: "My Button",
            url: "",
            isLong: false,
        }
    ]

    $scope.statusButtons = [
        {
            name: "My Button",
            url: "",
            description: "Digital Chibis and Pixel Icons (OPEN)",
        },
        {
            name: "My Button",
            url: "",
            description: "Digital Chibis and Pixel Icons (OPEN)",
        },
        {
            name: "My Button",
            url: "",
            description: "Digital Chibis and Pixel Icons (OPEN)",
        }
    ]

    $scope.currentTab = $scope.tabs[0].url;
    $scope.current_ctab = $scope.ctabs[0].url;

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }
    $scope.isActiveTab = function(tab) {
        return tab.url == $scope.currentTab;
    }

    $scope.addButton = function(){
        $scope.buttons.push({
            name: "My Button",
            url: "",
            isLong: false,
        });
    }
    $scope.removeButton = function(index){
        console.log(index);
    }

    $scope.checkHtml = function(){
        var html = generateHtml();
        $scope.html = renderHtml(html);
    }

    $scope.checkCss = function(){
        var css = generateCss();
        $scope.small_css = renderHtml(css);
        $scope.css = renderHtml("<style>" + css + "</style>");
    }

    $scope.checkHtml();
    $scope.checkCss();

    function renderHtml (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    }

    function generateHtml() {
        var button_html = "";
        var status_html = "";
        var arrow = "";
        if ($scope.form.includeArrow){
            arrow = ' <span>&#10152;</span>';
        } 

        // Regular buttons
        angular.forEach($scope.form.buttons,function(button){
            var long_class = (button.isLong) ? "long" : "";
            button_html += '<a class="button' + long_class + '" href="' + button.url + '">' + button.name + arrow + '</a>'
        })

        // Status buttons
        if ($scope.form.includeStatus){
            status_html += '<div class="status">\n';
            angular.forEach($scope.buttons,function(button){
                status_html += '<div class="col"><a class="button" href="' + button.link + '">';
                status_html += button.name + '</a>\n';
                status_html += '<div class="description">' + button.description + '</div></div>';
            });
            status_html += "</div>"
        }
        
        return button_html + status_html;
    }

    function generateCss() {
        var css = '';
        var italic = ($scope.form.italic) ? "italic" : "normal";
        var bold = ($scope.form.bold) ? "700" : "400";
        var letter_spacing = ($scope.form.letterSpacing) ? "1px" : "0";

        css += '/* Clean Up */\n';
        css += '*{background:none; border:none; padding:0; margin:0;} \n\n';
        css += '.gr{padding:0 !important;}\n';
        css += '.gr-top img, .gr1, .gr2, .gr3 {display:none;}\n';
        css += '.gr-top, .bottom, a.external:after {display:none;}\n';
        css += '.gr-box br{display:none;}\n';
        css += 'a{text-decoration:none; font-weight:normal;}\n';
        css += '.external{display:block;}\n\n';
        
        css += '/* Journal Box */\n';
        css += '.gr-box{\n';
        css += 'z-index:99!important;\n'
        css += 'line-height:1.1em!important;\n'
        css += 'font-family:' + $scope.form.button.font + ';\n';
        css += 'text-align:center;\n';
        css += 'font-size:' + $scope.form.button.fontSize + 'px;\n';
        css += '}\n\n';

        var top = $scope.form.topMargin;

        css += '.gr-body{\n';
        css += 'max-width:' + $scope.form.maxWidth + 'px;\n';
        css += 'margin:' + top + 'px auto 0\n';
        css += '}\n\n';

        var num_cols = 2;
        
        css += '/* Main Buttons */\n';
        css += '.button{\n';
        css += 'display:inline-block;\n';
        css += 'margin-right: ' + $scope.form.button.rightMargin + '%;\n';
        css += 'margin-bottom: ' + $scope.form.button.bottomMargin + 'px;\n';
        css += 'width: ' + ((100 - ($scope.form.button.rightMargin * num_cols) )/num_cols)+ '%;\n';
        // css += 'color: #' + $scope.form.button.color + '!important;\n';
        // css += 'background: #' + $scope.form.button.background + ';\n';
        css += '-webkit-border-radius:' + $scope.form.button.radius + 'px;\n';
        css += '-moz-border-radius:' + $scope.form.button.radius + 'px;\n';
        css += 'border-radius:' + $scope.form.button.radius + 'px;\n';
        css += 'padding:' + $scope.form.button.padding + 'px 0px;\n';
        css += 'font-style: ' + italic + ';\n';
        css += 'font-weight: ' + bold + '!important;\n';
        css += 'letter-spacing: ' + letter_spacing + ';\n';
        if ($scope.form.includeTransitions){
            css += 'transition:all 0.2s;\n';
        }
        css += '}\n\n';


        // css += '.long{\n';
        // css += 'width: ' + (100 - value('sideMargin') ) + '%;\n';
        // css += '}\n\n';

        // css += '.button:hover{\n';
        // css += 'color: #' + value('buttonHoverColor') + '!important;\n';
        // css += 'background: #' + value('buttonHoverBackground') + ';\n';
        // css += '}\n\n';
        
        // css += '/* Button Arrows */\n';
        // css += '.button span{\n';
        // css += 'display:none;\n';
        // css += 'font-size:0.85em;\n';
        // css += '}\n\n';
        
        // css += '.button:hover span{display:inline;}\n\n';

        return css;
    }



});