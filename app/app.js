var app = angular.module('myApp', ['ngRoute', 'ngSanitize', 'ui.router', 'angularSpectrumColorpicker']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/resources', {
        	templateUrl: 'app/home/home.html',
            controller: 'MainController'
        })
        .when('/resources/profile', {
        	templateUrl: 'app/profile_directory/profile_directory.html',
            controller: 'ProfileDirectoryController',
        })
        .when('/resources/journal', {
            templateUrl: 'app/basic_journal/basic_journal.html',
            controller: 'BasicJournalController',
        })
    	.otherwise({
            redirectTo: '/'
        });
}]);

// app.config(function($stateProvider, $urlRouterProvider) {
    
//     $urlRouterProvider.otherwise('/home');
    
//     $stateProvider
        
//         // HOME STATES AND NESTED VIEWS ========================================
//         .state('directory', {
//             templateUrl: 'app/profile_directory/tab.html',
//             controller: 'ProfileDirectoryController'
//         })

        
// });
