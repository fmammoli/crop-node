'use strict';

angular.module('cropNodeApp')
  .controller('MembersCtrl', function ($scope, Members) {

    $scope.members = [];

    Members.getList()
      .then(function(members){
        $scope.members = members;
      })
      .catch(function(err){
        console.log(err);
      });
  });
