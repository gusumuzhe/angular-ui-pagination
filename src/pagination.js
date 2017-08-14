/**
 * Created by zhang on 2017/6/1.
 * 初始化时，如果没有总页数，则默认一页
 * 初始化时，默认第一页
 */
var paginationCss = require('./pagination.scss');
var paginationHtml = require('./pagination.html');


angular.module('ui.pagination', [])
    .directive('uiPagination', function () {
        var defaultOptions = {
            pageSize: 5, // 每页条数
            displayCount: 5, // 展示的可点击块数
            disableCounting: false // 是否不展示页数输入框
        };

        return {
            restrict: 'AE',
            template: paginationHtml,
            scope: {
                pageSize: '@', // 总共页数， 默认5
                displayCount: '@', // 展示可点击的块数量
                onChange: "&", // 当分页被选择，回调
                disableCounting: '@', // 是否显示计数，默认显示
                totalItems: '=', //总的条数
            },
            link: function ($scope) {
                var option = $scope.option = parseOption({
                    pageSize: $scope.pageSize,
                    displayCount: $scope.displayCount,
                    disableCounting: $scope.disableCounting
                });

                $scope.vm = {
                    currentPage: 1,
                    // totalPage: getTotalPage(option.pageSize, $scope.totalItems)
                };

                $scope.$watch('totalItems', function () {
                    refresh();
                });

                // 通过输入框直接输入页码
                $scope.inputPageNo = function (event) {
                    // 如果回车了，则执行选择页面
                    if (event.keyCode == '13') {
                        var pageNo = parseInt($scope.vm.pageCount);

                        // 不是数字，则置为当前页面
                        if (isNaN(pageNo)) {
                            // $scope.vm.pageCount = $scope.vm.currentPage;
                            return;
                        }

                        $scope.selectPage(pageNo);
                    }
                };

                // 选择页数
                $scope.selectPage = function (pageNo) {
                    var prePage = $scope.vm.currentPage;
                        // curPage;

                    // if (pageNo > $scope.vm.totalPage) {
                    //     curPage = $scope.vm.totalPage;
                    // } else if (pageNo < 1) {
                    //     curPage = 1;
                    // } else {
                    //     curPage = pageNo;
                    // }

                    $scope.vm.currentPage = pageNo;

                    refresh();

                    // $scope.vm.pageCount = $scope.vm.currentPage = curPage;

                    if ($scope.vm.currentPage !== prePage) {
                        // $scope.vm.pageList = generatePageList(curPage, parseInt($scope.totalPage), option.displayCount);

                        // 调用回调方法
                        ($scope.onChange || angular.noop)({curPage: $scope.vm.currentPage, prePage: prePage});
                    }
                };

                /**
                 * 刷新分页器
                 */
                function refresh() {
                    $scope.vm.totalPage = getTotalPage(option.pageSize, $scope.totalItems);

                    if ($scope.vm.currentPage > $scope.vm.totalPage) {
                        $scope.vm.currentPage = $scope.vm.totalPage;
                    } else if ($scope.vm.currentPage < 1) {
                        $scope.vm.currentPage = 1;
                    }

                    $scope.vm.pageCount = $scope.vm.currentPage;
                    $scope.vm.pageList = generatePageList($scope.vm.currentPage, $scope.vm.totalPage, option.displayCount);
                }

                /**
                 * 生成分页器中可点页数
                 *
                 * @param {number} currentPage 当前页数
                 * @param {number} totalPage 所有页数
                 * @param {number} visibleCount 可以点击的数量
                 */
                function generatePageList(currentPage, totalPage, visibleCount) {
                    var startPageNum, endPageNum, leftCount, rightCount;

                    // 计算在当前页中，左右应该各显示多少个页数按钮
                    if (visibleCount % 2 > 0) {
                        leftCount = rightCount = Math.floor(visibleCount / 2);
                    } else {
                        leftCount = visibleCount / 2 - 1;
                        rightCount = leftCount + 1;
                    }

                    if (totalPage <= visibleCount) {
                        // 总数过少，直接显示所有
                        return generateList(1, totalPage);
                    } else if (currentPage < 1) {
                        // 确保不会出现负数页面
                        return generateList(1, visibleCount);
                    } else if (currentPage >= totalPage) {
                        // 确保不会出现页数大于最大页数
                        return generateList(totalPage - visibleCount + 1, totalPage);
                    } else {
                        // 计算出合适的显示范围
                        startPageNum = currentPage - leftCount;
                        endPageNum = currentPage + rightCount;

                        if (startPageNum <= 0) {
                            endPageNum = -1 * startPageNum + 1 + endPageNum;
                            startPageNum = 1;
                        } else if (endPageNum > totalPage) {
                            startPageNum = startPageNum - (endPageNum - totalPage);
                            endPageNum = totalPage;
                        }

                        return generateList(startPageNum, endPageNum);
                    }
                }

                /**
                 * 生成从头到尾的数组
                 *
                 * @param {number} start 起始位置，包含
                 * @param {number} end 截止位置，包含
                 */
                function generateList(start, end) {
                    var arrays = [];

                    if (end < start) {
                        throw new RangeError('End must large than start');
                    }

                    for (var i = start; i <= end; i++) {
                        arrays.push(i);
                    }

                    return arrays;
                }

                /**
                 * 计算总共页数
                 * @param pageSize
                 * @param totalItems
                 */
                function getTotalPage(pageSize, totalItems) {
                    var totalPages = Math.ceil(totalItems / pageSize);

                    return totalPages || 1;
                }

                /**
                 * 解析页面配置
                 * @param option
                 */
                function parseOption(option) {
                    option.pageSize = option.pageSize ? parseInt(option.pageSize) : defaultOptions.pageSize;
                    option.displayCount = option.displayCount ? parseInt(option.displayCount) : defaultOptions.displayCount;
                    option.disableCounting = option.disableCounting !== undefined && option.displayCount !== 'false';

                    return option;
                }
            }
        };
    });