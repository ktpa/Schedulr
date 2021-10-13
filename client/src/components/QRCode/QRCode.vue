<template>
  <div class="qrcodewrapper">
    <div class="qrcode" v-html="this.image"></div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import { qrRender } from './qrRender'
export default {
  data() {
    return {
      url: window.location.href,
      image: ''
    }
  },
  beforeMount() {
    this.generateQR()
  },
  methods: {
    generateQR() {
      this.image = qrRender(
        QRCode.create(this.url, { errorCorrectionLevel: 'H' })
      )
    }
  }
}
</script>

<style scoped>
.qrcodewrapper {
  margin-top: 100px;
  width: 450px;
  height: 450px;
}
.qrcode {
  margin-top: '100px';
}
</style>
