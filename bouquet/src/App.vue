<template>
  <div id="title">
    <Header />
    <div class="container-fluid px-3 px-md-5">
        <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
//import { facebookAppId } from '@/_helpers/init-facebook-sdk'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  methods: {
    async loadfacebookSDK(d, s, id) {
      var js,
      fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
          return;
      }
      //var fbParams = "#version=v2.2&appId="+ facebookAppId + "&xfbml=true&autoLogAppEvents=true"
      js = d.createElement(s)
      js.id = id;
      js.src="https://connect.facebook.net/en_JP/sdk.js" //+ fbParams
      fjs.parentNode.insertBefore(js, fjs)
    },
  },
  created : async function () {
    //FaceBookSDKの読み込み
    await this.loadfacebookSDK(document, "script", "facebook-jssdk")
  }
}
</script>

<style lang="scss">
  @import 'css/main.scss';
  @import 'css/scroll.css';
</style>
