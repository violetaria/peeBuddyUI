angular.module('starter.services', [])

.factory('LocationService',function($q,$http,SERVER){

  function getLocations(lat,lng){
    var deferred = $q.defer();

    $http({
      method: 'GET',
      url: SERVER.url + '/api/v1/locations?lat='+lat+"&lng="+lng,
//      headers: // SERVER.CONFIG.headers
    })
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(data,status){
        deferred.reject(data);
      });

    return deferred.promise;
  }

  return {
    getLocations: getLocations
  };
});
