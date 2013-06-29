tEmitter
=======

简单快速为JS方法创建监听队列，同时增加时间轴概念，提供`before` `after` `final`三个时间段




## Get Started


	tEmitter(method, obj);



返回对象包含如下方法：

* `on([timeline, ] [data, ] func)`: 增加监听事件
* `off([timeline, ] [func])`: 删除监听事件（全部/队列全部/指定事件）
* `once([timeline, ] [data, ] func)`: 添加临时监听事件
（注意：不管调用emit后是否运行此方法，都会在emit调用结束后，删除此绑定）
* `emit([args])`: 运行队列，返回 **method** 运行结果（ **method** 未运行则返回 _undefined_ ）
* `param(data [, widthBaseParam])`: 添加/读取运行时调用的参数
* `removeParam(name, [, widthBaseParam])`: 移除指定的参数
* `trigger([args])`: 运行默认 **method** 方法




## About Event Class

使用`on`方法添加监听事件，所添加函数的第一个参数将强制规定为Event对象

Event对象包含如下属性和方法：

* `data`: 执行`on`方法时，传入的`data`对象
* `preReturn`: 队列执行过程中，上一个方法的返回值（含next执行结果，仅作参考）
* `defaultReturn`: 所有队列执行结束之后方法的返回值
* `isDefaultPrevented`: 默认方法执行是否被阻断状态（直接修改无效）
* `isDefaultOverrided`: 默认方法是否被改写（直接修改无效）
* `off()`: 从当前队列中删除此方法
* `next()`: 调用当前队列的（注意：不跨队列，并且返回值只有`true`和`false`）
* `param(data [, widthBaseParam])`: 添加/读取缓存的参数
* `removeParam(name, [, widthBaseParam])`: 移除指定的参数
* `preventDefault([defReturn])`: 阻止默认方法`method`的执行
* `overrideDefault([defCall])`: 在当前运行环境下，覆盖`method`方法
* `setDefaultReturn(defReturn)`: 修改`defaultReturn`值（注意：在`before`队列执行过程中，只有在`preventDefault`方法执行之后，修改才有效）
* `async()`: 启动异步处理模式



## About method

`method`不同于`on`引入的方法，其第一个参数不是`tEmitter`提供的`Event`对象。

已实现如下功能部署，实现代码见[Wiki](https://github.com/Bacra/tEmitter.js/wiki)：

* 如何将`method`转化成`Event`作用的方法（有什么好处？）
* 如何确保`method`方法在队列中的执行顺序
* 如何“继承” `preventDefault()` 逻辑设计思想



## About timeline Param

* `timeline`有三个值`before`（默认）、 `after`、 `final`：
* `before`: 在 **method** 之前运行；
* `after`: 在 **method** 之后运行（注：使用`event.preventDefault()`将取消`after`队列的执行）
* `final`: 在`after`之后运行，即使其他队列执行`return false;`，`final`队列也会执行（`final`队列中执行`return false;`可使其中止）




## About param Method

当`data`参数类型为`Object`时，执行set方法；`String`则执行get方法

当`widthBaseParam`定义为`true`时（默认为`false`），set/get的内容为 **baseParam** ，否则为 **runParam** ；
两者的区别是 **baseParam** 中的值会一直存在，不受到 **runParam** 的修改而变化； **runParam** 中设置的值，在调用一次`emit`后会自动清空（嵌套调用不继承）

在方法调用过程中，使用`tEmitter`或则`Event`的`param`及`removeParam`，修改/读取/删除的变量值，均不会影响到当前运行环境下的`param`值，所修改的内容会影响到下一次调用；
如果需要修改当前执行环境下的`param`值，只需直接对`param`方法进行链式赋值即可

嵌套调用，`runParam`值不会得到继承，对其的修改也不会同步（请思索：如何获取嵌套调用后返回的`param`值）



## Change Log

Goto [Change Log](./CHANGELOG.md).

## License

Emitter.js is available under the terms of the [MIT License](./LICENSE.md).