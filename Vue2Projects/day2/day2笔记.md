### 什么是vue

1. 构建用户界面
   + 用 vue 往 html 页面中填充数据，非常的方便
2. 框架
   + 框架是一套现成的解决方案，程序员只能遵守框架的规范，去编写自己的业务功能！
   + 要学习vue，就是在学习vue框架中规定的用法！
   + vue的指令、组件（是对UI结构的复用）、路由、Vuex、vue组件库
   + 只有把上面罗列的内容掌握以后，才具有开发vue项目的能力！
   
   

### vue 的两个特性

1. 数据驱动视图：
   + 数据的变化**会驱动视图**自动更新
   + 好处：程序员只管把数据维护好，那么页面结构会被vue自动渲染出来！

2. 双向数据绑定：

   >在网页中。form表单负责**采集数据**，Ajax负责**提交数据**。  

   + js数据的变化会被自动渲染到页面上
   + 页面上采集的数据发生变化的时候，会被vue自动获取到，并更新到js数据中
   
   > 注意：数据驱动视图和双向数据绑定的底层原理是MVVM（Model数据源、View视图、ViewModel就是vue的实例）
   
   

### vue 指令

#### 1. 内容渲染指令

1. `v-text` 指令的缺点：会覆盖元素内部原有的内容！
2. `{{ }}` 插值表达式：在实际开发中用的最多，只是内容的占位符，不会覆盖原有的内容！
3. `v-html` 指令的作用：可以把带有标签的字符串，渲染成真正的HTML内容！



#### 2. 属性绑定指令

> 注意：插值表达式只能额用在元素的**内容节点**中，不能用在元素的**属性节点**中！

+ 在vue中，可以使用`v-bind:` 指令，为元素的属性动态绑定值；

+ `v-bind` 的简写是英文的`:`，例如：

  ```html
  <input type="text" :placeholder="tips">
  <input type="text" v-bind:placeholder="tips">
  ```

+ 在使用v-bind 属性绑定期间，如果绑定内容需要进行动态拼接，则字符串的外面应该包裹单引号，否则会被视为是vm的数据，例如：

  ```html
  <div :title="'box'+index">这是一个div</div>   // 对的
  <div :title="box+index">这是一个div</div>  //错的，vue会认为box是数据源的一个数据
  ```




#### 3. 事件绑定指令

1. vm 的`methods` 属性里用`vm.xxx` 或 `this.xxx` 表示`data` 里的数据项，且vm === this；

2. `v-on:`  的简写是 `@` ，例如：

   ```html
   <button v-on:click="add(2)">点我+1</button>
   <button @click="sub">点我-1</button>
   ```

3. vue内置有事件对象`$event` 等价于事件处理函数的形参e，如若默认的形参e被手动传递的参数覆盖了，则可以自己手动传递一个事件对象

4. 事件修饰符

   + `@xxx.prevent = "fn"` 中的prevent等价于`e.preventDefault() ` 阻止默认响应行为

   + `@xxx.stop = "fn"` 中的stop等价于`e.stopPropgation()` 阻止事件冒泡

   + `@keyup` 后面可以添加按键修饰符，直接具体到绑定哪一个按键
     
     ```html
     <input type="text" @keyup.esc="clearInput" @keyup.enter="commitAjax">
     ```
     
   
   

#### 4. v-model指令

+ 仅对各种`input` 表单元素、`textaera` 、`select` 元素有效
+ 作用：让表单元素的`value`和数据源进行双向绑定



#### 5. 条件渲染指令

1. `v-show` 的原理是：动态为元素创建或移除`display:none` 样式，来实现元素的显示和隐藏
   + 如果要频繁的切换元素的显示状态，用`v-show` 的性能会更好
2. `v-if` 的原理是：每次动态创建或移除元素，来实现元素的显示和隐藏
   + 如果刚进入页面的时候，某些元素默认不需要被显示，而且后期这个元素都很可能不需要显示出来，此时`v-if` 的性能更好



