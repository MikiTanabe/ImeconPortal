<template>
    <transition name="slide-in">
        <footer class="d-md-none fixed-bottom" v-if="auth" v-show="visible">
            <div class="row">
                <div class="col-12 pt-2 d-flex align-items-center justify-content-around">
                        <div class="col-2 d-flex flex-column align-items-center justify-content-center">
                            <router-link to="/mypage/mypagehome">
                                <div class="d-flex flex-column align-items-center justify-content-center">
                                    <fa-icon :icon="['fas', 'home']" size="2x" class="icon-azure" />
                                    <p>Mypageトップ</p>
                                </div>
                            </router-link>
                        </div>
                    <div class="col-2 d-flex flex-column align-items-center justify-content-center footer-btn">
                        <fa-icon :icon="['far', 'user-circle']" size="2x" class="icon-azure" />
                        <p>プロフィール</p>
                        <router-link to="/mypage/consultantedit" />
                    </div>
                    <div class="col-2 mr-1 d-flex flex-column align-items-center justify-content-center footer-btn">
                        <fa-icon :icon="['far', 'plus-square']" size="2x" class="icon-azure" />
                        <p>イベント追加</p>
                        <router-link to="/mypage/eventedit" />
                    </div>
                    <div class="col-2 d-flex flex-column align-items-center justify-content-center footer-btn">
                        <fa-icon :icon="['fas', 'crown']" size="2x" class="icon-azure" />
                        <p>サロン情報</p>
                        <router-link to="/mypage/salonedit" />
                    </div>
                    <div class="col-2 d-flex flex-column align-items-center justify-content-center footer-btn">
                        <fa-icon :icon="['fas', 'user-cog']" size="2x" class="icon-azure" />
                        <p>アカウント</p>
                        <router-link to="/mypage/account" />
                    </div>
                </div>
            </div>
        </footer>
    </transition>
</template>
<script>
    //import { signOut } from '@/scripts/auth'
    import firebase from '@/firebase/firestore'
    //import '@/scripts/jq-scroll-footer'
    var posiY

    export default {
        data() {
            return {
                auth: false,
                visible: false,
                start: 0
            }
        },
        mounted() {
            firebase.auth().onAuthStateChanged(user => {
                this.auth = user? true: false
            })

            //上にスワイプでフッターを表示、下にスクロールで非表示
            window.addEventListener("touchstart", this.start_check)
            window.addEventListener("touchmove", this.move_check)
        },
        methods: {
            handleScroll() {
                var scrollTop = 0
                scrollTop = document.documentElement.scrollTop || document.body.scrollTop
                if(!this.visible&&scrollTop > this.start && scrollTop > 50) {
                    this.visible = true
                }
                if(this.visible&&scrollTop < this.start) {
                    this.visible = false
                }
                this.start = scrollTop
            },
            //指が触れたときの処理
            start_check(event) {
                //現在のY座標を取得
                posiY = this.getY(event)
            },
            //指が移動中の処理
            move_check(event) {
                if(this.visible && posiY - this.getY(event) > 10) //10px以上移動で下スワイプと判断する
                {
                    //下→上
                    this.visible = false
                }
                else if(!this.visible && posiY - this.getY(event) < -30) //30px以上移動で上スワイプと判断する
                {
                    //上→下
                    this.visible = true
                }
            },
            getY(event) {
                //縦方向の座標を取得
                return (event.touches[0].pageY)
            }
        }
    }
</script>
<style scoped>
    p {
        font-size: 0.5em;
        color: azure;
        white-space: nowrap;
        padding-top: 0.3em;
        margin: 0px;
    }

    .icon-azure {
        color: azure;
        display: block;
    }

    .slide-in-enter-active {
        transition: all 0.1s;
    }

    .slide-in-leave-active {
        transition: all 0.1s;
    }

    .slide-in-enter {
        opacity: 100;
        transform: translateY(100%);
    }

    .slide-in-leave-to {
        opacity: 100;
        transform: translateY(100%);
    }
</style>