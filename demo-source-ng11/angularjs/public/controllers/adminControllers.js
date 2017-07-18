angular.module("sportsStoreAdmin") // 获取管理模块
.constant("authUrl", "/users/login") // 注意此处的接口是由dpd API中定义的
.constant("ordersUrl", "/orders")
.controller("authCtrl", function ($scope, $http, $location, authUrl) {
    // 登录验证控制器
    $scope.authenticate = function (user, pass) {
        $http.post(authUrl, {
            username: user,
            password: pass
        }, {
            withCredentials: true
        }).success(function (data) {
            $location.path("/main");
        }).error(function (error) {
            $scope.authenticationError = error;
        });
    }
})
.controller("mainCtrl", function ($scope) {
    // 主页面控制器，其实就是可以切换产品/订单的一个tab
    // 定义screen分别有产品和订单
    $scope.screens = ["Products", "Orders"];
    $scope.current = $scope.screens[0];
    // 切换操作
    $scope.setScreen = function (index) {
        $scope.current = $scope.screens[index];
    };
    // 获取对应screen界面
    $scope.getScreen = function () {
        return $scope.current == "Products"
            ? "/views/adminProducts.html" : "/views/adminOrders.html";
    };
})
.controller("ordersCtrl", function ($scope, $http, ordersUrl) {
    // 订单管理页面控制器
    // 此处的withCredemtials属性确保浏览器包含安全的cookie并随ajax提交到服务器端
    $http.get(ordersUrl, { withCredentials: true })
        .success(function (data) {
            $scope.orders = data;
        })
        .error(function (error) {
            $scope.error = error;
        });

    $scope.selectedOrder;
    // 设置当前选定的订单
    $scope.selectOrder = function (order) {
        $scope.selectedOrder = order;
    };
    // 计算订单产品数量总和
    $scope.calcTotal = function (order) {
        var total = 0;
        for (var i = 0; i < order.products.length; i++) {
            total +=
                order.products[i].count * order.products[i].price;
        }
        return total;
    }
});
