<template>
  <div>
    <video
      v-if="rendered"
      :src-object.prop="localStream"
      autoplay
    ></video>
    <button @click="login">登录</button>
  </div>
</template>

<script>
import { ZegoExpressEngine } from 'zego-express-engine-webrtc'
// // 引入 ZegoExpressEngine
// const zgEngine = require('zego-express-engine-electron/ZegoExpressEngine')
// const zgDefines = require('zego-express-engine-electron/ZegoExpressDefines')

// // AppID 和 AppSign 由 ZEGO 分配给各 App；为了安全考虑，建议将 AppSign 存储在 App 的业务后台，需要使用时从后台获取
// const appID = 1457522570
// const appSign = '5a06b17b664e906881f45effe6e5a3cebc7f890eb53125eb16ccf5f95cc4a7a3'
// // 采用测试环境
// const isTestEnv = true
// // 采用通用场景
// const scenario = zgDefines.ZegoScenario.General
// zgEngine.init(appID, appSign, isTestEnv, scenario)
//   .then(() => {
//     console.log('init succeed')
//   }).catch((e) => {
//     console.log('init failed', e)
//   })
export default {
  data () {
    return {
      zg: null,
      appID: 1457522570,
      appSign:
        '5a06b17b664e906881f45effe6e5a3cebc7f890eb53125eb16ccf5f95cc4a7a3',
      userID: 99999,
      token: '',
      rendered: false,
      localStream: ''
    }
  },
  mounted () {
    // 初始化实例
    const zg = new ZegoExpressEngine(
      1457522570,
      'wss://webliveroom-test.zego.im/ws'
    )
    this.zg = zg
    this.getToken()
    // 房间状态更新回调
    zg.on('roomStateUpdate', (roomID, state, errorCode, extendedData) => {
      if (state === 'DISCONNECTED') {
        console.log('与房间断开了连接')
        // 与房间断开了连接
      }

      if (state === 'CONNECTING') {
        console.log('与房间尝试连接中')
        // 与房间尝试连接中
      }

      if (state === 'CONNECTED') {
        console.log('与房间连接成功')
        // 与房间连接成功
      }
    })

    // 用户状态更新回调
    zg.on('roomUserUpdate', (roomID, updateType, userList) => {
      console.warn(
        `roomUserUpdate: room ${roomID}, user ${updateType === 'ADD' ? 'added' : 'left'} `,
        JSON.stringify(userList)
      )
    })

    // 流状态更新回调
    zg.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
      if (updateType === 'ADD') {
        // 流新增，开始拉流
      } else if (updateType === 'DELETE') {
        // 流删除，停止拉流
      }
    })
  },
  methods: {
    getToken () {
      this.$axios
        .get('/api/token', {
          params: {
            app_id: this.appID,
            id_name: this.userID
          }
        })
        .then((response) => {
          this.token = response.data
        })
    },
    async login () {
      console.log(this.token)
      const result = await this.zg.loginRoom('zzz11', this.token, { userID: '99999', userName: 'xxx' })
      console.log(result)
      this.rendered = true
      if (result) {
        this.zg.createStream({
          camera: {
            video: true, audio: true
          }
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
