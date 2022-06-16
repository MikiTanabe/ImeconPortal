<template>
    <div>
        <div class="row">
            <div class="col-12">
                <h2>イベント管理</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-10">
                <h3>主宰イベント</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <table class="table table-sm table-bordered table-hover">
                    <thead>
                        <tr class="text-center">
                            <th>
                                イベント名
                            </th>
                            <th class="d-none d-lg-cell">
                                イベント説明
                            </th>
                            <th>
                                イベント日時
                            </th>
                            <th colspan="2">
                                編集/削除
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="event in tgPage" :key="event.id">
                            <!-- ページング以下を表示 -->
                            <td>
                                {{ event.data.title }}
                            </td>
                            <td class="d-none d-lg-cell">
                                {{ event.data.introduction }}
                            </td>
                            <td>
                                {{ formatDate(new Date(event.date)) }}
                            </td>
                            <td class="text-center">
                                <button class="btn btn-sm btn-link" type="button" @click="editBtnClick(event.id)">編集</button>
                            </td>
                            <td class="text-center">
                                <button class="btn btn-sm btn-link" type="button">削除</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row">
            <div class="col-12 mt-n1">
                <p v-if="arrEvent.length <= 0">開催予定のイベントはありません。</p>
                <div class="d-flex align-items-center justify-content-center">
                    <button class="btn-sm btn-gold" @click="pageCount-=1" :disabled="pageCount<=1">◀︎</button>
                    <div><span>{{ pageCount }}/{{ maxPage }}ページ</span></div>
                    <button class="btn-sm btn-gold" @click="pageCount+=1" :disabled="maxPage<=pageCount">▶︎</button>
                </div>
            </div>
        </div>
        <add-event-button />
    </div>
</template>
<script>
    import { callFetchMethod, formatDate } from '@/scripts/functions'
    import { getUser } from '@/scripts/user'
    import { Event } from '@/models/eventModel'
    import { AddEventButton } from '@/components/AddEventButton.vue'

    const getEvUrl = 'https://imecon.portal.api/api/event/list'
    // ページング設定
    const PAGING = 5

    export default {
        name: 'EventTop',
        data(){
            return {
                arrEvent: new Array(),
                paging: PAGING,
                pageCount: 1,
                user: new Map(),
            }
        },
        components: {
            AddEventButton
        },
        computed: {
            /**
             * ページングの最大値
             */
            maxPage(){
                return Math.floor(this.arrEvent.length / this.paging) + 1
            },
            /**
             * ページ内の開始行
             */
            iStartRow() {
                return (this.pageCount < 2) ? 0 : ((this.pageCount - 1) * this.paging)
            },
            /**
             * ページ内の最終行
             */
            iEndRow() {
                return this.iStartRow + PAGING
            },
            /**
             * ページ内の配列
             */
            tgPage() {
                return this.arrEvent.slice(this.iStartRow, this.iEndRow)
            }
        },
        created: async function () {
            this.user = await getUser()
            await this.setEvent()
        },
        methods: {
            /**
             * イベント情報のセット
             */
            setEvent: async function () {
                this.arrEvent = await callFetchMethod(getEvUrl + '?uid=' +  this.user.get('id'))
                console.log(this.arrEvent)
            },
            /**
             * イベント編集ページへ遷移する
             * @param {number} id eventドキュメントID
             */
            editBtnClick: function (id) {
                var tgEvent = new Event()
                this.arrEvent.forEach(event => {
                    if (event.id == id) {
                        tgEvent.evId = event.id
                        tgEvent.date = new Date(event.date)
                        tgEvent.imgUrl = event.data.imgUrl
                        tgEvent.introduction = event.data.introduction
                        tgEvent.salonId = event.data.salonId
                        tgEvent.salonName = event.data.salonName
                        tgEvent.title = event.data.title
                        tgEvent.txtUrl = event.data.txtUrl
                        tgEvent.uid =  event.data.uid,
                        tgEvent.upDate = new Date(event.data.upDate)
                        return
                    }
                })
                this.$router.push({name: 'EventEdit', params: {prEventData: tgEvent}})
            },
            /**
             * 日付をフォーマットする
             */
            formatDate: function (date) {
                console.log(date)
                return formatDate(date, '-')
            }
        }
        
    }
</script>
<style scoped>

</style>