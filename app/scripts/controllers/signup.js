'use strict';

angular.module('cropNodeApp')
  .controller('SignupCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.kinds = ['associacao','cooperativa'];

    $scope.register = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password,
          formalGroup: {
            name: $scope.user.formalGroup.name,
            cnpj: $scope.user.formalGroup.cnpj,
            dap: $scope.user.formalGroup.dap,
            kind: $scope.user.formalGroup.kind,
            address:{
              city: 'a',
              cep: 'a',
              address: 'a',
              state: 'a',
              number: 'a'
            },
            contacts:{
              phone: 'a',
              cel: 'a'
            },
            bank:{
              name: 'a',
              agency: 'a',
              cc: 'a'
            }
          }
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/');
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