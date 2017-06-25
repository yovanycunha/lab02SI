angular.module("seriesmanager",[])
    .service('dataProvider', function($http){
        
        return{
            getSeriesByTitle: function(serieTitle){
                return $http.get("https://omdbapi.com/?s=" + serieTitle + "&type=series&apikey=93330d3c");
            },
            searchSerieByID: function(serieID){
                return $http.get("https://omdbapi.com/?i=" + serieID + "&type=series&apikey=93330d3c");
            }
        }
    });