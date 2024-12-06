var app = angular.module('myApp', ['ngMaterial', 'ngMessages'])

// app.run(function ($rootScope, $document) {
//     $rootScope.previousURL = document.URL;

// });

// app.controller('Login', function ($window, $http, $scope, $rootScope) {

//     $scope.loginClick = function () {

//         var url = "/login";
//         $http.post(url, $scope.user)
//             .then(
//             function (response) {   //Success code (200)

//                 $scope.IsVisible = false;
//                 $window.location.href = $rootScope.previousURL;

//             }, function (response) {    //Error code (300)

//                 $scope.IsVisible = true;
//             }
//             );

//     }

// });

// app.controller('Register', function ($window, $http, $scope, $rootScope) {

//     $scope.registerClick = function () {

//         //$scope.user.dob = String($scope.user.dob);    //To convert the date object into string

//         var url = "/register";
//         $http.post(url, $scope.user)
//             .then(
//             function (response) {   //Success code (200)

//                 $scope.IsVisible_Register = false;
//                 $window.location.href = $rootScope.previousURL;

//             }, function (response) {    //Error code (300)

//                 $scope.IsVisible_Register = true;
//             }
//             );
//     }
// });

// app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

//     $routeProvider.when('/register',
//         {
//             templateUrl: 'auth/register.html',
//             controller: 'Register'
//         });
//     $routeProvider.when('/login',
//         {
//             templateUrl: 'auth/login.html',
//             controller: 'Login'
//         });

//     //$routeProvider.otherwise({ redirectTo: '/' });

//     //console.log($window.history);
//     $locationProvider.html5Mode({ enabled: true, requireBase: false });
// }]);


// app.directive('back', function () {             //Go back to original url when modal is cancelled
//     return {
//         restrict: 'E',
//         replace: true,
//         template: '<div></div>',
//         link: function ($scope, element, attributes) {
//             $scope.closeModal = function () {

//                 $('body').removeClass('modal-open');
//                 $('.modal-backdrop').remove();
//                 history.back();

//                 //scope.$apply();
//             }
//         }
//     }
// });

app.directive('compareTo', function () {        //Password and confirm password
    return {
        require: "ngModel",
        scope: {
            compareTolValue: "=compareTo"
        },
        link: function (scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function (modelValue) {

                return modelValue == scope.compareTolValue;
            };

            scope.$watch("compareTolValue", function () {
                ngModel.$validate();
            });
        }
    }
});