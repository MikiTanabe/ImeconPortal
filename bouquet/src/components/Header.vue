<template>
    <header class="fixed-top">
        <div class="row header-wrapper">
            <div class="col-12 h-100">
                <div class="d-none d-md-flex h-100">
                    <!-- PCメニュー START -->
                    <div class="col-4 d-flex flex-column h-100">
                        <div class="logo-wrapper">
                        <p class="small md-medium ml-1 d-none d-lg-block">イメージコンサルティングのイベント・サロン交流サイト</p>
                            <div class="d-flex justify-content-start align-items-center logo-img-wrapper">
                                <router-link to="/">
                                    <img src="@/img/bouquet_logo-long.png">
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-8 pl-4">
                        <div class="row">
                            <div class="col-12 p-0">
                                <div class="d-flex justify-content-end align-items-center">
                                    <div class="col-3 p-0">
                                        <button class="menuBtn" :class="{menuBtnActive: isCurrentPath.top}" type="button" @click="showContent('/')">
                                            <div class="d-flex align-items-center justify-content-center">
                                                <p>トップページ</p>
                                            </div>
                                        </button>
                                    </div>
                                    <div class="col-3 p-0">
                                        <button class="menuBtn" :class="{menuBtnActive: isCurrentPath.searchEvent}" type="button" @click="showContent('/searchevent')">
                                            <div class="d-flex align-items-center justify-content-center">
                                                <p>イベント検索</p>
                                            </div>
                                        </button>
                                    </div>
                                    <div class="col-3 p-0">
                                        <button class="menuBtn" :class="{menuBtnActive: isCurrentPath.searchSalon}" type="button" @click="showContent('searchSalon')">
                                            <div class="d-flex align-items-center justify-content-center">
                                                <p>サロン検索</p>
                                            </div>
                                        </button>
                                    </div>
                                    <div class="col-3 p-0">
                                        <div class="d-flex justify-content-center">
                                            <button type="button" @click="showContent(urlStr)" class="menuBtn" :class="{menuBtnActive: isCurrentPath.myPage}">
                                                <div class="d-flex flex-column justify-content-center align-items-center">
                                                    <fa-icon :icon="loginIcon" size="lg" class="icon d-block d-md-none" />
                                                    <p class="d-none d-md-block">{{ loginStr }}</p>
                                                </div>
                                                <!--
                                                <span v-if="auth" class="d-none d-md-inline">／</span>
                                                <a v-if="auth" href="javascript:void(0)" class="notice-link" @click="signout">
                                                    <div class="d-flex flex-column justify-content-center align-items-center">
                                                        <fa-icon :icon="['fas', 'sign-out-alt']" size="lg" class="icon d-block d-md-none" />
                                                        <p>サインアウト</p>
                                                    </div>
                                                </a>
                                                -->
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- PCメニュー END -->
                </div>
                <div class="d-flex d-md-none h-100">
                    <!-- スマホメニュー START -->
                    <div class="col-2"></div>
                    <div class="col-8 d-flex flex-column align-items-center p-0">
                        <div class="logo-wrapper">
                            <!-- キャッチコピー -->
                            <p class="text-wrap p-0">
                                イメージコンサルティングのイベント・サロン交流サイト
                            </p>
                            <!-- ロゴ -->
                            <div class="d-flex align-items-center logo-img-wrapper">
                                <router-link to="/">
                                    <img src="@/img/bouquet_logo-long.png">
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-2 d-flex justify-content-center align-items-center bg-beige">
                        <button @click="slideMenuOpenClose">
                            <fa-icon :icon="['fas', 'bars']" class="phone-menu" size="lg"/>
                        </button>
                    </div>
                    <div class="d-block d-md-none" v-if="!isStart">
                        <slide-menu :isOpen="slideMenuIsOpen" :auth="auth" @menuOpenClose="slideMenuOpenClose"/>
                    </div>
                <!-- スマホメニュー END -->
                </div>
            </div>
        </div>
    </header>
</template>
<script>
    import firebase from '@/firebase/firestore'
    import { signOut } from '@/scripts/auth'
    import SlideMenu from '@/components/SlideMenu.vue'

    export default {
        name: 'Header',
        components: {
            SlideMenu
        },
        data() {
            return {
                auth: false,
                currentPath: '',
                slideMenuIsOpen: false,
                isStart: true
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
            },
            isCurrentPath: function() {
                return {
                    searchSalon: '/searchSalon' == this.$route.path,
                    searchEvent: '/searchevent' == this.$route.path,
                    myPage: ('/signin' == this.$route.path ||
                             '/signup' == this.$route.path ||
                             this.$route.path.match('/mypage.*') != null),
                    top: '/' == this.$route.path
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
            },
            showContent: function (route) {
                //router-linkの代わり
                this.$router.push(route).catch({})
            },
            slideMenuOpenClose: function () {
                this.isStart = false
                this.slideMenuIsOpen = !this.slideMenuIsOpen
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