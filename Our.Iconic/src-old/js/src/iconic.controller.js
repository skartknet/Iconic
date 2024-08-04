angular.module("umbraco").controller("Our.Iconic.Controller", [
  "$scope",
  "$http",
  "assetsService",
  "umbRequestHelper",
  "editorService",
  function ($scope, $http, assetsService, umbRequestHelper, editorService) {
    $scope.pckg;
    $scope.modelIsValid = false;
    $scope.icon;

    $scope.selectIcon = function (model) {
      if (model.icon && model.packageId) {
        $scope.pckg = loadPackage(
          $scope.model.config.packages,
          model.packageId
        );
        $scope.model.value = model;
        $scope.modelIsValid = true;
      } else {
        $scope.modelIsValid = false;
      }
    };

    $scope.removeIcon = function () {
      $scope.model.value = null;
      $scope.modelIsValid = false;
    };

    $scope.overlay = {
      view: umbRequestHelper.convertVirtualToAbsolutePath(
        "~/App_Plugins/Iconic/Views/iconic.dialog.html"
      ),
      title: "Select an icon",
      size: "small",
      iconsLimit: 1,
      filterIcons: true,
      pickerConfig: $scope.model.config,
      submit: function (icons) {
        $scope.selectIcon(icons[0]);
        editorService.close();
      },
      cancel: function () {
        editorService.close();
      },
    };

    $scope.openOverlay = function () {
      if ($scope.model.value) {
        $scope.overlay.pickerIcons = [$scope.model.value.icon];
        $scope.overlay.pickerPackageId = $scope.model.value.packageId;
      } else {
        $scope.overlay.pickerIcons = null;
        $scope.overlay.pickerPackageId = null;
      }

      editorService.open($scope.overlay);
    };

    function loadPackage(packages, packageId) {
      return packages.find(function (el) {
        return el.id === packageId;
      });
    }

    function initPicker() {
      $scope.loading = true;
      if (!angular.isObject($scope.model.value)) {
        $scope.model.value = undefined;
      }

      if (
        $scope.model.value &&
        $scope.model.value.packageId &&
        $scope.model.value.icon
      ) {
        $scope.pckg = loadPackage(
          $scope.model.config.packages,
          $scope.model.value.packageId
        );
        if ($scope.pckg) {
          loadCss($scope.pckg.cssfile);
          $scope.modelIsValid = true;
        }
      } else {
        $scope.modelIsValid = false;
      }
      $scope.loading = false;
    }

    function loadCss(uri) {
      var cssUri = isExternalUri(uri)
        ? uri
        : umbRequestHelper.convertVirtualToAbsolutePath(
            "~/" + uri.replace(/wwwroot\//i, "")
          );

      $http.get(cssUri).then(
        function (response) {
          assetsService.loadCss(cssUri);
        },
        function (response) {
          displayError("iconicErrors_loading");
        }
      );
    }

    function isExternalUri(uri) {
      return uri.indexOf("://") > -1;
    }

    initPicker();
  },
]);
