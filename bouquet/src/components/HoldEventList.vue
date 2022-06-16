<template>
    <div class="row">
        <div class="col-12">
            <table class="table dtable-sm">
                <thead>
                    <tr class="text-center">
                        <th class="title-title"><p>イベント名</p></th>
                        <th class="title-date"><p>開催日</p></th>
                        <th class="title-caption"><p>キャプション</p></th>
                        <th class="title-edit"><p>編集／削除</p></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="event in arrHoldEvents" :key="event.id">
                        <td class="title col-7"><p>{{ event.data.title }}</p></td>
                        <td class="date-str text-nowrap"><p>{{ event.date }}</p></td>
                        <td class="caption"><p>{{ event.data.introduction }}</p></td>
                        <td class="edit">
                            <p class="d-flex align-items-center justify-content-center">
                                <a href="javascript:void(0)" @click="editClick(event.id)" class="d-inline-block active">
                                    <fa-icon :icon="['fas', 'edit']" size="lg" />
                                </a>
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!--
            <div class="row">
                <div class="d-flex align-items-center col-12 mt-2">
                    <p class="text-nowrap mb-n1 mr-1"><a href="javascript:void(0)" @click="$router.push('EventEdit')" class="notice-link">イベントの追加</a></p>
                    <a href="javascript:void(0)" @click="$router.push('EventEdit')"><fa-icon :icon="['fas', 'plus']" size="lg" class="d-block new-event" /></a>
                </div>
            </div> -->
        </div>
    </div>
</template>
<script>
import { db } from '@/firebase/firestore'
import { getUser } from '@/scripts/user'
import { formatDate } from '@/scripts/functions'
import { Event } from '@/models/eventModel'

export default {
    name: 'HoldEventList',
    data() {
        return {
            arrHoldEvents: () => {[]}
        }
    },
    methods: {
        getHoldEvents: async function () {
            return new Promise((resolve, reject) => {
                const docRef = db.collection('events')
                getUser().then(user => {
                    return user.get('id')
                }).then(uid => {
                    return docRef.where('date', '>=', new Date())
                                 .where('uid', '==', uid)
                                 .orderBy('date', 'asc')
                                 .orderBy('upDate', 'asc')
                                 .limit(5)

                }).then(query => {
                    query.get().then(docSnap => {
                        var arrEvents = []
                        docSnap.forEach(doc => {
                            var eventData = {
                                date: formatDate(doc.data().date.toDate(), '-'),
                                id: doc.id,
                                data: doc.data()
                            }
                            arrEvents.push(eventData)
                        })
                        resolve(arrEvents)
                    }).catch(e => {
                        reject(e)
                    })
                })
            })
        },
        editClick_none: function (evId) {
            let objLink = {
                name: 'EventEdit',
                params: {
                    prEvId: evId
                }
            }
            this.$router.push(objLink).catch(() => {
                alert('エラーが発生しました。トップページに戻ります。')
                this.$router.push('/')
            })
        },
        /**
         * イベント編集ページへ遷移する
         * @param {number} id eventドキュメントID
         */
        editClick: function (id) {
            var tgEvent = new Event()
            this.arrHoldEvents.forEach(event => {
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
    },
    async mounted() {
        let array = await this.getHoldEvents()
        this.arrHoldEvents = array.concat()
    }
}
</script>
<style scoped>
    thead p {
        white-space: nowrap;
    }

    table p {
        margin: auto 0;
    }

    .title-date, .title-caption, .date-str, .caption {
        display: none;
    }

    .title-date p, .title-edit p{
        white-space: nowrap;
    }

    .new-event {
        background: crimson;
        color: white;
        padding: 2px;
        border-radius: 2px;
    }

    @media screen and (min-width:768px){
        .title-date, .title-caption, .date-str, .caption{
            display: table-cell;
        }

        .caption p{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 20em;
        }
    }

    /*
    @media screen and (min-width:992px){
        .caption {
            width: 25em;
        }
    }
    */
</style>