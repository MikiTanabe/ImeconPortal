<template>
<div>
    <div class="row">
        <div class="col-12">
            <h2 class="title-gold with-circle">新着イベント</h2>
            <!-- イベントリスト -->
            <div class="row">
                <div class="col-12 col-md-6 p-0" v-if="0<eventList.length">
                    <div class="row">
                        <div class="col-12 p-0">
                            <div class="square-box">
                                <img :src="eventList[0].imgUrl">
                                <div class="col-12 d-lg-flex event-caption-panel d-none d-lg-block">
                                    <p class="event-caption">{{ eventList[0].title }}</p>
                                </div>
                                <!-- TODO: イベントリンクを貼る -->
                                <div class="col-12 d-flex event-caption-panel">
                                    <p class="event-caption">{{ eventList[0].introduction }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6 p-0" v-if="1<eventList.length">
                    <div class="row">
                        <div v-for="event in eventList.slice(1, 5)" :key="event.id" class="col-md-6 p-0">
                            <div class="col-12 p-0">
                                <div class="square-box">
                                    <img :src="event.imgUrl">
                                    <div class="event-caption-panel col-12 d-flex align-items-center">
                                        <p class="event-caption p-0">{{ event.introduction }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <fb-login ref="fbLogin" /> -->
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-md-6">
            <h2 class="title-gold with-circle pt-2">Instagram</h2>
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
    
    //igList返却API
    const igUrl = 'https://imecon.portal.api/api/igmedia/list'
    const evUrl = 'https://imecon.portal.api/api/event/list'
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
                youtuList: new Array()
            }
        },
        methods: {
            /**
             * 登録ユーザのインスタグラム投稿を取得する
             * @returns {Object} IGMEDIAリスト
             */
            GetIGList: async function() {
                return await this.CallFetchMethod(igUrl)
            },
            /**
             * イベントリストを取得する
             * @returns {Object} イベントリスト
             */
            GetEventList: async function() {
                return await this.CallFetchMethod(evUrl)
            },
            /**
            * Youtube動画リストを取得する
            * @returns {Object} Youtube動画リスト
             */
            GetYoutuList: async function() {
                return await this.CallFetchMethod(youtuUrl)
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
            }
        },
        mounted: async function () {
            //Instagram投稿を取得する
            var igList = this.GetIGList()
            //イベントを取得する
            var eventList = this.GetEventList()
            //youtube動画を取得する
            var youtuList = this.GetYoutuList()
            this.igList = await igList;
            this.eventList = await eventList
            this.youtuList = await youtuList
        }
    }
</script>