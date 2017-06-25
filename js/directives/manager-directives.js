angular.module('appDirectives', [])
    .directive('seriesPanel', function () {
        
        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.scope = {
            title: '@'
        };

        ddo.templateUrl = "partials/series-panel.html";

        return ddo;
});