angular.module("umbraco")
    .controller("Our.Iconic.Dialog.Controller", ['$scope', '$http', 'assetsService', 'umbRequestHelper', function($scope, $http, assetsService, umbRequestHelper) {

        $scope.packages = $scope.model.pickerConfig.packages;
        $scope.pckgselected = null;
        $scope.iconsSize = 16;
        $scope.styles = [];
        $scope.loading = false;
        $scope.icons = [];
        $scope.value = angular.copy($scope.model.pickerIcons, []);

        $scope.loadPackage = function(pckg) {

            if (pckg == null) return;

            $scope.loading = true;

            var cssUri = isExternalUri(pckg.cssfile) ? pckg.cssfile :
                umbRequestHelper.convertVirtualToAbsolutePath('~/' + pckg.cssfile.replace(/wwwroot\//i, ''));

            $http.get(cssUri).then(
                function(response) {
                    assetsService.loadCss(cssUri)
                        .then(function() {
                            $scope.loading = false;
                            $scope.pckgselected = pckg;
                            $scope.icons = getIcons();
                        });
                },
                function(response) {
                    displayError("iconicErrors_loading");
                }
            );
        }

        function getIcons() {
            if ($scope.pckgselected == null) return [];
            if ($scope.model.filterIcons) {
                if ($scope.pckgselected.filteredIcons && $scope.pckgselected.filteredIcons.length > 0) {
                    return $scope.pckgselected.filteredIcons;
                } else {
                    return $scope.pckgselected.extractedStyles;
                }
            } else {
                return $scope.pckgselected.extractedStyles;
            }
        }

        $scope.selectIcon = function(icon) {
            if (!icon) return;

            var iconModel = new Icon(icon, $scope.pckgselected.id);

            if ($scope.value && $scope.value.length > 0) {
                var existingIcon = $scope.value.find(x => x.icon == iconModel.icon && x.pickerPackageId == iconModel.packageId)
                if (existingIcon) {
                    $scope.value.slice($scope.value.indexOf(iconModel), 1);
                    return;
                }
            }

            if ($scope.model.iconsLimit === 1) {
                $scope.value = [];
                $scope.value.push(iconModel);
                $scope.submit();
            }

            if (!$scope.model.iconsLimit || $scope.value.length < $scope.model.iconsLimit) {
                $scope.value.push(iconModel.icon);
            }

        }

        $scope.submit = function() {
            $scope.model.submit($scope.value); //it passes the model back to the overlay caller            
        }

        $scope.cancel = function() {
            $scope.model.cancel();
        }

        $scope.isInSelectedIcons = function(icon) {
            if ($scope.value) {
                return $scope.value.find((el) => el === icon && $scope.pckgselected.id === $scope.model.pickerPackageId) != null;
            }

            return false;
        }

        function initOverlay() {

            var pckg = $scope.packages.find(el => el.id == $scope.model.pickerPackageId);
            if (!pckg && $scope.packages) {
                pckg = $scope.packages[0];
            }

            if (angular.isObject(pckg)) {
                $scope.loadPackage(pckg);
            }
        }

        function isExternalUri(uri) {
            return uri.indexOf("://") > -1;
        }

        initOverlay();

    }]);