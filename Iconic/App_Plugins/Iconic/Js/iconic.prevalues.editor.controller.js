﻿angular.module("umbraco").controller("Koben.Iconic.Prevalues.Editor", function ($scope, $http, localizationService, editorService) {
    $scope.submit = function () {

        if ($scope.packageForm.$valid) {
            extractStyles(
                $scope.model.package,
                function () {
                    $scope.analysing = "success";
                    if ($scope.model.saved) {
                        $scope.model.saved();
                    }
                    editorService.close();
                },
                function () {
                    $scope.analysing = "error";
                }
            );

        }
    };

    $scope.cancel = function () {
        if ($scope.model.cancel) {
            $scope.model.cancel();
        }
        editorService.close();

    }

    $scope.toggleOverrideTemplate = function(){
        $scope.model.package.overrideTemplate = !$scope.model.package.overrideTemplate;
    }

    $scope.openCssFilePicker = function () {
        const config = {
            select: function (node) {
                const id = unescape(node.id);
                $scope.model.package.cssfile = id;
                editorService.close();
            }
        };
        openTreePicker(config);

    };

    $scope.openRulesFilePicker = function () {
        const config = {
            select: function (node) {
                const id = unescape(node.id);
                $scope.model.package.sourcefile = id;
                editorService.close();
            }
        };
        openTreePicker(config);
    };

    function openTreePicker(config) {
        const picker = {
            title: "Select file",
            section: "settings",
            treeAlias: "files",
            entityType: "file",
            filter: function (i) {
                if (i.name.indexOf(".min.css") === -1 &&
                    i.name.indexOf(".css") === -1) {
                    return true;
                }
            },
            filterCssClass: "not-allowed",
            close: function () {
                editorService.close();
            }
        };

        var args = _.assign(picker, config);

        editorService.treePicker(args);
    }

    $scope.removeCssFile = function () {
        $scope.model.package.cssfile = null;
    };

    $scope.removeRulesFile = function () {
        $scope.model.package.sourcefile = null;
    };

    function displayError(alias) {
        localizationService.localize(alias).then(function (response) {
            $scope.error = response.value;
        });
    }

    function extractStyles(item, successCallback, errorCallback) {
        $scope.error = null;

        if (!item.selector || item.selector.length <= 0) {
            errorCallback();
            displayError("iconicErrors_selector");
        }

        if (!item.sourcefile) item.sourcefile = item.cssfile;

        $http.get(item.sourcefile).then(
            function (response) {
                item.extractedStyles = [];
                var pattern = new RegExp(item.selector, "g");

                var match = pattern.exec(response.data);
                while (match !== null) {
                    item.extractedStyles.push(match[1]);
                    match = pattern.exec(response.data);
                }

                if (item.extractedStyles.length > 0) {
                    successCallback();
                } else {
                    displayError("iconicErrors_no_rules");
                    errorCallback();
                }
            },
            function (response) {
                displayError("iconicErrors_loadingCss");
                errorCallback();
            }
        );
    }
});