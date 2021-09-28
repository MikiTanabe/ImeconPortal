<template>
    <div>
        <h3>{{ objEventData.title }}</h3>
        <div class="row">
            <div class="col-12 mt-3 d-flex flex-column align-items-center">
                <div class="col-10 col-md-6 d-flex">
                    <img :src="objEventData.imgUrl" class="img-fluid">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="text-left col-12 mt-3 event-detail">
                <p>{{ objEventData.introduction }}</p>
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
                        <tr><td>開催日: </td><td>{{ objEventData.date }}</td></tr>
                        <tr v-if="objEventData.txtUrl!='イベントURL'&&objEventData.txtUrl!=='undefined'&&objEventData.txtUrl!=''"><td>イベントURL: </td><td>{{ objEventData.txtUrl }}</td></tr>
                        <tr><td>主催者: </td><td><a href="javascript:void(0)" @click="hostClick(objEventData.uid)" class="notice-link">{{ objEventData.consultantName }}</a><span v-if="objEventData.salonName!='サロン名'"> / <a href="javascript:void(0)" @click="hostSalonClick" class="notice-link">{{ objEventData.salonName }}</a></span></td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row">
            <div class="col-12 mt-3">
                <h4 class="mb-3">参加者</h4>
                <guest-list :prGuestList="guestsList" />
            </div>
        </div>
    </div>
</template>
<script>
    import { db } from '@/firebase/firestore'
    import { formatDate } from '@/scripts/functions'
    import GuestList from '@/components/GuestList.vue'
    import { pushSalonPage, pushConsultantProfile } from '@/scripts/routerPush'

    const componentName = 'EventPage'

    /* indexedDB設定
    const IDBKey = 'eventpage'
    const objectstore = 'bouquet'
    const defaultIDBData = {
        key: IDBKey,
        data: {}
    }
    */

    export default {
        name: componentName,
        components: {
            GuestList
        },
        data() {
            return {
                objEventData: () => {[]}
            }
        },
        props: {
            prEvid: {
                type: String,
                default: ''
            }
        },
        computed: {
            evid: function () {
                return this.prEvid
            },
            guestsList: function () {
                return this.objEventData.join
            }
        },
        methods: {
            getEventData: async function () {
                return new Promise((resolve, reject) => {
                    if(this.evid==''){
                        reject()
                    }
                    const docRef = db.collection('events').doc(this.evid)
                    docRef.get().then(doc => {
                        if(doc.exists){
                            this.objEventData = doc.data()
                            this.objEventData.date = formatDate(this.objEventData.date.toDate(), '/')
                            resolve()
                        } else {
                            reject()
                        }
                    })
                })
            },
            hostClick: async function () {
               const docRef = db.collection('consultants')
               let query = docRef.where('uid', '==', this.objEventData.uid)
               var objConsultantData = await query.get().then(docSnap => {
                   return new Promise(resolve => {
                        docSnap.forEach(doc => {
                            resolve(Object.assign(doc.data()))
                        })
                   })
               })
               pushConsultantProfile(this, objConsultantData)
            },
            hostSalonClick: async function () {
                const docRef = await db.collection('salons')
                let query = docRef.where('userID', '==', this.objEventData.uid)
                var objSalonData = await query.get().then(docSnap => {
                    return new Promise(resolve => {
                        docSnap.forEach(doc => {
                            resolve(Object.assign(doc.data()))
                        })
                    })    
                })
                pushSalonPage(this, objSalonData)
            }
        },
        mounted() {
            this.getEventData()
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