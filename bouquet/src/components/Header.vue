<template>
    <header class="fixed-top">
        <div class="row">
            <div class="col-12">
                <p class="small md-medium ml-1">イメージコンサルティングのイベント・サロン交流サイト</p>
            </div>
        </div>
        <div class="row">
            <div class="col-12 d-flex justify-content-center align-items-end">
                <div class="col-12 col-md-10 d-flex justify-content-between align-items-end mt-1 mt-lg-0">
                    <div class="col-5 col-md-4 col-lg-3 mx-0">
                        <router-link to="/">
                            <img src="@/img/bouquet_logo-long.png" class="img-fluid">
                        </router-link>
                    </div>
                    <div class="d-flex">
                        <span class="cl-darkpink d-none d-md-inline">▶︎</span>
                        <router-link :to="urlStr" class="notice-link">
                            <div class="d-flex flex-column justify-content-center align-items-center">
                                <fa-icon :icon="loginIcon" size="lg" class="icon d-block d-md-none" />
                                <p class="notice-link d-none d-md-block icon-p">{{ loginStr }}</p>
                            </div>
                        </router-link>
                        <span v-if="auth" class="d-none d-md-inline">／</span>
                        <a v-if="auth" href="javascript:void(0)" class="notice-link" @click="signout">
                            <div class="d-flex flex-column justify-content-center align-items-center">
                                <fa-icon :icon="['fas', 'sign-out-alt']" size="lg" class="icon d-block d-md-none" />
                                <p class="notice-link icon-p">サインアウト</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
    import firebase from '@/firebase/firestore'
    import { signOut } from '@/scripts/auth'

    export default {
        name: 'Header',
        data() {
            return {
                auth: false
            }
        },
        computed: {
            loginStr: function () {
                if(this.auth) {
                    return 'マイページ'
                } else {
                    return 'ログイン／\n新規登録'
                }
            },
            urlStr: function () {
                if(this.auth) {
                    return '/mypage/mypagehome'
                } else {
                    return '/signin'
                }
            },
            loginIcon: function () {
                if(this.auth) {
                    return ['fas', 'home']
                } else {
                    return ['fas', 'sign-in-alt']
                }
            }
        },
        methods: {
            signout: function () {
                signOut().then(() => {
                    this.$router.push('/').catch({})
                }).catch(e => {
                    console.log('Signount failed: ', e)
                    alert('サインアウト中にエラーが発生しました。時間を置いて再度お試しください。')
                })
            }
        },
        mounted() {
            firebase.auth().onAuthStateChanged(user => {
                this.auth = user? true: false
            })
        }
    }
</script>
<style scoped>
    header p {
        white-space: nowrap;
        margin: 0px;
    }

    .icon-p {
        margin: 0px;
        white-space: pre-line;
        font-size: 0.5em;
    }

    .icon {
        color: #c73576;
    }

    @media screen and (min-width:768px) {
        .icon-p {
            font-size: 1em;
            white-space: nowrap;
        }
    }
</style>