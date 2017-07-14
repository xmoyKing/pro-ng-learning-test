angular.module("cart", [])
.factory("cart", function () {

    var cartData = [];

    return {
        // 添加指定的产品到购物车，若购物车已包含该产品，则增加数量
        addProduct: function (id, name, price) {
            var addedToExistingItem = false;
            for (var i = 0; i < cartData.length; i++) {
                if (cartData[i].id == id) {
                    cartData[i].count++;
                    addedToExistingItem = true;
                    break;
                }
            }
            if (!addedToExistingItem) {
                cartData.push({
                    count: 1, 
                    id: id, 
                    price: price, 
                    name: name
                });
            }
            console.log(cartData);
        },
        // 删除指定的产品
        removeProduct: function (id) {
            for (var i = 0; i < cartData.length; i++) {
                if (cartData[i].id == id) {
                    cartData.splice(i, 1);
                    break;
                }
            }
        },
        // 返回购物车中所有产品
        getProducts: function () {
            return cartData;
        }
    }
})
// 创建一个购物车结算指令，该指令能在页面中复用
.directive("cartSummary", function (cart) { // 自定义指令需要传入两个参数，一个为指令名称，一个为指令执行时调用的工厂函数
    return { // 返回一个对象，该对象定义了指令的各种属性
        restrict: "E", // 以元素标签的形式调用该指令（可简单的当做是自定义的html标签即可）
        templateUrl: "components/cart/cartSummary.html", // 指定指令的局部视图，即完成后的html元素内容
        controller: function ($scope) { // 指定该指令的局部控制器

            var cartData = cart.getProducts();
            // 计算总价
            $scope.total = function () {
                var total = 0;
                for (var i = 0; i < cartData.length; i++) {
                    total += (cartData[i].price * cartData[i].count);
                }
                return total;
            }
            // 计算产品的总量
            $scope.itemCount = function () {
                var total = 0;
                for (var i = 0; i < cartData.length; i++) {
                    total += cartData[i].count;
                }
                return total;
            }
        }
    };
});

