<template>
<div class='qrcode'>
<a :href="image" download>
<img id='image' :src="image" alt='QR Code to easily share the current meeting'/>
</a>
</div>
</template>

<script>
import QRCode from 'qrcode'
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
      QRCode.toDataURL(this.url).then(url => {
        this.image = url
        console.log(url)
      })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.qrcode {
  display: flex;
  flex-wrap: wrap;
  width: 280px;
  align-content: flex-start;
  margin-left: 50px;
}

@media (max-width: 768px) {
  .qrcode {
    margin-top: 50px;
    margin-left: 25px;
  }
}
</style>
