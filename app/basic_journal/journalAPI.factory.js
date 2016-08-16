app.factory("JournalAPI", JournalAPI);

JournalAPI.$inject = ['$http'];

/* @ngInject */
function JournalAPI($http) {
    var webSafeFonts = ["georgia", "palatino linotype", "book antiqua", "palatino", "times new roman", "times", "serif", "sans-serif", "cursive", "arial", "helvetica", "comic sans ms", "impact", "lucida sans unicode", "tahoma", "trebuchet ms", "verdana", "geneva", "courier new", "lucida console"];

	var service = {
        saveJournal: saveJournal,
        deleteJournal: deleteJournal,
        getJournals: getJournals,
        getTrashJournals: getTrashJournals
	};
	return service;

	////////////////

    function saveJournal(journal) {
        return $http.post('/src/saveJson.php', journal).then(function(res) {
            console.log(res);
            return res;
        });
    }

    function deleteJournal(id) {
        return $http.post('/src/deleteJournal.php', id).then(function(res) {
            return res;
        });
    }

    function getJournals(username) {
        return $http.get('/src/getJournals.php', {params: {username: username, trash: 0}}).then(function(res) {
            return res.data;
        });
    }

    function getTrashJournals(username) {
        return $http.get('/src/getJournals.php', {params: {username: username, trash: 1}}).then(function(res) {
            return res.data;
        });
    }
    
}

