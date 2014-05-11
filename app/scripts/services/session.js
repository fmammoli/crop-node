'use strict';

angular.module('cropNodeApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
