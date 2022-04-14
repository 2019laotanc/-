const Timestamp = new Date().getTime();
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  outputDir: 'dist',
  /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
  assetsDir: `assets_${Timestamp}`,
  /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
  productionSourceMap: false,
  /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
  filenameHashing: false,

  /* 代码保存时进行eslint检测 */
  lintOnSave: false,
  devServer: {
    open: true,
    host: 'localhost',
    port: 8000,
    https: false,
    //以上的ip和端口是我们本机的;下面为需要跨域的 http://42.51.69.107/
    proxy: { //配置跨域
        '/test':{
          target: 'http://42.51.69.107:26068', //这里后台的地址模拟的;应该填写你们真实的后台接口 http://42.51.69.107:26009  http://10.0.98.23:8199 10.0.96.144
          ws: true,
          changOrigin: true,    //允许跨域
          pathRewrite: {        //重写路径
              '^/test': ''     //最后请求是， 不带api
          }
        }
    }
},

  configureWebpack: { // webpack 配置
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.时间戳】
      filename: `js/[name]_${Timestamp}.js`,
      chunkFilename: `js/[name]_${Timestamp}.js`,
    },
  },
};
