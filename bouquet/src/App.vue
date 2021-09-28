<template>
  <div id="title">
    <Header />
    <div class="container">
        <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { facebookAppId } from '@/_helpers/init-facebook-sdk'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  methods: {
    async initFacebook() {
      window.fbAsyncInit = function () {
        window.FB.init({
            appId: facebookAppId,
            cookie: true,
            version: 'v13.0'
        })
      }
    },
    async loadfacebookSDK(d, s, id) {
      var js,
      fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
          return;
      }
      js = d.createElement(s)
      js.id = id;
      js.src="https://connect.facebook.net/en_JP/sdk.js"
      fjs.parentNode.insertBefore(js, fjs)
    },
  },
  created : async function () {
    //FaceBookSDKの読み込み
    await this.loadfacebookSDK(document, "script", "facebook-jssdk")
    await this.initFacebook()
  }
}
</script>

<style>
  @import 'css/main.css';
  @import 'css/scroll.css';
</style>
