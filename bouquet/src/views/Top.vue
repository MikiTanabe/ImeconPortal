<template>
<div>
    <div class="row">
        <div class="col-12">
            <h2 class="title-gold with-circle">新着イベント</h2>
            <!-- イベントリスト -->
            <div class="row">
                <div class="col-12 col-md-6 p-0" v-if="0<eventList.length">
                    <div class="row">
                        <div class="col-12">
                            <img :src="eventList[0].imgUrl" class="img-fluid">
                        </div>
                    </div>
                    <div class="row">
                        <p class="event-caption">{{ eventList[0].introduction }}</p>
                    </div>
                </div>
                <div class="col-12 col-md-6" v-if="2<eventList.length">
                    <div class="row">
                        <div v-for="event in eventList.slice(1, 5)" :key="event.id" class="col-md-6 p-0" style="height: 17em;padding-right:2px;">
                            <div class="col-12 p-0">
                                <img :src="event.imgUrl" class="img-fluid">
                            </div>
                            <div class="bg-white col-12 d-flex align-items-center justify-content-center">
                                <p class="event-caption">{{ event.introduction }}</p>
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
            <h2 class="title-gold with-circle">Instagram</h2>
            <div class="row">
                <div class="col-12 col-md-3 p-0" v-for="igMedia in igList" :key="igMedia.media_url">
                    <a :href="igMedia.url" target="blank">
                        <img :src="igMedia.thumbnail_url" class="img-fluid" :alt="igMedia.caption">
                    </a>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6">
            <h2 class="title-gold with-circle">Youtube</h2>
            <div class="row">
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
    export default {
        name: 'Top',
        components: {
            //FbLogin
        },
        data () {
            return {
                igList: new Array(),
                eventList: new Array()
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
            this.igList = await igList;
            this.eventList = await eventList;
            console.log(this.igList)
            console.log(this.eventList)
        }
    }
</script>