const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const { viteCommonjs } = require('@originjs/vite-plugin-commonjs')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// npm 正在执行哪个 script,npm_lifecycle_event 就返回当前正在运行的脚本名称。
const isVite = process.env.npm_lifecycle_event.startsWith('vite')

// 兼容vite
function getAdditionalData(str) {
  if (isVite) {
    return str.replace(/@style\//, 'src/styles/')
  }
  return str
}

module.exports = {
  configureWebpack: {
    name: 'vue2-vite-demo',
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
      alias: {
        '@': resolve('src'),
        '@view': resolve('src/views'),
        '@util': resolve('src/utils'),
        '@comp': resolve('src/components'),
        '@style': resolve('src/styles')
      }
    },
    // 外部拓展
    externals: {
      vue: 'Vue'
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/](element-ui)[\\/]/,
            name: 'vendor-element',
            chunks: 'all'
          }
        }
      }
    }
  },
  chainWebpack: config => {
    // 预加载，它可以提高第一屏的速度，建议打开
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // 添加忽略 runtime.js，vue-cli默认没有 runtime
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])
    // 预读取，当有很多页面时，会导致太多无意义的请求
    config.plugins.delete('prefetch')
    config.when(process.env.NODE_ENV !== 'development', config => {
      // 开启gzip压缩
      config.plugin('compressionPlugin').use(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(css|js)$'),
          threshold: 10240,
          minRatio: 0.8
        })
      )
    })
  },
  productionSourceMap: false,
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      scss: {
        // 注意：在 sass-loader v7 中，这个选项名是 "data" 7+使用prependData   此项目用的7+版本
        // 注意：在 sass-loader v10 使用 additionalData，这里为了兼容vite，所以升级了sass-loader@10
        additionalData: getAdditionalData(`@import '@style/variables.scss';`)
      }
    }
  },
  devServer: {
    port: 9000
  },
  pluginOptions: {
    vite: {
      /**
       * Plugin[]
       * @default []
       */
      plugins: [
        viteCommonjs({
          // lodash不需要进行转换
          exclude: ['lodash']
        })
      ], // other vite plugins list, will be merge into this plugin\'s underlying vite.config.ts
      /**
       * Vite UserConfig.optimizeDeps options
       * recommended set `include` for speedup page-loaded time, e.g. include: ['vue', 'vue-router', '@scope/xxx']
       * @default {}
       */
      optimizeDeps: {},
      /**
       * type-checker, recommended disabled for large-scale old project.
       * @default false
       */
      disabledTypeChecker: true,
      /**
       * lint code by eslint
       * @default false
       */
      disabledLint: false,
      /**
       * enable css-loader url resolve compat
       * disabled it if you do not use `~@/assets/logo.png` for better performance.
       * @default true
       */
      cssLoaderCompat: false,
      vitePluginVue2Options: {
        jsx: true
      }
    }
  }
}
