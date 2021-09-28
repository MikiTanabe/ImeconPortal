<template>
    <div class="row">
        <div class="col-12">
            <h2>新着イベント</h2>
            <!-- イベントリスト -->
            <p>{{ igList.get('igId') }}</p>
            <p>{{ igList.get('name') }}</p>
            <fb-login />
        </div>
    </div>
</template>
<script>
    import { ObjectParseMap } from '@/scripts/functions'
    import FbLogin from '@/components/FbLogin.vue'
    
    //igList返却API
    const url = 'http://localhost:3000/api/photo/list'
    export default {
        name: 'Top',
        components: {
            FbLogin
        },
        data () {
            return {
                igList: new Map()
            }
        },
        methods: {
            GetIGList: async function() {
                return await fetch(url, {
                                method: 'GET',
                                mode: 'cors',
                            }).then(async response => {
                                if (!response.ok){
                                    throw new Error (await response.text())
                                }
                                return response.json()
                            }).catch(error => {
                                console.log(error)
                            })
            }
        },
        created: async function () {
            var igList = await this.GetIGList()
            this.igList = ObjectParseMap(igList)
            console.log(this.igList)
        }
    }
</script>