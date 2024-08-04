angular.module("umbraco").directive("iconicIcon", function() {
    var controller = function controller($scope) {
        $scope.$watch("icon", updateTemplate);
        $scope.$watch("package", updateTemplate, true);



        function updateTemplate() {
            if ($scope.package && $scope.icon) {
                if ($scope.package && $scope.package.backofficeTemplate) {
                    $scope.template = $scope.package.backofficeTemplate.replace(
                        "{icon}",
                        $scope.icon
                    );
                } else {
                    $scope.template = $scope.package.template.replace(
                        "{icon}",
                        $scope.icon
                    );
                }
            }
        }
    };

    var link = function(scope, el, att) {
        scope.$watch("package", function() {
            el.html(scope.template);
        }, true);

        scope.$watch("icon", function() {
            el.html(scope.template);
            el.attr("title", scope.icon);
        });
    };

    return {
        restrict: "E",
        scope: {
            icon: "=icon",
            package: "=package"
        },
        controller: controller,
        link: link
    };
});