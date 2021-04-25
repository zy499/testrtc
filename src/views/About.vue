<template>
  <div>

  </div>
</template>

<script>
const zgEngine = window.require('zego-express-engine-electron/ZegoExpressEngine')
// eslint-disable-next-line no-unused-vars
const zgDefines = window.require('zego-express-engine-electron/ZegoExpressDefines')
export default {

  mounted () {
    console.log('ZegoExpressEngine version:', zgEngine.getVersion())
  }
}
</script>

<style lang="scss" scoped>

</style>
