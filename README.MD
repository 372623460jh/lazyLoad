# lazyLoad图片懒加载组件

该组件用于`img`标签在滑动窗口中懒加载:

## 地址链接

- 源码所在位置：https://github.com/372623460jh/lazyLoad/tree/master/dist

- dev链接：http://libs.ijianghe.cn/js/lazyLoad/lazyLoad.js

- pro链接：http://libs.ijianghe.cn/js/lazyLoad/lazyLoad.min.js

- demo：https://github.com/372623460jh/lazyLoad/tree/master/examples/test/test.html

## 原理

- 通过`getBoundingClientRect`获取当前元素所处窗口的位置

  计算当前元素需不需要显示图

- 将需要懒加载的`img`标签中的`data-src`属性中值设置到`src`属性中

  通过动态设置`img`标签的`src`属性达到按需加载图片
    
## 用法
   
   - 在overflow-y:auto 中使用
    
   ```javascript
    new lazyLoad(
        '.jhld',                    //哪些图片需要被懒加载
        {
            offset: 0,              //超出父元素多少像素加载
            time: 200,              //延迟多少秒后加载
            scrollDom: parent       //滑动窗口的父元素
        }
    );
   ```
   - 在第三方iScroll组件中使用
   
   注意：在iScroll中使用必须使用iscoll-probe，设置probeType = 3
    
   ```javascript
    new lazyLoad(
        '.jhld',                            //哪些图片需要被懒加载
        {
            offset: 0,                      //超出父元素多少像素加载
            time: 200,                      //延迟多少秒后加载
            scrollDom: parent,              //滑动窗口的父元素
            iScroll: 'iScroll组件实例'       //传入第三方iScroll组件实例
        }
    );
   ```