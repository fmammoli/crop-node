'use strict';

angular.module('cropNodeApp')
  .factory('Edicts', function (Restangular) {
    return Restangular.all('edicts');
  });
