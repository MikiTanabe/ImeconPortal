<template>
    <div class="ml-n3 pr-2">
        <div class="row">
            <div class="col-12">
                <p class="small" v-if="user !== 'undefined'">{{ greet }}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                    <h6>メニュー</h6>
            </div>
        </div>
        <div id="menu-link">
            <div class="row">
                <div class="col-12">
                    <ul>
                        <li><router-link to="eventtop" class="active">イベントの管理</router-link></li>
                        <li>コンサルタントプロフィール</li>
                        <li>マイサロン</li>
                        <li>アカウント情報</li>
                        <li class="mt-1"><a href="javascript:void(0)" @click="signout" class="notice-link">サインアウト</a></li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <h6>管理メニュー</h6>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <ul>
                        <li>お問い合わせ</li>
                        <li>運営からのお知らせ</li>
                        <li>
                            <fa-icon :icon="['fab', 'instagram-square']" class="icon mr-2" />
                            <fa-icon :icon="['fab', 'twitter']" color="#1DA1F2" class="icon " />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { getUser } from '@/scripts/user'
    import { signOut } from '@/scripts/auth'

    export default {
        name: 'MenuLeftBar',
        data() {
            return {
                user: new Map()
            }
        },
        computed: {
            userId: {
                get: function () {
                    return this.user.get('id')
                },
                set: function (newVal) {
                    this.$set(this.user, 'id', newVal)
                }
            },
            userName: {
                get: function () {
                    return this.user.get('name')
                },
                set: function (newVal) {
                    this.$set(this.user, 'name', newVal)
                }
            },
            greet: function () {
                var greet = ''
                let time = (new Date).getHours()
                switch(time){
                    case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10:
                        greet = 'おはようございます'
                        break
                    case 11: case 12: case 13: case 14: case 15: case 16: case 17:
                        greet = 'こんにちは'
                        break
                    case 18: case 19: case 20: case 21: case 22: case 23: case 0: case 1: case 2: 
                        greet = 'こんばんは'
                        break
                }
                return greet + '、' + this.userName + 'さん'
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
        mounted: async function () {
            this.user = await getUser()
        }
    }
</script>
<style scoped>
    li {
        list-style: none;
        margin-left: -2.5em;
    }

    .icon {
        font-size: 1.8em;
    }

    #menu-link li {
        font-size: 0.9em;
    }

    @media screen and (min-width: 768px){
        #menu-link li {
            font-size: normal;
        }
    }

    .greet {
        
    }
</style>