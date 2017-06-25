angular.module("seriesmanager")
    .controller("managerCtrl", function ($scope, dataProvider) {
        $scope.title = "Helping Mafraboy"
        $scope.series = [];
        $scope.watchlist = [];
        $scope.mySeries = [];
        $scope.searched = false;
        $scope.badSearch = false;
        $scope.remotionResponse = "";
        $scope.serieToBeEdited;


        $scope.searchSeriesByTitle = function (name) {
            $scope.clearSearch();
            $scope.searchedTitle = name;
            $scope.series = [];
            var promisse = dataProvider.getSeriesByTitle(name);
            promisse.then(function (response) {
                if (response.data.Response == 'True') {
                    $scope.searchFullSeriesById(response.data.Search);
                }
                else{
                    $scope.badSearch = true;
                }
            }).catch(function (error) {
                console.log(error);
            });                    
        };

        $scope.searchFullSeriesById = function (arrayOfResearchedSeries) {
            $scope.return = [];
            for (var i = 0; i < arrayOfResearchedSeries.length; i++) {
                fullSerie = $scope.searchSerieByID(arrayOfResearchedSeries[i].imdbID);
            };
        };

        $scope.searchSerieByID = function (serieID) {
            var prom = dataProvider.searchSerieByID(serieID);
            prom.then(function (response) {
                $scope.series.push(response.data);
            }).catch(function (error) {
                console.log(error);
            });
        };
        

        $scope.addSerieToWatchlist = function(newSerieInWatchlist) {
            if (!$scope.isThisSerieInWatchlist(newSerieInWatchlist)) {
                $scope.watchlist.push(newSerieInWatchlist);
            }
        };

        $scope.addSerieToMySeries = function(newSerieInMySeries) {
            if (!$scope.isThisSerieInMySeries(newSerieInMySeries)) {
                $scope.mySeries.push(newSerieInMySeries);                
            } else {
                alert("This serie already is in My Series list!")
            }
        };

        $scope.clearSearch = function () {
            $scope.series = [];
            $scope.searched = false;
            $scope.badSearch = false;
        };

        $scope.removeSerie = function (serieToBeRemoved) {

            if ($scope.deleteConfirmation(serieToBeRemoved)) {
                var serieIndex = $scope.searchSerieIndex(serieToBeRemoved);
                if (serieIndex !== -1) {
                    $scope.mySeries.splice(serieIndex, 1);
                    $scope.remotionResponse = "";
                    alert("The serie was removed!")
                }
            }
        };

        $scope.searchSerieIndex = function (searchedSerie) {
            var serieId = searchedSerie.imdbID;
            var seriesArray = $scope.mySeries;
            for (var i = 0; i < seriesArray.length; i++) {
                if (serieId === seriesArray[i].imdbID) {
                    return i;
                }                
            }
            return -1;
        };

        $scope.isThisSerieInMySeries = function (serie) {
            var serieId = serie.imdbID;
            var seriesArray = $scope.mySeries;
            for (var i = 0; i < seriesArray.length; i++) {
                if (serieId === seriesArray[i].imdbID) {
                    return true;
                }
            }
            return false;
        };


        $scope.deleteConfirmation = function (serie) {
            $scope.remotionResponse = prompt("Type Y to remove " + serie.Title);
            if ($scope.remotionResponse === 'Y') {
                return true;
            }
            return false;
        };

        $scope.isThisSerieInWatchlist = function(serieSearched) {
            var serieId = serieSearched.imdbID;
            var seriesArray = $scope.watchlist;
            for (var i = 0; i < seriesArray.length; i++) {
                if (serieId === seriesArray[i].imdbID) {
                    return true;
                }
            }
            return false;
        }

        $scope.editThisSerie = function (editedSerie) {
            $scope.serieToBeEdited = editedSerie;
        }

        $scope.addLastEpWatched = function (lastEp) {
            $scope.serieToBeEdited.lastEp = lastEp;
        }

        $scope.addMyRate = function (myRate) {
            $scope.serieToBeEdited.myRate = myRate;
        };

        $scope.saveEditedSerieInMySeries = function (serieUpdated) {
            //isso funciona pq a serie atualizada tem o msm ID da antiga
            var oldSerieIndex = $scope.searchSerieIndex(serieUpdated);
            $scope.mySeries.splice(oldSerieIndex, 1, serieUpdated);
        }

        
});