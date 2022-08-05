<template>
    <div>
        <div v-if="open" class="block-ui"></div>
        <div class="slide-menu p-2" :class="{'slide-in': open , 'slide-out': close }">
            <button @click="closeClick" class="btn" style="color: dimgray;">
                ×CLOSE
            </button>
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
