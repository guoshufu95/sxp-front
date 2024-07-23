const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {overlay: false},
    proxy: {
      "/sxp": {
        target: 'http://10.15.18.26:8000',
        changeOrigin: true,
        pathRewrite: {
          // '^/sxp': ''
        }
      }
    }
  }
})
