<template>
    <div>
        <div class="row" v-if="arrEvents.length<1">
            <div class="col-12">
                <p>参加予定のイベントはありません。</p>
            </div>
        </div>
        <div class="row" v-if="arrEvents.length>=1">
            <div class="col-12">
                <table class="table-sm table-palepink">
                    <thead>
                        <tr class="text-center">
                            <th class="title-title">イベント名</th>
                            <th class="title-date">開催日</th>
                            <th class="d-none d-lg-table-cell title-caption">キャプション</th>
                            <th class="d-none d-md-table-cell title-host">主催者</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="event in arrEvents" :key="event.id">
                            <td class="col-7"><a href="javascript:void(0)" @click="titleClick(event.id)" class="notice-link">{{ event.title }}</a></td>
                            <td><p class="text-nowrap">{{ event.date }}</p></td>
                            <td class="d-none d-lg-table-cell"><p class="caption">{{ event.introduction }}</p></td>
                            <td class="d-none d-md-table-cell">{{ event.hostName }} <span v-if="event.hostSalon!=''&&event.hostSalon!=='undefined'">/ {{ event.hostSalon }}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import { db } from '@/firebase/firestore'
    import { getUser } from '@/scripts/user'
    import { formatDate, sortObjectArrayTS } from '@/scripts/functions'

    export default {
        name: 'JoinEventList',
        data() {
            return {
                uid: '',
                arrEvents: () => {[]}
            }
        },
        methods: {
            getJoinEvents: async function () {
                return new Promise(resolve => {
                    const docRef = db.collection('events')
                    var arrEvents = new Array()
                    docRef.where("join", "array-contains", this.uid).get().then(docSnap => {
                        docSnap.forEach(doc => {
                            if(doc.get('date').toDate() <= new Date()){
                                return
                            }
                            let objEvent = {
                                id: doc.id,
                                title: doc.get('title'),
                                date: formatDate( doc.get('date').toDate(), '-' ),
                                timestamp: doc.get('date'),
                                introduction: doc.get('introduction'),
                                hostName: doc.get('consultantName'),
                                hostSalon: doc.get('salonName')
                            }
                            arrEvents.push(objEvent)
                        })
                        resolve(arrEvents)
                    })
                })
            },
            setEventsList: async function() {
                let arrEvents = await this.getJoinEvents()
                this.arrEvents = sortObjectArrayTS(arrEvents)
            },
            titleClick: function (evid) {
                let objLink = {
                    name: 'EventPageCh',
                    params: {
                        prEvid: evid
                    }
                }
                this.$router.push(objLink).catch({})
            }
        },
        mounted: async function () {
            const user = new Map(await getUser())
            this.uid = user.get('id')
            this.setEventsList()
        }
    }
</script>
<style scoped>
    .caption {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .title-title {
        width: 30%
    }

    @media screen and (min-width:768px){
        .caption {
            width: 15em;
        }
    }

    @media screen and (min-width:992px){
        .caption {
            width: 25em;
        }
    }
</style>