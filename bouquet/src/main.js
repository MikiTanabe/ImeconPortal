import jQuery from 'jquery'
global.jquery = jQuery
global.$ = jQuery
window.$ = window.jQuery = require('jquery')
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'popper.js/dist/umd/popper'
import 'bootstrap/dist/js/bootstrap'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
//<script src="https://connect.facebook.net/en_US/sdk.js" crossorigin="anonymous"></script>
//import { initFacebookSdk } from './_helpers/init-facebook-sdk'

library.add(fas, far, fab)
Vue.component('fa-icon', FontAwesomeIcon)

Vue.config.productionTip = false
//Vue.config.devServer.https = true
//Vue.config.devServer.port = 8080

//window.FB = FB;
////jQuery.getScript("https://connect.facebook.net/en_US/sdk.js", () => {
//  FB.init({
//    appId: APP_ID,
//    version: 'v2.7',
//    autoLogAppEvents : true,
//    xfbml            : true,
//  })
//  //return FB;
////})

  //initFacebookSdk()
  //.then(FB => window.FB = FB)
  //.then(StartApp())
  StartApp();

function StartApp () {
  new Vue({
    BootstrapVue,
    router,
    render: h => h(App),
  }).$mount('#app')
}
