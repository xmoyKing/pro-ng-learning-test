angular.module("sportsStore") // 此处仅是获取sportsStore模块（已在其他文件中初始化了）
.controller("sportsStoreCtrl", function ($scope) { // 创建名为sportsStoreCtrl控制器
    // 在scope上定义一个data对象作为模型，products数组表示所有的产品
    // 每一个产品有独立的名称、价格以及描述，所属的分类
    $scope.data = {
        products: [ // 此处的products先模拟4个产品用于自测（以后可使用ajax从服务器获取产品列表）
            {
                name: "Product #1", description: "A product",
                category: "Category #1", price: 100
            },
            {
                name: "Product #2", description: "A product",
                category: "Category #1", price: 110
            },
            {
                name: "Product #3", description: "A product",
                category: "Category #2", price: 210
            },
            {
                name: "Product #4", description: "A product",
                category: "Category #3", price: 202
            }]
    };
});