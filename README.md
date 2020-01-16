## 参考资料
把下面两篇结合着看：
- [参考1：多套主题换肤](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/advanced/theme.html#多套主题换肤)
- [参考2：手摸手，带你用vue撸后台 系列三(实战篇)-基于Element的动态换肤](https://juejin.im/post/593121aa0ce4630057f70d35)


## 缘由
以上两篇参考资料已经把换肤的思路说的比较清楚了，如何生成带名字空间的主题文件，在工程中如何通过toggleClass的方式使用带名字空间的主题文件，已经都有思路了。但是在使用[custom-element-theme](https://github.com/yangguichun/custom-element-theme)来生成带名字空间的主题时，难道要我们自己手动逐个编辑`element-variables.scss`文件内的颜色变量吗？我当然希望是通过element官方的[主题编辑工具](https://element.eleme.cn/#/zh-CN/theme)以所见即所得的方式来编辑，然后下载使用。但是下载的主题文件是不带名字空间的，如果要按照[参考1：多套主题换肤](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/advanced/theme.html#多套主题换肤)的方法实现多套主题换肤，那就需要把下载文件中的`config.json`文件内的颜色逐个更新到[element-variables.scss](https://github.com/yangguichun/custom-element-theme/blob/master/element-variables.scss)文件内，然后加上名字空间，重新编译。

考虑到手动重复这个步骤太麻烦，这里增加一个把`config.json`的内容更新到`element-variables.scss`的脚本`./lib/update-variables.js`，并且修改了gulpfile.js以及lib中的相关文件，使其可以通过一条命令完成原来的et -i, et, gulp等多条命令的功能，详见下面的使用说明。


## 使用说明
### 安装
```shell
npm install
```

### 在线编辑element theme
- 在[这里](https://element.eleme.cn/#/zh-CN/theme)在线编辑element主题
- 下载，并将下载的文件中的`config.json`文件拷贝到当前项目根目录下

### 基于config.json，编译出多套主题
- 初始化，从node-modules/element-theme-chalk内拷贝`var.scss`文件到当前目录，得到`element-variables.scss`文件
- **将config.json文件的内容更新到`element-variables.scss`文件内**  
  - **node update-element-theme-variable.js**
- 编译主题，生成的文件在theme目录下
- 给css添加一个名字空间，默认是`custom-theme`，可以通过[这个变量](https://github.com/yangguichun/custom-element-theme/blob/master/gulpfile.js#L6)修改，生成的文件在dist目录的主题目录下，可以通过 -n指定主题名称，比如 gulp -n day-theme，则会在dist目录下生成day-theme目录，如果不指定-n参数，则使用custom-theme，生成的文件也放在dist/custom-theme目录下  
- 以上工作，通过命令完成： gulp -n day-theme
- 重复执行该命令，生成多套主题，比如`.day-theme`, `.night-theme` 两套

```shell
gulp -n day-theme
```

### 在项目中使用多套主题
假设在[vue-element-admin](https://github.com/yangguichun/vue-element-admin)中使用
- 将生成在dist目录下的多套主题拷贝到 /src/assets 目录下，多套主题则分多个子目录存放，比如`day-theme`, `night-theme`
- 然后通过`toggleClass(document.body, 'day-theme')`来切换主题，具体参考[这里](https://github.com/yangguichun/vue-element-admin/blob/master/src/views/theme/index.vue#L97)


## 如果element-theme-chalk有版本更新，通过如下方式更新主题
### 查看是否有更新
- 查看本地的element-theme-chalk版本
  - npm list element-theme-chalk
- 查看所有可用的版本
  - npm view element-theme-chalk versions
### 更新到最新版本
通过如下shell命令
```shell
npm i element-theme-chalk@latest
gulp -n day-theme
```

## License
MIT
