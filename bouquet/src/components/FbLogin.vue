<template>
    <div>
        <button type="button" id="loginbutton" @click="Login" v-if="loggedIn">FaceBookログイン</button>
        {{ message }}
        {{ token }}
    </div>
</template>
<script>
    //import { loginWithFacebook } from '@/_helpers/init-facebook-sdk'
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
            loggedIn: function (token) {
                if (token != null && token !== 'undefined') {
                    return false
                } else {
                    return true
                }
            }
        },
        created : async function () { 
            window.$('#loginbutton,#feedbutton').removeAttr('disabled')
            window.FB.getLoginStatus((async response => {
                if (response.status === 'connected') {
                    this.token = response.authResponse.accessToken
                    this.getIgList(this.token)
                } else {
                    await this.Login();
                }
            }), SCOPE)
        },
        methods: {
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
            getIgList(token) {
                console.log(token);
                var url = 'https://graph.facebook.com/v12.0/me/accounts?access_token=' + this.token
                fetch(url, {
                    methods: 'GET'
                })
                .then(async response => {
                    if(!response.ok) {
                        this.message = 'IGリストの取得に失敗しました'
                    } else {
                        return response.json()
                    }
                })
                .then(json => {
                    this.message = json
                })
            }
        }
        //TODO: expressのDocker化
        //TODO: Instagram投稿の表示
    }
</script>