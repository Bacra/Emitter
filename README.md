tEmitter
=======

简单快速为JS方法创建监听队列，同时增加时间轴概念，提供`before` `after` `final`三个时间段




## Get Started


	tEmitter(method, obj);



返回对象包含如下方法：

`on([timeline, ] [data, ] func)`: 增加监听事件

`off([timeline, ] [func])`: 删除监听事件（全部/队列全部/指定事件）

`once([timeline, ] [data, ] func)`: 添加临时监听事件
（注意：不管调用emit后是否运行此方法，都会在emit调用结束后，删除此绑定）

`emit([args])`: 运行队列，返回 **method** 运行结果（ **method** 未运行则返回 _undefined_ ）

`param(data [, widthBaseParam])`: 添加/读取运行时所需要的参数

`removeParam(name, [, widthBaseParam])`: 移除指定的参数

`trigger([args])`: 运行默认 **method** 方法




## About Event Class

使用`on`方法添加监听事件，以及使用`Emitter`初始化对象时，所添加函数的第一个参数将强制规定为Event对象

Event对象包含如下属性和方法：

`data`: 执行`on`方法时，传入的`data`对象

`preReturn`: 队列执行过程中，上一个方法的返回值（仅作参考）

`defaultReturn`: 队列执行过程中，默认方法`method`方法的返回值

`off()`: 执行后，将从队列中删除此方法

`next()`: 直接调用队列的下一个方法（注意：不跨队列，并且返回值只有`true`和`false`）

`param(data [, widthBaseParam])`: 添加/读取运行时所需要的参数(注：如果单单只是修改 **runParam** ，可直接赋值)

`removeParam(name, [, widthBaseParam])`: 移除指定的参数

`preventDefault()`: 运行后，将阻止默认方法`method`的执行





## About timeline Param

`timeline`有三个值`before`（默认）、 `after`、 `final`：

`before`: 在 **method** 之前运行；

`after`: 在 **method** 之后运行（注：使用`event.preventDefault()`方法取消`after`队列的执行；直接`return false;`则可以）

`final`: 在`after`之后运行，即使其他队列（或则默认方法）执行`event.preventDefault()`或则`return false;`，`final`队列也会执行（`final`队列中执行`return false;`可中止）




## About param Method

当`data`参数类型为`Object`时，执行set方法；`String`则执行get方法

当`widthBaseParam`定义为`true`时（默认为`false`），set/get的内容为 **baseParam** ，否则为 **runParam** ；
两者的区别是 **baseParam** 中的值会一直存在，不受到 **runParam** 的修改而变化； **runParam** 中设置的值，在调用一次`emit`后会自动清空（嵌套调用不继承）


## License

Emitter.js is available under the terms of the [MIT License](./LICENSE.md).