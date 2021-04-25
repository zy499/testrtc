module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'com.example.app',
        productName: 'Demo', // 项目名，也是生成的安装文件名，即aDemo.exe
        copyright: 'Copyright © 2021', // 版权信息
        directories: {
          output: './dist'// 输出文件路径
        },
        win: { // win相关配置
          icon: './public/favicon.ico', // 图标，当前图标在根目录下，注意这里有两个坑
          target: [
            {
              target: 'nsis', // 利用nsis制作安装程序
              arch: [
                'x64'// 64位
              ]
            }
          ]
        },
        nsis: {
          oneClick: false, // 是否一键安装
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          installerIcon: './public/favicon.ico', // 安装图标
          uninstallerIcon: './public/favicon.ico', // 卸载图标
          installerHeaderIcon: './public/favicon.ico', // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单图标
          shortcutName: 'Demo' // 图标名称
        }
      }
    }

  },
  devServer: {
    // overlay: {
    //   warnings: false,
    //   errors: true
    // },
    // 配置代理 （以接口 https://www.easy-mock.com/mock/5ce2a7854c85c12abefbae0b/api 说明）
    proxy: {
      '/api/': {
        target: 'https://wsliveroom-alpha.zego.im:8282',
        changeOrigin: true, // 是否改变域名
        ws: true,
        pathRewrite: {
          // 路径重写
          '^/api': '/' // 这个意思就是以api开头的，定向到哪里, 如果你的后边还有路径的话， 会自动拼接上
        }
      }
    }
    // 下边这个， 如果你是本地自己mock 的话用after这个属性，线上环境一定要干掉
    // after: require("./mock/mock-server.js")
  }
}
