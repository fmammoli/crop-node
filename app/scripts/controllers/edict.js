'use strict';

angular.module('cropNodeApp')
  .controller('EdictCtrl', function ($scope, $http, $modal) {
    $scope.open = function(){
      var modalInstance = $modal.open({
        templateUrl: 'newEdictSaleForm.html',
        controller: 'newEdictSaleCtrl'
      });
    };
  });

angular.module('cropNodeApp')
  .controller('newEdictSaleCtrl', function ($scope) {

  });
