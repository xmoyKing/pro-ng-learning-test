angular.module("sportsStoreAdmin")
.constant("productUrl", "/products/")
.config(function($httpProvider) {
    // 此处通过调用模块的config方法改变所有ajax请求的默认设置
    // 并且声明$httpProvider依赖
    $httpProvider.defaults.withCredentials = true;
})
.controller("productCtrl", function ($scope, $resource, productUrl) {

    // 本控制器最关键处：创建提供权限访问RESTful API的访问对象，即productsResource
    // $resource方法的第一个参数定义了URL格式，其中:id与第二个参数映射
    // 即：若数据对象中有id属性，则将其添加到请求url中
    // 返回的productsResource对象有CRUD的各种方法，用于操作服务器数据
    $scope.productsResource = $resource(productUrl + ":id", { id: "@id" });
    // 获取所有产品方法
    $scope.listProducts = function () {
        $scope.products = $scope.productsResource.query();
    }

    $scope.deleteProduct = function (product) {
        product.$delete().then(function () {
            $scope.products.splice($scope.products.indexOf(product), 1);
        });
    }

    $scope.createProduct = function (product) {
        new $scope.productsResource(product).$save().then(function (newProduct) {
            $scope.products.push(newProduct);
            $scope.editedProduct = null;
        });
    }

    $scope.updateProduct = function (product) {
        product.$save();
        $scope.editedProduct = null;
    }

    $scope.startEdit = function (product) {
        $scope.editedProduct = product;
    }

    $scope.cancelEdit = function () {
        $scope.editedProduct = null;
    }
    // 每次进入该控制器（即切换到控制器所在的视图时）立即调用获取所有产品
    $scope.listProducts();
});
