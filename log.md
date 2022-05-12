

# 原则

主要在于 全部尽可能实现 store模式
部分公共组件采用props传参

数字运算采用numeral, 时间采用moment.js
避免大规模无意义的粘贴和代码
继续采用less，语法上和sass一样

> **参照etax-mobile-zrr**

> 采用众多技术
-   组件采用props
-   eventsBus[多语言切换]

> 采用 统一的命名规范 常量大写等
-   公共组件**大驼峰**，业务组件**小写段斜杠**
-   pages **小写段斜杠**

> 接口上，参照OA 更加符合现实的，而不是传统的

# 1. 首页样式统一化
参照react-CB 样式的统一

2. 组件划分上
    -   [公共组件]全部放在 `@/components/common/` 文件夹中
    -   业务组件放在 `@/components/`
    -   [业务组件]被多个页面共同使用（提取公共代码）内容的组件放在`@/components/common-content`
