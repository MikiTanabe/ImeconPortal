<template>
<div>
    <div class="row">
        <div class="col-12">
            <h2 class="title-gold with-circle">新着イベント</h2>
            <!-- イベントリスト -->
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="row">
                        <div class="col-12 p-0">
                            イベント1
                        </div>
                    </div>
                    <div class="row">
                        説明文
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="col-6 p-0">
                        イベント2
                        説明文
                    </div>
                    <div class="col-6 p-0">
                        イベント3
                        説明文
                    </div>
                    <div class="col-6 p-0">
                        イベント4
                        説明文
                    </div>
                    <div class="col-6 p-0">
                        イベント5
                        説明文
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
    const url = 'https://imecon.portal.api/api/photo/list'
    export default {
        name: 'Top',
        components: {
            //FbLogin
        },
        data () {
            return {
                igList: new Array(),
                igId: null
            }
        },
        methods: {
            GetIGList: async function() {
                return await fetch(url, {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include'
                }).then(async response => {
                    if (!response.ok){
                        throw new Error (await response.text())
                    }
                    return response.json()
                }).catch(error => {
                    console.log('リクエストエラー', error)
                })
            }
        },
        mounted: async function () {
            this.igList = await this.GetIGList()
            console.log(this.igList)
        }
    }
</script>