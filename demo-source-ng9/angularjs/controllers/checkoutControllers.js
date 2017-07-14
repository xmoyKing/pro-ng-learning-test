angular.module("sportsStore")
.controller("cartSummaryController", function ($scope, cart) {
    // 从自定义cart服务中获取已加入购物车的产品
    $scope.cartData = cart.getProducts();
    // 计算总价
    $scope.total = function () {
        var total = 0;
        for (var i = 0; i < $scope.cartData.length; i++) {
            total += ($scope.cartData[i].price * $scope.cartData[i].count);
        }
        return total;
    }
    // 从购物车中移除指定id的产品
    $scope.remove = function (id) {
        cart.removeProduct(id);
    }
});
