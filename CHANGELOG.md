1.0.1
=====

1. `Event`对象运行`next`方法，将遍历当前队列之后所有的方法，而不单单只是运行后一个绑定函数（即：运行`next`即开启 **Filter** 模式）
2. `Event`对象增加`overrideDefault`方法及对应的`isDefaultOverrided`参数，用于覆盖当前运行环境下的默认方法
3. `Event`对象增加`setDefaultReturn`方法，用于`after`和`final`队列修改函数返回值
4. `Event`的`preventDefault`方法，增加设置默认函数返回值的参数