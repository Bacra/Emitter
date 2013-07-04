### 1.0.1

* `Event`对象运行`next`方法，将遍历当前队列之后所有的方法，而不单单只是运行后一个绑定函数（即：运行`next`即开启 **Filter** 模式）
* `Event`对象增加`overrideDefault`方法及对应的`isDefaultOverrided`参数，用于覆盖当前运行环境下的默认方法
* `Event`的`preventDefault`方法，增加设置默认函数返回值的参数
* `Event`对象的`defaultReturn`属性，重命名为`defReturn`
* `Event`对象增加`setDefReturn`方法，用于`after`和`final`队列修改函数返回值
* `Event`对象增加`async`，增加异步处理模式
* 修正defCall不存在情况下，队列运行到defCall，`preReturn`和`defReturn`不重置的BUG
* `Event`对象的`off`重命名为`offSelf`，新加`on`、`off`、`once`方法