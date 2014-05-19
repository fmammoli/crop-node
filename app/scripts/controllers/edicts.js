'use strict';

angular.module('cropNodeApp')
  .controller('EdictsCtrl', function ($scope, $modal, Edicts) {

    $scope.edicts = [];

    $scope.open = function(){
      var modalInstance = $modal.open({
        templateUrl: 'newEdictForm.html',
        controller: 'newEdictCtrl'
      });

      modalInstance.result.then(function(edict){
        $log.info('edict added');
        $log.info(edict);
        $scope.edicts.push(edict);
      });
    };
  });

angular.module('cropNodeApp')
  .controller('newEdictCtrl', function($scope, $modalInstance, $upload, Edicts){
    $scope.edict = {};

    $scope.progress = 0;

    $scope.submittable = false

    $scope.onFileSelect = function($files){
      console.log('files')
      for (var i = 0; i < $files.length; i++) {
        var file = $files[i];
        $scope.upload = $upload.upload({
          url: '/api/edicts',
          file: file
        })
        .progress(function(evt){
          $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
          console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
          /**Fazer com q a progess bar fique vermelha se der errado*/
        })
        .success(function(data, status, headers, config){
          console.log(data);
          $scope.submittable = true;
        })
        .error(function(data, status, header, config){
            $scope.submittable = false;
            console.log(status+" "+data);
          });
      }
    }

    $scope.register = function(form){
      $scope.submitted = true;
      if(form.$valid){
        Edicts.post({
          /*JSON for form data*/
        })
        .then( function(edict) {
          $modalInstance.close(edict);
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
        console.log('ok!');
      }
    }
  });