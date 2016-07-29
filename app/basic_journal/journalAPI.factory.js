app.factory("JournalAPI", JournalAPI);

JournalAPI.$inject = ['$http'];

/* @ngInject */
function JournalAPI($http) {
    var webSafeFonts = ["georgia", "palatino linotype", "book antiqua", "palatino", "times new roman", "times", "serif", "sans-serif", "cursive", "arial", "helvetica", "comic sans ms", "impact", "lucida sans unicode", "tahoma", "trebuchet ms", "verdana", "geneva", "courier new", "lucida console"];

	var service = {
        saveJournal: saveJournal,
        getJournals: getJournals
	};
	return service;

	////////////////

    function saveJournal(form) {
        return $http.post('/src/saveJson.php', form).then(function(res) {
            console.log("saved");
            console.log(res);
            return res;
        });
    }

    function getJournals(username) {
        console.log("getting");
        return $http.get('/src/getJournals.php', {params: {username: username}}).then(function(res) {
            return res.data;
        });
    }
    
}

