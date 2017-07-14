angular.module("sportsStore")
    .constant("dataUrl", "products.json") // 定义常量，此处的products.json可以改为某个url接口
    .controller("sportsStoreCtrl", function ($scope, $http, dataUrl) {

        $scope.data = {};
        // 使用http服务将模型加载到应用内
        $http.get(dataUrl)
            .success(function (data) {
                $scope.data.products = data;
            })
            .error(function (error) { // 当加载数据出错时显示提示信息
                $scope.data.error = error;
            });
    });