angular.module("umbraco").controller("Our.Iconic.Prevalues.Packages", [
  "$scope",
  "$http",
  "editorService",
  "umbRequestHelper",
  function ($scope, $http, editorService, umbRequestHelper) {
    $scope.overrideBgTemplate = false;

    if (!angular.isArray($scope.model.value)) $scope.model.value = [];

    $scope.createNewPackage = function () {
      var newItem = new Package();

      editorService.open({
        title: "Create new package",
        view: umbRequestHelper.convertVirtualToAbsolutePath(
          "~/App_Plugins/Iconic/Views/iconic.edit.dialog.html"
        ),
        saved: function () {
          $scope.model.value.push(angular.copy(newItem));
        },
        package: newItem,
        size: "medium",
      });
    };

    $scope.editPackage = function (pkg) {
      editorService.open({
        title: "Edit package",
        view: umbRequestHelper.convertVirtualToAbsolutePath(
          "~/App_Plugins/Iconic/Views/iconic.edit.dialog.html"
        ),
        package: pkg,
        size: "medium",
      });
    };

    $scope.removeItem = function (index) {
      $scope.model.value.splice(index, 1);
    };

    $scope.toggleItemDisplay = function (item) {
      if ($scope.selectedItem === item) {
        $scope.selectedItem = null;
      } else {
        $scope.selectedItem = item;
      }
    };
  },
]);
