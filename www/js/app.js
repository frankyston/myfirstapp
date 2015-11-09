// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ngCordova', 'uiGmapgoogle-maps'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

app.controller("appCtrl", function($scope, $log, $cordovaCamera, $cordovaGeolocation) {
  $scope.imagem = "http://placehold.it/300x300";
  $scope.geolocalizacao = {
    value: false
  }

  $scope.capturar = function() {
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG
    };
    $cordovaCamera.getPicture(options).then(function(imagemUrl) {

      $log.info(imagemUrl);

      $scope.imagem = "data:image/jpeg;base64," + imagemUrl;

    }, function(error) {
      alert("Erro ao capturar.");
    });

    if($scope.geolocalizacao.value === true){
      var options_geo = { timeout: 10000, enableHighAccuracy: false }
      $cordovaGeolocation.getCurrentPosition(options_geo).then(function(posicao){
        var lat = posicao.coords.latitude;
        var log = posicao.coords.longitude;
        $scope.map = { id: 1, center: { latitude: lat, longitude: log }, zoom: 16 };
        $scope.marker = {
          id: 1,
          coords: {
            longitude: lat,
            latitude: log
          },
          options: {
              icon: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Marker-Outside-Chartreuse.png"
          },
          icon: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Marker-Outside-Chartreuse.png"
        };
        $scope.showMap = {'display':'block'};
      }, function(error){
        alert("Erro ao pegar a localização.");
      });
    }else{
      alert("Erro ao pegar localização");
    }
  };
});
