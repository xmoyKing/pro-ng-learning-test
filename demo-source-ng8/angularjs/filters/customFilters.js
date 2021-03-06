﻿/// <reference path="../angular.js" />

angular.module("customFilters", []) // 定义customFilters模块，作为过滤器集合
.filter("unique", function () { // 返回data中所有唯一的propertyName属性数组
    return function (data, propertyName) {
        if (angular.isArray(data) && angular.isString(propertyName)) {
            var results = [];
            var keys = {};
            for (var i = 0; i < data.length; i++) {
                var val = data[i][propertyName];
                if (angular.isUndefined(keys[val])) {
                    keys[val] = true;
                    results.push(val);
                }
            }
            return results;
        } else {
            return data;
        }
    }
})
.filter("range", function ($filter) { // 获取指定区间的索引数目，以数组形式返回
    return function (data, page, size) {
        if (angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)) {
            var start_index = (page - 1) * size; // 获取本页面开始的产品索引数
            if (data.length < start_index) {
                return [];
            } else {
                // $filter("limitTo")(input, size)方法，选取input数组中的前size个记录，
                return $filter("limitTo")(data.splice(start_index), size);                 
            }
        } else {
            return data;
        }
    }
})
.filter("pageCount", function () { // 根据data和size，计算页面总数
    return function (data, size) {
        if (angular.isArray(data)) {
            var result = [];
            for (var i = 0; i < Math.ceil(data.length / size) ; i++) {
                result.push(i);
            }
            return result;
        } else {
            return data;
        }
    }
});