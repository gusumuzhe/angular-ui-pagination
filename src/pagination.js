/**
 * Created by zhang on 2017/6/1.
 */
var paginationCss = require('./pagination.scss');
var paginationHtml = require('./pagination.html');


angular.module('ui.pagination', [])
    .directive('uiPagination', function () {
        return {
            restrict: 'ACE',
            template: paginationHtml,
            scope: {
                total: '=', // 总共页数
                buttonCount: '@', // 展示可点击的页数数量
                onChange: "&", // 当分页被选择，回调
                disableCounting: '@' // 是否显示计数，默认显示
            },
            link: function ($scope) {
                $scope.vm = {};

                var buttonCount = $scope.buttonCount ? parseInt($scope.buttonCount) : 5; // 默认展示5个

                $scope.vm.disable = ($scope.disableCounting !== undefined && $scope.disableCounting !== 'false'); // 是否展示计数的框

                $scope.$watch('total', function (newValue) {
                    if (newValue) {
                        $scope.selectPage($scope.vm.currentPage || 1, true); // 总数变动，则重新选择该页
                    }
                });

                $scope.vm.currentPage = 1;
                $scope.total = $scope.total || 1;

                // 通过输入框直接输入页码
                $scope.inputPageNo = function (event) {
                    // 如果回车了，则执行选择页面
                    if (event.keyCode == '13') {
                        var pageNo = parseInt($scope.vm.pageCount);

                        // 不是数字，则置为当前页面
                        if (isNaN(pageNo)) {
                            $scope.vm.pageCount = $scope.vm.currentPage;

                            return;
                        }

                        $scope.selectPage(pageNo);
                    }
                };

                // 选择页数
                $scope.selectPage = function (pageNo, isForceRegenerate) {
                    var prePage = $scope.vm.currentPage,
                        curPage;

                    if (pageNo > $scope.total) {
                        curPage = $scope.total;
                    } else if (pageNo < 1) {
                        curPage = 1;
                    } else {
                        curPage = pageNo;
                    }

                    $scope.vm.pageCount = $scope.vm.currentPage = curPage;

                    if (curPage != prePage || isForceRegenerate) {
                        $scope.vm.pageList = generatePageList(curPage, parseInt($scope.total), buttonCount);

                        // 调用回调方法
                        ($scope.onChange || angular.noop)({curPage: curPage, prePage: prePage});
                    }
                };

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
            }
        };
    });