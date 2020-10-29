- 当函数可以记住并访问所在的词法作用域，即使函数是在当前词法作用域之外执行，这是就产生了闭包；
- 模块
    * 为创建内部作用域而调用了一个包装函数
    * 包装函数的返回值至少包括一个对内部函数的引用，这样就会创建涵盖整个包装函数内部作用域的闭包

# this
1. this是js的关键字之一，它是对象自动生成的一个内部对象，只能在对象内部使用。随着函数使用场合的不同，this的值会发生变化；
2. this指向什么，完全取决于 什么地方以什么形式调用，而不是创建时；
3. this在任何情况下都不指向函数的词法作用域；
##this的绑定规则
* 分析调用栈（为了到达当前执行位置所调用的所有函数）
```
function baz() {
    //当前调用栈是：baz
    //因此，当前调用位置是全局作用域
    console.log("baz")
    bar()
}
function bar() {
    //当前调用栈是：baz->bar
    //因此，当前调用位置在baz中
    console.log("bar")
    foo()   //<--foo的调用位置
}
function foo() {
    //当前调用栈是：baz->bar->foo
    //因此，当前调用位置在bar中
    console.log("foo")
}
baz()  //<--baz的调用位置
```
1. 默认绑定
```
function foo(){
    var a = 1 ;
    console.log(this.a);    // 10
}
var a = 10;
foo();
```
`foo()`的调用是直接使用而不带任何修饰的函数引用进行调用的，就默认且只能默认绑定，且一般绑定到window上，严格模式下是undefined；
2. 隐式绑定
```
function foo(){
    console.log(this.a);
}
var obj = {
    a : 10,
    foo : foo
}
foo();                // ?

obj.foo();            // ?

```
- `foo()`为默认绑定，等价于打印window.a,故输出undefined，`obj.foo()`即为隐式绑定，函数foo被调用的时候有了上下文对象，即obj。当函数引用有上下文对象时，隐式绑定规则会把函数调用中的this绑定到这个上下文对象。因为调用`foo()`时this被绑定到obj，因此`this.a`和`obj.a`是一样的；
- 如果是链性的关系，比如`xx.yy.obj.foo()`，上下文取函数的直接上级，即紧挨着的那个，或者说对象链的最后一个。


## vue学习
### vue简介
1. js框架
2. 简化dom操作：
    之前制作网页效果：获取dom元素，操作元素；
    现使用vue:使用特殊语法，vue会自动操作特殊语法修饰的dom元素；
3. 响应式数据驱动：实时更新

### vue程序
1. 导入开发版本的vue.js：
` <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>`
2. 创建vue实例对象，设置`el`属性和`data`属性；
3. 使用简洁的模板语法把数据渲染到页面上。 双大括号`{{ message }}`

### el挂载点(element) 
test2-1
通过css选择器设置vue实例管理的元素
1. vue会管理el选项命中的元素及其内部的后代元素；
2. 可以使用其他的选择器，但是建议使用id选择器；
    - `#`是id选择器
    - `.`是class选择器
    - 其他标签选择器
3. 可以使用其他的双标签，但是不能使用html和body

- 优先加载template（若有定义)

### data数据对象
1. vue中用到的数据定义在data中；
2. data中可以写复杂类型的数据；
3. 渲染复杂类型数据时，遵守js语法即可

### vue指令
#### v-text   
test2-2
1. 用来设置标签的文本值(textContent)；
2. 默认写法会替换全部内容，使用差值表达式`{{}}`可以替换指定内容；
3. 内部支持写表达式

#### v-html   
test2-3
1. 用来设置元素的innerHTML；
2. 内容中有html结构会被解析为标签；
3. `v-text`指令无论内容是什么，只会解析为文本
4. 解析文本使用`v-text`，需要解析html结构使用`v-html`

#### v-on   
test2-4
1. 用于为元素绑定事件；
2. 时间名不需要写on；
3. 指令可以简写为`@`；
4. 绑定的方法定义在`methods`属性中；
5. 方法的内部通过`this`关键字可以访问定义在data中数据

#### 计数器制作
1. 创建Vue实例时：el(挂载点)，data(数据)，methods(方法)；
2. v-on指令的作用是绑定事件，可简写为@；
3. 方法中通过`this`关键字获取data中的数据；
4. v-text指令的作用是设置元素的文本值，可简写为`{{}}`；

#### v-show指令   
test2-5
1. 用于根据表达式的真假切换元素的显示状态；
2. 原理是修改dom元素的`display`属性，实现显示或隐藏；
3. 指令后面的内容，最终都会解析为布尔值；
4. true显示，false隐藏；

#### v-if指令   
test2-6
1. 根据表达式的真假切换元素的显示状态；
2. 本质是通过dom元素来切换显示状态；
3. true：元素存在于dom树中，false：元素从dom树中移除；
4. 若需**频繁**切换状态，用`v-show`指令；

#### v-bind指令
test2-7
1. 用于为元素标签绑定属性（如src）；
2. 完整写法为`v-bind:属性名`，可缩写为`:属性名`；
3. 需要动态的增删class属性建议使用对象的方式；

#### v-for指令
test2-8
1. 用于根据数据生成列表结构；
2. 经常和数组结合使用；
3. 基本语法：`(item,index) in 数据列表`；
4. 指令与数据绑定，为响应式：数据改变，和数据绑定的元素同步改变

#### v-on补充
test2-9
1. 事件绑定的方法写成函数调用的形式，可以传入自定义参数；
2. 定义方法时需要定义形参来接收传入的实参；
3. 事件的后面跟上`.修饰符`可以对事件进行限制，如`keyup.enter`（回车）

#### v-model指令
tets2-10
1. 用于便携的设置和获取表单元素的值；
    input、textarea、select、checkbox、radio
    只能应用在有value属性的；
2. 绑定的数据会和表单元素值相关联，且双向绑定，同步更新；
3. 实质是语法糖，是`v-bind:value`和`v-on:input`结合的体现

#### axios基本使用
test2-11
1. 必须先导入才能使用：
`<script src="https://unpkg.com/axios/dist/axios.min.js"></script>`

`document.querySelector()` 获取元素
```
   axios.get(地址?key=value&key2=value2)
    .then(function(response){
        ...
    }),function(err){
        ...
    }
```
```
  axios.get(地址,{key:value,key2:value2})
    .then(function(response){
        ...
    }),function(err){
        ...
    }
```
2. 使用get或post方法即可发送对应的请求；
3. then方法中的回调函数会在请求成功或失败时触发；
4. 通过回调函数的形参可以获取响应内容，或错误信息；

#### axios+vue
1. axios回调函数中的this已经改变，无法访问data中数据；
2. 可以把this保存起来：`var that=this`，回调函数中直接使用保存的this即可；
3. 数据来源变成了网络请求得到的
 