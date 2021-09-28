<template>
    <div class="content-wrapper d-flex align-items-end">
        <div v-for="guest in arrGuests" :key="guest.id">
            <div class="guest-wrapper col-12 col-md-5 d-flex flex-column">
                <img :src="guest.profileImgUrl" class="img-fluid">
                <p>
                    <a href="javascript:void(0)" @click="guestClick(guest.uid)" class="notice-link">{{ guest.consulName }}</a>
                    <span v-if="guest.salonName!='サロン名'"> / <a href="javascript:void(0)" @click="salonClick(guest.uid)" class="notice-link">{{ guest.salonName }}</a></span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import { db } from '@/firebase/firestore'
    import { getSalonDataUid } from '@/scripts/data'
    import { pushConsultantProfile, pushSalonPage } from '@/scripts/routerPush'

    export default {
        name: 'GuestList',
        data() {
            return {
                arrGuests: () => {[]},
            }
        },
        props: {
            prGuestList: {
                type: Array,
                default: () => {[]},
                validator(val){
                    return Array.isArray(val)&&val.length>0? true: false 
                }
            }
        },
        computed: {
            guestsList: function (){
                return this.prGuestList
            }
        },
        watch: {
            guestsList: function () {
                this.setGuestsData()
            }
        },
        methods: {
            getGuestData: async function (uid) {
                return new Promise((resolve, reject) => {
                    const docRef = db.collection('consultants')
                    let query = docRef.where("uid", "==", uid)
                    query.get().then(docSnap => {
                        docSnap.forEach(doc => {
                            let objGuest = doc.data()
                            objGuest.id = doc.id
                            resolve(objGuest)
                        })
                    }).catch(() => {
                        reject()
                    })
                })
            },
            setGuestsData: async function () {
                var wkArray = new Array()
                for(let i = 0; i < this.guestsList.length; i++){
                    wkArray.push(await this.getGuestData(this.guestsList[i]))
                }
                this.arrGuests = wkArray.concat()
            },
            salonClick: async function (uId) {
                var objSalonData = await getSalonDataUid(uId)
                pushSalonPage(this, objSalonData)
            },
            guestClick: function (uId) {
                var objConsultantData = Object.assign(this.arrGuests.filter(consultant => {
                    return consultant.uid == uId
                }))
                delete objConsultantData[0].id
                pushConsultantProfile(this, objConsultantData[0])
            }
        }
    }
</script>
<style scoped>
    p {
        white-space: nowrap;
    }
</style>