<template>
    <div>
        <button type="button" id="loginbutton" @click="Login" v-if="!loggedIn">FaceBookログイン</button>
        {{ message }}
    </div>
</template>
<script>
    //import { loginWithFacebook } from '@/_helpers/init-facebook-sdk'
    import { facebookAppId } from '@/_helpers/init-facebook-sdk'

    const SCOPE = {
        scope: 'instagram_basic,pages_show_list'
    }

    export default {
        name: 'FbLogin',
        data () {
            return {
                token: null,
                message: null
            }
        },
        computed: {
            loggedIn: function () {
                console.log(this.token)
                if (this.token != null) {
                    return true
                } else {
                    return false
                }
            }
        },
        created : async function () {
            await this.initFacebook()
            await window.FB.getLoginStatus((async response => {
                if (response.status === 'connected') {
                    this.token = response.authResponse.accessToken
                } else {
                    await this.Login();
                }
            }),true)
        },
        methods: {
            initFacebook: async function() {
                window.fbAsyncInit = function () {
                  window.FB.init({
                      appId: facebookAppId,
                      cookie: true,
                      version: 'v13.0'
                  })
                }
            },
            Login: async function () {
                await window.FB.login((function(response) {
                   if (!response.authResponse) {
                       alert("Facebookログインがキャンセルされました。一部の機能がご利用いただけません。");
                   } else {
                       this.token = response.authResponse.token
                   }
                }), SCOPE);
                return false;
            },
        }
        //TODO: Instagram投稿の表示
    }
</script>