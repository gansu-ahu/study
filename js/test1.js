//模块
// function CoolModule() {
//     var something = "cool"
//     var another = [1, 2, 3]
//     function doSomething() { console.log(something) }
//     function doAnother() { console.log(another.join("!"));}
//     return {
//         doSomething: doSomething,
//         doAnother : doAnother
//     }
// }
// var foo = CoolModule()
// foo.doSomething()
// foo.doAnother()


//this
// function baz() {
//     //当前调用栈是：baz
//     //因此，当前调用位置是全局作用域
//     console.log("baz")
//     bar()
// }
// function bar() {
//     //当前调用栈是：baz->bar
//     //因此，当前调用位置在baz中
//     console.log("bar")
//     foo()   //<--foo的调用位置
// }
// function foo() {
//     //当前调用栈是：baz->bar->foo
//     //因此，当前调用位置在bar中
//     console.log("foo")
// }
// baz()  //<--baz的调用位置


//默认绑定
// function foo(){
//     var a = 1 ;
//     console.log(this.a);    // 10
// }
// var a = 10;
// foo();


//隐式绑定
// function foo(){
//     console.log(this.a);
// }
// var obj = {
//     a : 10,
//     foo : foo
// }
// foo();                // ?  undefined

// obj.foo();            // ?  10

                                                  
