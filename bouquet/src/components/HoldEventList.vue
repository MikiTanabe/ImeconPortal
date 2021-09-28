<template>
    <div class="row">
        <div class="col-12">
            <table class="table-sm table-palepink">
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
                        <td class="title col-7"><p>{{ event.title }}</p></td>
                        <td class="date-str text-nowrap"><p>{{ event.dateStr }}</p></td>
                        <td class="caption"><p>{{ event.introduction }}</p></td>
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
            <div class="row">
                <div class="d-flex align-items-center col-12 mt-2">
                    <p class="text-nowrap mb-n1 mr-1"><a href="javascript:void(0)" @click="$router.push('EventEdit')" class="notice-link">イベントの追加</a></p>
                    <a href="javascript:void(0)" @click="$router.push('EventEdit')"><fa-icon :icon="['fas', 'plus']" size="lg" class="d-block new-event" /></a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { db } from '@/firebase/firestore'
import { getUser } from '@/scripts/user'
import { formatDate } from '@/scripts/functions'

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
                    return docRef.where('uid', '==', uid)
                }).then(query => {
                    query.get().then(docSnap => {
                        var arrEvents = []
                        docSnap.forEach(doc => {
                            if(doc.data().date.toDate() < new Date()){
                                return
                            }
                            var objData = doc.data()
                            objData.id = doc.id
                            objData.dateStr = formatDate(objData.date.toDate(), '-')
                            arrEvents.push(objData)
                        })
                        arrEvents.sort((first, second) => {
                            if(first.date > second.date){
                                return 1
                            } else if(first.date < second.date) {
                                return -1
                            } else {
                                return 0
                            }
                        })
                        resolve(arrEvents)
                    }).catch(e => {
                        reject(e)
                    })
                })
            })
        },
        editClick: function (evId) {
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
        }
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