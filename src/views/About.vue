<template>
  <div>
    <canvas ref="localCanvas" id="localCanvas" width="200" height="100"></canvas>
    <button @click="login">登录</button>
    <button @click="startPreviewButton">开启预览</button>
  </div>
</template>

<script>
const zgEngine = window.require('zego-express-engine-electron/ZegoExpressEngine')
// eslint-disable-next-line no-unused-vars
const zgDefines = window.require('zego-express-engine-electron/ZegoExpressDefines')
export default {
  created () {
    // 以下为常用的房间相关回调
    // 房间状态更新回调
    zgEngine.on('onRoomStateUpdate', (param) => {
      console.log('房间状态更新回调')
    // 根据需要实现事件回调
    })

    // 用户状态更新回调
    zgEngine.on('onRoomUserUpdate', (param) => {
      console.log('用户状态更新回调')
    // 根据需要实现事件回调
    })

    // 流状态更新回调
    zgEngine.on('onRoomStreamUpdate', (param) => {
      console.log('流状态更新回调')
    // 根据需要实现事件回调
    })
  },
  mounted () {
    const appID = 1457522570
    const appSign = '5a06b17b664e906881f45effe6e5a3cebc7f890eb53125eb16ccf5f95cc4a7a3'
    // 采用测试环境
    const isTestEnv = true
    // 采用通用场景
    const scenario = zgDefines.ZegoScenario.General
    zgEngine.init(appID, appSign, isTestEnv, scenario)
      .then(() => {
        console.log('init succeed')
      }).catch((e) => {
        console.log('init failed', e)
      })

    // 取一个canvas元素
  },
  methods: {
    login () {
      zgEngine.loginRoom('9999', { userID: 'TheUserID', userName: 'TheUserName' })
    },
    startPreviewButton () {
      const localCanvas = this.$refs.localCanvas
      console.log(localCanvas)
      // 启动本地预览
      zgEngine.startPreview({
        canvas: localCanvas,
        viewMode: 1
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
