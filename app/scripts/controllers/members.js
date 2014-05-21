'use strict';

angular.module('cropNodeApp')
  .controller('MembersCtrl', function ($scope, Members, $modal, $log) {

    $scope.members = [];

    Members.getList()
      .then(function(members){
        $scope.members = members;
      })
      .catch(function(err){
        console.log(err);
      });

    $scope.open = function(){
      var modalInstance = $modal.open({
        templateUrl: 'newMemberForm.html',
        controller: 'newMemberCtrl'
      });

      modalInstance.result.then(function(member){
        $log.info('Member added');
        $log.info(member);
        $scope.members.push(member);
      });
    };

    $scope.remove = function(member){
      member.remove()
        .then(function(member){
          $log.info('Member Removed.');
        })
        .catch(function(err){
          console.log(err);
        });
      _.remove($scope.members, {_id:member._id});
    }
  });

angular.module('cropNodeApp')
  .controller('newMemberCtrl', function($scope, $modalInstance, Members){
    $scope.member = {};

    $scope.register = function(form){
      $scope.submitted = true;
      if(form.$valid){
        Members.post({
          name: $scope.member.name,
          email: $scope.member.email,
          cpf: $scope.member.cpf,
          dap: $scope.member.dap,
          rg: $scope.member.rg,
          address:{
            city: 'a',
            cep: 'a',
            address: 'a',
            state: 'a',
            number: 'a'
          },
          contacts:{
            phone: '3923-6892',
            cel: '12 9178-8976'
          },
          bank:{
            name: 'a',
            agency: 'a',
            cc: 'a'
          }
        })
        .then( function(member) {
          // Account created, redirect to home
          $modalInstance.close(member);
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };
  });
