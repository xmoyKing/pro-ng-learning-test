/// <reference path="../angular.js" />

angular.module("sportsStore") // 此处仅是获取sportsStore模块（已在其他文件中初始化了）
    .constant("productListActiveClass", "btn-primary") // 此处定义常量productListActiveClass，表示选中项的class名称
    .constant("productListPageCount", 3) // 此处定义常量productListPageCount，表示分页时每页产品的数量
    .controller("productListCtrl", function ($scope, $filter, // 定义产品列表控制器，在函数参数中先指定依赖的模块或服务或常量
        productListActiveClass, productListPageCount) {

        var selectedCategory = null; // 表示当前所选择的产品类别

        $scope.selectedPage = 1; // 表示当前所在页数
        $scope.pageSize = productListPageCount; // 表示每页产品数量

        // 视图上绑定分类列表项函数
        $scope.selectCategory = function (newCategory) {
            selectedCategory = newCategory;
            $scope.selectedPage = 1;
        }
        // 选定页数的函数
        $scope.selectPage = function (newPage) {
            $scope.selectedPage = newPage;
        }
        // 过滤分类
        $scope.categoryFilterFn = function (product) {
            return selectedCategory == null ||
                product.category == selectedCategory;
        }
        // 确定分类的class
        $scope.getCategoryClass = function (category) {
            return selectedCategory == category ? productListActiveClass : "";
        }
        // 确定当前页的class
        $scope.getPageClass = function (page) {
            return $scope.selectedPage == page ? productListActiveClass : "";
        }
    });