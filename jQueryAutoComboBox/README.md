## jQueryAutoComboBox
> 基于jQuery的带查询框的下拉复选框插件，UI直接偷懒复用的ligerUI

### 背景
由于某一次需求中，产品需要一个带查询框的下拉复选框组件，由于项目中使用的ligerUI并没有现成的组件，于是简单的自己试着写个玩玩。

### 简要文档
```js
$(domid).AutoComboBox({
  // 自定义参数
})
```
- 自定义参数说明

|参数| 描述 | 默认值 | type|
| - | - | - | - |
| width|输入框的宽度| 250| number|
|dataList|下拉框的数据| [] | array|
|nameField|option的name| "name" | string|
|valueField|option的value| "id" | string |
|hiddenValueFieldID| 隐藏域的dom节点id| input框的ID+'_val' | string|
|selected| 默认选中的数据id| "" | string|



