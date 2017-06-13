# angular ui-pagination
基于angularjs的分页器

## 安装
引入库文件

```html
	<script src="pagination.js">
```

添加模块依赖

```javascript
	angular.module('myModule', ['ui.pagination'])
```

## uiPagination - directive
可以设置四个属性

1. total - 页数总数
2. buttonCount - 展示的可点击的页数个数，默认5个
3. onChange - 当前页数发生改变时，该方法被调用，注入两个参数，curPage 和 prePage 分别表示当前页数和先前页数
4. disableCounting - 是否展示页数输入框，默认展示

### examples
```javascript
app.controller('MyController', function($scope) {
  $scope.total = 100;
  
  $scope.onChange = function(curPage, prePage) {
    console.log(curPage, prePage);
  }
});
```

```html
<ui-pagination total="100" on-change="onChange(curPage, prePage)"></ui-pagination>
```