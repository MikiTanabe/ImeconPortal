<template>
<div>
    <div class="row">
        <div class="col-12">
            <h2 class="title-gold with-circle">新着イベント</h2>
            <div class="d-flex align-items-center justify-content-center" v-if="eventLoading">
                <div class="col-6">
                    <img src="@/img/loading.gif" class="img-fluid">
                </div>
            </div>
            <!-- イベントリスト -->
            <div class="row" v-if="eventList != null">
                <!-- 一件目のイベント -->
                <div class="col-12 col-md-6 p-0" v-if="0<eventList.length">
                    <div class="row">
                        <div class="col-12 p-0">
                            <div class="square-box hover-pointer-pointer" @click="eventClick(eventList[0])">
                                <img :src="eventList[0].imgUrl">
                                <div class="col-12 d-lg-flex event-caption-panel d-none d-lg-block">
                                    <p class="event-caption">{{ eventList[0].data.title }}</p>
                                </div>
                                <div class="col-12 d-flex event-caption-panel">
                                    <p class="event-caption">{{ eventList[0].data.introduction }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 2件目以降のイベント -->
                <div class="col-12 col-md-6 p-0" v-if="1<eventList.length">
                    <div class="row">
                        <div v-for="event in eventList.slice(1, 5)" :key="event.id" class="col-md-6 p-0">
                            <div class="col-12 p-0">
                                <div class="square-box hover-pointer-pointer" @click="eventClick(event)">
                                    <img :src="event.data.imgUrl">
                                    <div class="event-caption-panel col-12 d-flex align-items-center">
                                        <p class="event-caption p-0">{{ event.data.introduction }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p v-if="eventList == null">開催予定のイベント情報がありません。</p>
            <!-- <fb-login ref="fbLogin" /> -->
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-md-6">
            <h2 class="title-gold with-circle pt-2">Instagram</h2>
            <div class="d-flex align-items-center justify-content-center" v-if="igLoading">
                <div class="col-6">
                    <img src="@/img/loading.gif" class="img-fluid">
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-3 p-0" v-for="igMedia in igList" :key="igMedia.media_url">
                    <div class="square-box" style="overflow:hidden;">
                        <a :href="igMedia.url" target="blank">
                            <img :src="igMedia.thumbnail_url" class="img-fluid" :alt="igMedia.caption">
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6">
            <h2 class="title-gold with-circle pt-2">Youtube</h2>
            <div class="d-flex align-items-center justify-content-center" v-if="youtuLoading">
                <div class="col-6">
                    <img src="@/img/loading.gif" class="img-fluid">
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-3 p-0 overflow-hidden" v-for="youtube in youtuList" :key="youtube.id">
                    <div class="square-box">
                        <a :href="youtube.url" target="blank">
                            <img :src="youtube.thumbnails.default.url" class="img-fluid" :alt="youtube.title+'|'+youtube.description">
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
    //import FbLogin from '@/components/FbLogin.vue'
    import { pushEventPage } from '@/scripts/routerPush'
    
    //igList返却API
    const igUrl = 'https://imecon.portal.api/api/igmedia/list'
    const evUrl = 'https://imecon.portal.api/api/event/list/'
    const youtuUrl = 'https://imecon.portal.api/api/movie/list'
    export default {
        name: 'Top',
        components: {
            //FbLogin
        },
        data () {
            return {
                igList: new Array(),
                eventList: new Array(),
                youtuList: new Array(),
                eventLoading: true,
                youtuLoading: true,
                igLoading: true
            }
        },
        methods: {
            /**
             * 登録ユーザのインスタグラム投稿を取得する
             * @returns {Object} IGMEDIAリスト
             */
            GetIGList: async function() {
                return new Promise((resolve) => {
                    this.CallFetchMethod(igUrl)
                    .then(igList => {
                        this.igList = igList
                        this.igLoading = false
                        resolve()
                    })
                    .catch(() => resolve())
                })
            },
            /**
             * イベントリストを取得する
             * @returns {Object} イベントリスト
             */
            GetEventList: async function() {
                return new Promise(resolve => {
                    this.CallFetchMethod(evUrl)
                    .then(evList => {
                        this.eventList = evList
                        this.eventLoading = false
                        resolve()
                    })
                    .catch(() => resolve())
                })
            },
            /**
            * Youtube動画リストを取得する
            * @returns {Object} Youtube動画リスト
             */
            GetYoutuList: async function() {
                return new Promise(resolve => {
                    this.CallFetchMethod(youtuUrl)
                    .then(youtuList => {
                        this.youtuList = youtuList
                        this.youtuLoading = false
                        resolve()
                    })
                    .catch(() => resolve())
                })
            },
            /**
             * CORSでFetchメソッドを呼び出す
             * @param {String} url
             * @returns {Object} レスポンス
             */
            CallFetchMethod: async function(url) {
                return await fetch(url, {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include'
                }).then(async response => {
                    if (!response.ok) {
                        throw new Error(await response.text())
                    }
                    return response.json()
                }).catch(error => {
                    console.log('リクエストエラー', error)
                })
            },
            /**
             * イベント押下
             * @param {Event} イベントデータ
             */
            eventClick: function (event) {
                pushEventPage(this, event)
            }
        },
        created: async function () {
            //Instagram投稿を取得する
            // var igList = this.GetIGList()
            //イベントを取得する
            // var eventList = this.GetEventList()
            //youtube動画を取得する
            // var youtuList = this.GetYoutuList()
            await Promise.all([this.GetIGList(), this.GetEventList(), this.GetYoutuList()])
        }
    }
</script>
<style scss>
    .link {
        display: block;
        width: 100%;
        height: 100%;
    }
</style>