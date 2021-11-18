<template>
    <div class="row">
        <div class="col-12">
            <h2>新着イベント</h2>
            <!-- イベントリスト -->
            <p>{{ igList.get('igId') }}</p>
            <p>{{ igList.get('name') }}</p>
            <fb-login ref="fbLogin" />
        </div>
    </div>
</template>
<script>
    import { ObjectParseMap } from '@/scripts/functions'
    import FbLogin from '@/components/FbLogin.vue'
    
    //igList返却API
    const url = 'https://imecon.portal.api/api/photo/list'
    export default {
        name: 'Top',
        components: {
            FbLogin
        },
        data () {
            return {
                igList: new Map(),
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
                }).then(json => {
                    this.igId = json.id
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        mounted: async function () {
            var igList = await this.GetIGList()
            this.igList = igList != null
                        ? ObjectParseMap(igList)
                        : null;
            console.log(this.igList)
        }
    }
    

</script>