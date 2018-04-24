var app = angular.module('NYCBikes', []);
app.controller('bikeController', function($scope, $http) {
    var request = $http.get("https://feeds.citibikenyc.com/stations/stations.json");
    request.success(function(data) {
        $scope.data = data.stationBeanList;
    });
    request.error(function(data) {
        console.log('err');
    });
});

var flightApp = angular.module('Flights', []);
flightApp.controller('flightsController', function($scope, $http) {
    console.log("js loaded");
    // var request = $http.get("/airlineData");
    // request.success(function(data) {
    //     $scope.airlineData = JSON.parse(data);
    //     // console.log(data)
    // });
    // request.error(function(data){
    //     console.log('Error pulling airline data.');
    // });



  // $scope.searchName = "";
  // $scope.showFamilyTable = false;
  // $scope.showNoFamilyMessage = true;
  $scope.search = function (){
    console.log('clicked');
    console.log($scope.searchData);
    if ($.isEmptyObject($scope.searchData)) {
      $scope.errorMsg = "Must add at least one filter!";
      $scope.showError = true;
      return;
    } else if (!$scope.searchData.type) {
      $scope.errorMsg = "Must select search type!";
      $scope.showError = true;
    } else {
      $scope.errorMsg = "";
      $scope.showLoading = true;
      $scope.showError = false;
    }
    var typeUrlMap = {
      'performance': '/performanceData',
      'avgArrDelay': '/avgArrDelayData',
      'avgDepDelay': '/avgDepDelayData'
    }
    var req = {
     method: 'POST',
     url: typeUrlMap[$scope.searchData.type],
     data: $scope.searchData
    }
    $http(req).then(function(res) {
      $scope.performanceData = JSON.parse(res.data);
      // if ($.isEmptyObject($scope.familydata)) {
      //   $scope.showNoFamilyMessage = true;
      //   $scope.showFamilyTable = false;
      // } else {
      //   $scope.showNoFamilyMessage = false;
      //   $scope.showFamilyTable = true;
      // }
      // console.log($scope.familydata);
      $scope.showLoading = false;
    });
  };
});


var airlineApp = angular.module('Airlines', []);
airlineApp.controller('airlineController', function($scope, $http) {
    console.log("js loaded");
    var request = $http.get("/airlineData");
    request.success(function(data) {
        $scope.airlineData = JSON.parse(data);
        console.log(data)
    });
    request.error(function(data) {
        console.log('Error pulling airline data.');
    });
});


var airportApp = angular.module('Airports', []);
airportApp.controller('airportController', function($scope, $http) {
    console.log("js loaded");
    var request = $http.get("/airportData");
    request.success(function(data) {
        $scope.airportData = JSON.parse(data);
        console.log(data)
    });
});
