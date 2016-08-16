app.controller('BasicJournalController', ['$scope', '$http', '$routeParams', '$sce', 'JournalFactory', 'FontFactory', 'JournalAPI', JournalController]);

function JournalController($scope, $http, $routeParams, $sce, JournalFactory, FontFactory, JournalAPI){

    function activate() {
        $scope.sidebarCollapsed = false;
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
            if (notEmpty($scope.username)){
                if (!notEmpty($scope.name)) {
                    $scope.name = "Untitled Skin";
                }
                var postData = {
                    user: $scope.username,
                    name: $scope.name,
                    journal: $scope.form
                }
                JournalAPI.saveJournal(postData).then(
                    function onSuccess(response) {
                        $scope.message = "Successfully saved " + $scope.name;
                    },
                    function onFailure(info) {
                        $scope.message = info;
                    }
                );
            } else {
                $scope.message = "Please enter a username.";
            }
        }
        $scope.setJournal = function (form) {
            $scope.form = form;
            console.log("setting");
            console.log(form);
            checkCss();
        }
        $scope.getJournals = function () {
            if (notEmpty($scope.username)){
                JournalAPI.getJournals($scope.username).then(
                    function onSuccess(response) {
                        $scope.searched = true;
                        if (response.length > 0) {
                            console.log(response);
                            $scope.journals = formatJournals(response);
                        } else {
                            $scope.message = "You have no journal skins saved on this site.";
                        }
                    },
                    function onFailure(info) {
                        console.log(info);
                    }
                );   
            } else {
                $scope.message = "Please enter a username.";
            }
                     
        }
        $scope.getTrashJournals = function () {
            if (notEmpty($scope.username)){
                JournalAPI.getTrashJournals($scope.username).then(
                    function onSuccess(response) {
                        if (response.length > 0) {
                            console.log(response);
                            $scope.trashJournals = formatJournals(response);
                        } else {
                            $scope.message = "You have no skins in trash.";
                            emptyJournals();
                        }
                    },
                    function onFailure(info) {
                        console.log(info);
                    }
                );   
            } else {
                $scope.message = "Please enter a username.";
            }        
        }
        $scope.deleteJournal = deleteJournal;
        $scope.toggle = function (e) {
            console.log(e);
            e = !e;
        }
        $scope.setBackground = function (e) {
            console.log(e);
            return "background: " + e.color + " url('" + e.image + "');"
        }
        $scope.changeStyle = function (e) {
            console.log(e);
            e = !e;
            checkCss();
        }
        $scope.hi = function() {
            console.log("hi");
        }
    }

    activate();
    

    ////////

    function emptyJournals() {
        $scope.journals = [];
        $scope.trashJournals = [];
        $scope.noJournals = true;
    }

    function deleteJournal(id) {
        console.log("Deleting journal" + id);
        JournalAPI.deleteJournal(id).then(
            function onSuccess(response) {
                console.log(response);
            },
            function onFailure(info) {
                console.log(info);
            }
        );   
    }

    function notEmpty(str) {
        return str && str.trim();
    }

    function formatJournals(journals) {
        var previews = [];
        for (var i = 0; i < journals.length; i++) {
            var row = journals[i];
            var journal = {
                id: row.id,
                name: row.name,
                form: row.journal,
                user: row.user,
                box: { background: JournalFactory.getBackground(row.journal.box.bg) },
                top: { background: JournalFactory.getBackground(row.journal.top.bg) },
                text: { background: JournalFactory.getBackground(row.journal.text.bg) },
                bottom: { background: JournalFactory.getBackground(row.journal.bottom.bg) }
            }
            previews.push(journal);
        }
        return previews;
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