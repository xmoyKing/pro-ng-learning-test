angular.module("sportsStore")
    .constant("dataUrl", "/products") // 修改接口地址，使用dpd提供的接口
    .constant("orderUrl", "/orders")
    .controller("sportsStoreCtrl", function($scope, $http, $location,
        dataUrl, orderUrl, cart) {

        $scope.data = {};

        $http.get(dataUrl)
            .success(function(data) {
                $scope.data.products = data;
            })
            .error(function(error) {
                $scope.data.error = error;
            });
        // 同时我们添加了发送订单功能，即将购物车内的物品
        $scope.sendOrder = function(shippingDetails) {
            var order = angular.copy(shippingDetails);
            order.products = cart.getProducts();
            $http.post(orderUrl, order)
                .success(function(data) { //成功下单后获取服务器响应的数据
                    $scope.data.orderId = data.id; // 将响应中的id设置到全局作用域的订单id
                    cart.getProducts().length = 0; // 然后清空购物车
                })
                .error(function(error) {
                    $scope.data.orderError = error;
                }).finally(function() {
                    $location.path("/complete"); // 最后使用ng的$location而不是js原生的location将路径跳转到完成视图
                });
        }
    });