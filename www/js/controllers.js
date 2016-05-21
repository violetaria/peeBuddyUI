angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $cordovaGeolocation, uiGmapIsReady, uiGmapGoogleMapApi) {

 // get position of user and then set the center of the map to that position
  $cordovaGeolocation
    .getCurrentPosition()
    .then(function (position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
      uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = {
          center: {latitude: lat, longitude: long},
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
      }, function(err) {
        // error
      }, function(err) {
        // err
      })
    });

});
