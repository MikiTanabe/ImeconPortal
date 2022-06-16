<template>
    <div>
        <h3>{{ eventData.data.title }}</h3>
        <div class="row">
            <div class="col-12 mt-3 d-flex flex-column align-items-center">
                <div class="col-10 col-md-6 d-flex">
                    <img :src="eventData.data.imgUrl" class="img-fluid">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="text-left col-12 mt-3 event-detail">
                <p>{{ eventData.data.introduction }}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="col-5 col-md-3 col-lg-2 d-flex justify-content-center data-title-box">
                    <p class="my-auto">INFORMATION</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 mt-1 data-box">
                <table class="table-sm table-clear">
                    <tbody>
                        <tr><td>開催日: </td><td>{{ formatDate(new Date(eventData.date), '/') }}</td></tr>
                        <tr v-if="eventData.data.txtUrl!='イベントURL'&&eventData.data.txtUrl!=='undefined'&&eventData.data.txtUrl!=''"><td>イベントURL: </td><td>{{ eventData.data.txtUrl }}</td></tr>
                        <tr><td>主催者: </td><td><a href="javascript:void(0)" @click="hostClick(eventData.data.uid)" class="notice-link">{{ eventData.data.consultantName }}</a><span v-if="eventData.data.salonId!=''"> / <a href="javascript:void(0)" @click="hostSalonClick" class="notice-link">{{ eventData.data.salonName }}</a></span></td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- 未実装機能
        <div class="row">
            <div class="col-12 mt-3">
                <h4 class="mb-3">参加者</h4>
                <guest-list :prGuestList="guestsList" />
            </div>
        </div> -->
    </div>
</template>
<script>
    import { db } from '@/firebase/firestore'
    import { formatDate } from '@/scripts/functions'
    // import GuestList from '@/components/GuestList.vue'
    import { pushSalonPage, pushConsultantProfile } from '@/scripts/routerPush'
    import { Event } from '@/models/eventModel'
    import { Consultant } from '@/models/consultantModel'

    const componentName = 'EventPage'

    /* indexedDB設定
    const IDBKey = 'eventpage'
    const objectstore = 'bouquet'
    const defaultIDBData = {
        key: IDBKey,
        data: {}
    }
    */
   // TODO: セッションに保存

    export default {
        name: componentName,
        components: {
            // GuestList
        },
        data() {
            return {
                
            }
        },
        props: {
            // prEvid: {
            //     type: String,
            //     default: ''
            // },
            prEventData: {
                default: new Event()
            }
        },
        computed: {
            eventData: function () {
                return this.prEventData
            }
            //guestsList: function () {
            //    return this.eventData.join
            //}
        },
        methods: {
            // ドキュメントデータはトップページで取得して渡される。
            // getEventData: async function () {
            //     return new Promise((resolve, reject) => {
            //         if(this.evid==''){
            //             reject()
            //         }
            //         const docRef = db.collection('events').doc(this.evid)
            //         docRef.get().then(doc => {
            //             if(doc.exists){
            //                 this.eventData = doc.data()
            //                 this.eventData.date = formatDate(this.eventData.date.toDate(), '/')
            //                 resolve()
            //             } else {
            //                 reject()
            //             }
            //         })
            //     })
            // },
            hostClick: async function () {
                const docRef = db.collection('consultants')
                const query = docRef.where('uid', '==', this.eventData.data.uid)
                const docs = await query.get()
                var objConsultantData = {}
                if (docs.empty) {
                    return
                }
                docs.forEach(doc => {
                    if (doc.exists) {
                        objConsultantData = doc
                    }
                })
                console.log(objConsultantData)
                pushConsultantProfile(this, new Consultant(objConsultantData))
            },
            hostSalonClick: async function () {
                if (this.eventData.data.dalonId == '') {
                    return
                }
                const doc = await db.collection('salons').doc(this.eventData.data.salonId)
                // const query = docRef.where('userID', '==', this.eventData.data.uid)
                // const docs = await query.get()
                // var objSalonData = {}
                // if (docs.exists) {
                //     docs.forEach(doc => {
                //         objSalonData = doc
                //     })
                // }
                if (doc.exists) {
                    pushSalonPage(this, doc.data())
                }
            },
            formatDate: function (date, separator) {
                return formatDate(date, separator)
            }
        },
        mounted() {
            // ドキュメントデータはトップページで取得して渡される。
            // this.getEventData()
        },
        beforedestroy() {
            //TODO: indexedDB
        }
    }
</script>
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');

    h3 {
        color: black;
        border-bottom: 1px solid black;
        width: 100%;
    }

    h4 {
        color: black;
        font-size: 1.2em;
        font-family: 'M PLUS 1p'
    }

    .event-detail {
        color: black;
    }

    .data-box {
        border-left: 1px solid #d06da3;
        margin-left: 1em;
    }

    .data-title-box {
        background-color: #d06da3;
    }

    .data-title-box p {
        color: white;
        font-family: 'Shadows Into Light', cursive;
        font-size: 1.2em;
    }

    @media screen and (min-width: 992px) {
        .data-title-box p {
            font-size: 1.5em;
        }
    }

    @media screen and (min-width: 768px) {
        h3 {
            width: 80%;
        }

        .data-box {
            padding-left: 0px;
        }
    }

    @media screen and (min-width: 576px) {
        .data-title-box p {
            font-size: 1.8em;
        }
    }
</style>