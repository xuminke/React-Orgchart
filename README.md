# React-Orgchart
using jQuery UI lib in React with webpack

# About
在react中使用jquery的ui库，以Orgchart为例子，相信其他的用法也一致

# 说明

- 首先是import orgchart库，由npm安装。
- import相对应的css，不然并不会自动打包进去。
``` javascript
import 'orgchart';
import 'orgchart/dist/css/jquery.orgchart.css';
import 'font-awesome/css/font-awesome.css';
```

- 然后 需要把使用ui库过程中的各种全局量打包进源文件，这里通过webpack的ProvidePlugin，应该externals也可以使用，
具体参考下面这篇文章：
[webpack多页应用架构系列（四）](http://mp.weixin.qq.com/s?__biz=MzA5NTM2MTEzNw==&mid=2736710892&idx=4&sn=68f8e7e5c9ade8c306a11dcc4830e666&scene=19#wechat_redirect)

``` javascript
new webpack.ProvidePlugin({
      html2canvas: 'html2canvas',
      $: 'jquery',
    }),
```
- 在webpack里面还得顺便把上面那个font-awesome使用的字体文件loader进来
``` javascript
{
        test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?prefix=font/&limit=10000',
      },
```

- 然后就能愉快的玩耍啦
使用第三方库的具体请参考React官方文档
[Integrating with Other Libraries](https://facebook.github.io/react/docs/integrating-with-other-libraries.html)
