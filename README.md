# Webpack-boilerplate
> Webpack 应对多种业务场景需求

## Webpack && Express 多页面
> 业务场景 多页面，针对不同页面进行分入口打包，不对 `template` 文件进行webpack编译，
分入口后，每个页面只需一行，获取本页面所有编译后的依赖 CSS/JS 。

### 目录树
```bash
.
├── README.md
├── app
│   ├── mix.js
│   └── webpack-middleware.js
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── stats.json
│   ├── utils.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── index.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── static
│   ├── dist
│   │   ├── css
│   │   │   ├── index.3396f81ea6a0239c1d5ba3b2ca0ceb4c.css
│   │   │   ├── index.3396f81ea6a0239c1d5ba3b2ca0ceb4c.css.map
│   │   │   ├── items.c87ae587542d0a45c87dd77405bc7169.css
│   │   │   └── items.c87ae587542d0a45c87dd77405bc7169.css.map
│   │   ├── img
│   │   │   └── 2017-08-18\ 13_56_25.gif
│   │   └── js
│   │       ├── index.bebff4edc152bc59bd3d.js
│   │       ├── index.bebff4edc152bc59bd3d.js.map
│   │       ├── items.4f13ddfde874f632e4b5.js
│   │       ├── items.4f13ddfde874f632e4b5.js.map
│   │       ├── manifest.1325d3518fe2fbaf5765.js
│   │       ├── manifest.1325d3518fe2fbaf5765.js.map
│   │       ├── vendor.48bd06d9e8f39ffd460d.js
│   │       └── vendor.48bd06d9e8f39ffd460d.js.map
│   └── src
│       ├── enters
│       │   ├── index.js
│       │   └── items.js
│       ├── img
│       │   └── 2017-08-18\ 13_56_25.gif
│       └── style
│           ├── index.less
│           └── items.less
└── views
    └── index.art
```