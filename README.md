# element-theme
[![Build Status](https://travis-ci.org/ElementUI/element-theme.svg?branch=master)](https://travis-ci.org/ElementUI/element-theme)
[![npm](https://img.shields.io/npm/v/element-theme.svg)](https://www.npmjs.com/package/element-theme)

> Theme generator cli tool for Element.

![](./media/element.gif)

## 整体思路
把下面两篇结合着看：
- [参考1](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/advanced/theme.html#多套主题换肤)
- [参考2](https://juejin.im/post/593121aa0ce4630057f70d35)


## Installation
```shell
npm i element-theme -g

npm install
```

## 在线编辑element theme
- 在[这里](https://element.eleme.cn/#/zh-CN/theme)在线编辑element主题
- 下载，并将下载的文件中的`config.json`文件拷贝到当前项目根目录下

## 基于config.json，编译出带名字空间的theme文件，生成多套主题
- 初始化，生成`element-variables.scss`文件，其实就是从node-modules/element-theme-chalk内拷贝`var.scss`文件
  - et -i
- 将config.json文件的内容更新到`element-variables.scss`文件内
  - node update-element-theme-variable.js
- build theme，生成的文件在theme目录下
  - et
- 主要是给css添加一个名字空间，默认是`custom-theme`，可以通过[这个变量]修改(https://github.com/yangguichun/custom-element-theme/blob/master/gulpfile.js#L6)，生成的文件在dist目录下
  - gulp
- 重复以上步骤，生成多套主题，比如.day-theme, .night-theme 两套

## 在项目中使用多套主题
- 假设在[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)中使用
- 将多套主题拷贝到 /src/assets 目录下，多套主题则分多个子目录存放
- 然后通过`toggleClass(document.body, 'day-theme')`来切换主题，具体参考[这里](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/views/theme/index.vue#L97)


## 如果element-theme-chalk有版本更新，通过如下方式更新主题
- remove `element-variables.scss`
- update `element-theme-chalk` version in package.json
- et -i
- et
- gulp

## License
MIT
