const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {overlay: false},
    proxy: {
      "/sxp": {
        target: 'http://192.168.111.40:8000',
        changeOrigin: true,
        pathRewrite: {
          // '^/sxp': ''
        }
      }
    }
  }
})
