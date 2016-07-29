app.controller('BasicJournalController', ['$scope', '$http', '$routeParams', '$sce', 'JournalFactory', 'FontFactory', 'JournalAPI', JournalController]);

function JournalController($scope, $http, $routeParams, $sce, JournalFactory, FontFactory, JournalAPI){

    function activate() {
        $scope.form = {}
        $scope.started = false;
        $scope.noJournals = true;
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
        $scope.menu = makeMenu();
        $http.get("/app/basic_journal/data/form.json").success(setUpForm);
        var structs;

        $scope.start = function () {
            $scope.started = true;
        }
        $scope.save = function () {
            $scope.form.name = $scope.name;
            JournalAPI.saveJournal($scope.form);
        }
        $scope.setJournal = function (form) {
            $scope.form = form;
            checkCss();
        }
        $scope.getJournals = function () {
            JournalAPI.getJournals($scope.username).then(
                function onSuccess(response) {
                    if (response.length > 0) {
                        formatJournals(response);
                        $scope.noJournals = false;
                    } else {
                        console.log("You have no journals");
                    }
                },
                function onFailure(info) {
                    console.log(info);
                }
            );            
        }
        $scope.toggle = function (e) {
            console.log(e);
            e = !e;
        }
    }

    activate();
    

    ////////

    function formatJournals(journals) {
        var previews = [];
        for (var i = 0; i < journals.length; i++) {
            var journal = {
                name: journals[i].name,
                journal: JournalFactory.formatJournal(journals[i])
            }
            previews.push(journal);
        }
        $scope.journals = previews;
        console.log($scope.journals);
    }

    function setUpForm(data) {
        $scope.form = data;
        $scope.checkCss = checkCss;
        $scope.allFonts = [
            $scope.form.text.font.family, 
            $scope.form.title.font.family, 
            $scope.form.timestamp.font.family, 
            $scope.form.link.font.family,
            $scope.form.comments.font.family
        ];
        checkCss();
    }

    function checkCss() {
        console.log("checking");
        var fontsToImport = FontFactory.checkFonts($scope.allFonts);
        $scope.fontString = FontFactory.getFontString(fontsToImport);

        var css = JournalFactory.getCss($scope.form);
        $scope.small_css = renderHtml(css);
        $scope.css = renderHtml("<style>" + css + "</style>");
    }

    function makeMenu() {
        var menu = "<div class='menu'>";
        menu += "<a href='url' class='link'>Link</a>";
        menu += "<a href='url' class='link'>Link</a>";
        menu += "<a href='url' class='link'>Link</a>";
        menu += "</div>";
        return menu;
    }

    function renderHtml (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    }
}