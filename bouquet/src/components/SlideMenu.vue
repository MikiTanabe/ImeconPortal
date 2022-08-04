<template>
    <div>
        <div v-if="open" class="block-ui"></div>
        <div class="slide-menu p-2" :class="{'slide-in': open , 'slide-out': close }">
            <button @click="closeClick" class="btn" style="color: dimgray;">
                ×CLOSE
            </button>
            <div v-if="auth" class="d-flex align-items-center justofy-content-center pt-2">
                <div class="col-6 p-1 d-flex align-items-center justify-content-center" style="border-right: solid 1px #f5f3f2;">
                    <!-- TODO: スライドメニュー コンサルタントプロフィール編集画面 と 設定画面 リンク貼る-->
                    <a href="/mypage/consultantedit" class="d-block d-flex flex-column align-items-center justify-content-center">
                        <fa-icon :icon="['fas', 'user']" size="lg" class="d-block" style="color: dimgray;"/>
                    </a>
                </div>
                <div class="col-6 p-1 d-flex align-items-center justify-content-center">
                    <a href="/mypage/account" class="d-block d-flex flex-column align-items-center justify-content-center">
                        <fa-icon :icon="['fas', 'cog']" size="lg" class="d-block" style="color: dimgray;" />
                    </a>
                </div>
            </div>
            <ul>
                <li>
                    <a href="/searchevent">
                        イベント検索
                    </a>
                </li>
                <li>
                    <a href="/searchsalon">
                        サロン検索
                    </a>
                </li>
                <li>
                    <a :href="myPageUrl">
                        {{ myPageStr }}
                    </a>
                </li>
                <li v-if="auth">
                    <a href="/signout">
                        サインアウト
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'SlideMenu',
        data() {
            return {
                
            }
        },
        props: {
            isOpen: {
                default: false
            }
            ,
            auth: {
                default: false
            }
        },
        computed: {
            open () {
                return this.isOpen
            },
            close () {
                return !this.isOpen
            },
            myPageUrl () {
                return this.auth ? '/mypage/mypagehome' : '/signin'
            },
            myPageStr () {
                return this.auth ? 'マイページ' : 'ログイン'
            }
        },
        methods: {
            closeClick: function () {
                this.$emit('menuOpenClose')
            }
        }
    }
</script>
