angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $cordovaGeolocation, uiGmapIsReady, uiGmapGoogleMapApi, LocationService) {

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
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          events: {
            click: function(){
              console.log(this);
              this.window.show = false;
            }
          }
        };

        LocationService.getLocations(lat,long).then(function(markers){

          $scope.map.markers = markers.locations;

          $scope.map.markersEvents = {
            click: function (marker, eventName, model, arguments) {
              console.log('Marker was clicked (' + marker + ', ' + eventName);//+', '+mydump(model, 0)+', '+mydump(arguments)+')');

              $scope.map.window.model = model;
              $scope.map.window.title = model.title;
              $scope.map.window.show = true;
            }
          };

          $scope.map.window = {
            marker: {},
            show: false,
            closeClick: function () {
              this.show = false;
            },
            options: {}, // define when map is ready
            title: ''
          };

          $scope.map.events = {
            click: function(){
              this.window.show = false;
            }
          };

          $scope.onMarkerClicked = function (m) {
            //this.windowOptions = !this.windowOptions;
            console.log('Marker was clicked');
            console.log(m);
          };

          $scope.closeClick = function () {
            this.window = false;
          };


        });

      }, function(err) {
        // error
      }, function(err) {
        // err
      })
    });

})
.controller('InfoWindowCtrl',function($scope){
    $scope.rate = function(rating){
      console.log("you clicked = " + rating);
    };
});
