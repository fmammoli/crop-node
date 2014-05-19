'use strict';

angular.module('cropNodeApp')
  .factory('Members', function (Restangular) {
    return Restangular.all('members');
  });
