<template>
    <div>
        <div class="row">
            <div class="col-12">
                <h3>{{ titleTxt }}</h3>
            </div>
        </div>
        <form>
            <div class="form-group">
                <div class="row">
                    <label class="col-12" for="title">
                        <p>イベント名</p>
                    </label>
                </div>
                <div class="row">
                    <div class="col-12 col-md-10">
                        <input type="text" name="title" id="title" class="form-control" placeholder="新規イベント" v-model="title">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="row">
                    <label class="col-12">
                        <p>開催日</p>
                    </label>
                </div>
                <div class="row">
                    <div class="col-7 col-md-4">
                        <input type="date" id="date" class="form-control" v-model="date">
                    </div>
                </div>
            </div>
            <div class="row">
                <upload-img-form ref="imgForm" :prNumStorage="numStorage" :id="evId" :preview="prevImgUrl" />
            </div>
            <div class="form-group">
                <div class="row">
                    <label class="col-12" for="introduction">
                        <p>案内文</p>
                    </label>
                </div>
                <div class="row">
                    <div class="col-12">
                        <textarea id="introduction" name="introduction" v-model="introduction" class="form-control" rows="10"></textarea>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="row">
                    <label class="col-12" for="txt-url">
                        <p>イベントURL(Youtubeチャンネル、イベント告知ページ等)</p>
                    </label>
                </div>
                <div class="row">
                    <div class="col-12">
                        <input type="text" name="txt-url" id="txt-url" class="form-control" v-model="txtUrl" placeholder="https://">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="row">
                    <label class="col-12" for="join">
                        <p>参加者</p>
                    </label>
                </div>
                <div class="row">
                    <div class="col-12">
                        <select name="join" v-model="joinMembers" size="arrGuests.length" class="form-control" multiple>
                            <option v-for="guest in arrGuests" :key="guest.id" :value="guest.value" :label="guest.text"></option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 mt-1 d-flex">
                        <add-guest-window @click="getNewGuests"/>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="row">
                    <div class="col-10 d-flex">
                        <pink-button @click="saveClick">{{ saveStr }}</pink-button>
                        <notice-delete-window @click="deleteClick" :deleteAble="deleteAble" :prEvTitle="title"/>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <return-link :prpReturnText="'mypagehome'">>>マイページトップへ戻る</return-link>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import { db } from '@/firebase/firestore'
import format from '@/scripts/eventsFormat.json'
import { formatDate, copyObjectReactive } from '@/scripts/functions'
import UploadImgForm from '@/components/UploadImgForm'
import { storageNumbers } from '@/scripts/picture'
import PinkButton from '@/components/PinkButton'
import AddGuestWindow from '@/components/AddGuestWindow'
import NoticeDeleteWindow from '@/components/NoticeDeleteWindow'
import ReturnLink from '@/components/ReturnLink'
import { getUser } from '@/scripts/user'
import { getConsultantData } from '@/scripts/consultant'

    export default {
        name: 'EventEdit',
        data() {
            return {
                objEventData: format,
                numStorage: storageNumbers.EVENT,
                arrGuests: new Array(),
                prevImgUrl: '',
                joinMembers: new Array()
            }
        },
        components: {
            UploadImgForm,
            AddGuestWindow,
            PinkButton,
            NoticeDeleteWindow,
            ReturnLink
        },
        computed: {
            titleTxt: function () {
                return this.evId == 'sample'? 'イベントの新規作成': 'イベントの編集'
            },
            saveStr: function () {
                return this.evId == 'sample'? 'イベントを追加': 'イベントの更新'
            },
            evId: function () {
                return this.prEvId
            },
            deleteAble: function () {
                return this.evId == 'sample'? false: true
            },
            consultantName: {
                set: function (val) {
                    this.$set(this.objEventData, 'consultantName', val)
                },
                get: function () {
                    return this.objEventData.consultantName
                }
            },
            date: {
                set: function (val) {
                    this.$set(this.objEventData, 'date', new Date(val))
                },
                get: function () {
                    if(this.objEventData.date != this.defaultDate){
                        //firebaseから帰ってくる日付データが独自Objectのためparse処理を分岐
                        try{
                            return formatDate(this.objEventData.date.toDate(), '-')
                        } catch {
                            return formatDate(this.objEventData.date, '-')
                        }
                        
                    } else {
                        return this.objEventData.date
                    }
                }
            },
            delete: {
                set: function (val) {
                    this.$set(this.objEventData, 'delete', val == ''? new Array(): val)
                },
                get: function () {
                    return this.objEventData.delete == ''? new Array(): this.objEventData.delete
                }
            },
            imgUrl: {
                set: function (val) {
                    this.$set(this.objEventData, 'imgUrl', val)
                },
                get: function () {
                    return this.objEventData.imgUrl
                }
            },
            introduction: {
                set: function (val) {
                    this.$set(this.objEventData, 'introduction', val)
                },
                get: function () {
                    return this.objEventData.introduction
                }
            },
            join: {
                set: function (val) {
                    this.$set(this.objEventData, 'join', val == ''? new Array(): val)
                },
                get: function () {
                    return this.objEventData.join == ''? new Array(): this.objEventData.join
                }
            },
            preJoin: {
                set: function (val) {
                    this.$set(this.objEventData, 'preJoin', val == ''? new Array(): val)
                },
                get: function () {
                    return this.objEventData.preJoin == ''? new Array(): this.objEventData.preJoin
                }
            },
            salonId: {
                set: function (val) {
                    this.$set(this.objEventData, 'salonId', val)
                },
                get: function () {
                    return this.objEventData.salonId
                }
            },
            salonName: {
                set: function (val) {
                    this.$set(this.objEventData, 'salonName', val)
                },
                get: function () {
                    return this.objEventData.salonName
                }
            },
            title: {
                set: function (val) {
                    this.$set(this.objEventData, 'title', val)
                },
                get: function () {
                    return this.objEventData.title
                }
            },
            txtUrl: {
                set: function (val) {
                    this.$set(this.objEventData, 'txtUrl', val)
                },
                get: function () {
                    return this.objEventData.txtUrl
                }
            },
            uid: {
                set: function (val) {
                    this.$set(this.objEventData, 'uid', val)
                },
                get: function () {
                    return this.objEventData.uid
                }
            },
            upDate: {
                set: function (val) {
                    this.$set(this.objEventData, 'upDate', val)
                },
                get: function () {
                    return this.objEventData.upDate
                }
            },
            dateStr: {
                set: function (val) {
                    this.$set(this.objEventData, 'date', new Date(val))
                },
                get: function () {
                    return formatDate(this.objEventData.date.toDate(), '-')
                }
            },
            defaultDate: function () {
                return formatDate(new Date(), '-')
            }
        },
        props: {
            prEvId: {
                type: String,
                default: 'sample',
                validator(val) {
                   return (val == '' || val === 'undefined')? false: true
                }
            }
        },
        methods: {
            getEventData: async function () {
                return new Promise(resolve => {
                    const docRef = db.collection('events').doc(this.evId)
                    docRef.get().then(doc => {
                        if(doc.exists){
                            copyObjectReactive(doc.data(), this.objEventData, this)
                            this.prevImgUrl = doc.get('imgUrl')
                        }
                        resolve()
                    })
                })
            },
            getImgUrl: function (url) {
                this.imgUrl = url
            },
            saveClick: async function () {
                this.$set(this.objEventData, 'upDate', new Date())
                if(!Array.isArray(this.preJoin)){
                    this.preJoin = new Array()
                }
                if(!Array.isArray(this.join)){
                    this.join = new Array()
                }
                const docRef = db.collection('events')
                docRef.doc(this.evId).get().then(doc => {
                    if(doc.exists && this.evId!='sample'){
                        this.updateEvent()
                        .then(() => { alert('イベントデータを更新しました')})
                    } else {
                        this.addEvent()
                        .then(() => { alert('イベントを新規登録しました') })
                    }
                }).catch(e => {
                    console.log('データの更新に失敗しました', e)
                    alert('イベントデータの' + (this.evId != '' || this.evId !== 'undefined'? '更新': '追加') + 'に失敗しました')
                })
                this.$router.push('/mypage/mypagehome').catch({})
            },
            deleteClick: async function () {
                const docRef = db.collection('events').doc(this.evId)
                await docRef.delete()
                alert('イベント【' + this.title + '】を削除しました')
                this.$router.push('mypagehome').catch({})
            },
            getGuestsName: async function () {
                this.arrGuests.splice(0)
                const docRef = db.collection('consultants')
                var wkArray = new Array()
                //参加承認済
                for(let i = 0; i < this.join.length; i++){
                    let query = docRef.where('uid', '==', this.join[i])
                    await query.get().then(docSnap => {
                        docSnap.forEach(doc => {
                            let objGuest = {
                                value: doc.id,
                                text: doc.get('consulName') + '／' + doc.get('salonName')
                            }
                            wkArray.push(objGuest)
                        })
                    })
                }
                //招待承認待ち
                for(let i = 0; i < this.preJoin.length; i++){
                    let query = docRef.where('uid', '==', String(this.preJoin[i]))
                    await query.get().then(docSnap => {
                        docSnap.forEach(doc => {
                            let objGuest = {
                                value: doc.id,
                                text: doc.get('consulName') + '／' + doc.get('salonName') + '（招待中）'
                            }
                            wkArray.push(objGuest)
                        })
                    })
                }
                this.arrGuests = wkArray.slice()
            },
            getNewGuests: function (val) {
                val.forEach(guest => {
                    var wkArray = new Array()
                    if(!(this.preJoin.includes(guest)|| this.join.includes(guest))){
                        wkArray.push(guest)
                    }
                    this.preJoin = this.preJoin.concat(wkArray.slice())
                })
                this.getGuestsName()
            },
            addEvent: async function () {
                return new Promise((resolve, reject) => {
                    const docRef = db.collection('events')
                    this.setConsultantData()
                    .then(() => {
                        docRef.add(this.objEventData)
                    }).then(
                        this.$refs.imgForm.uploadImg()
                    ).then(
                        docRef.doc(this.evId).set(
                            {imgUrl: this.imgUrl},
                            {marge: true}
                        )
                    ).then(() => {
                        resolve()
                    })
                    .catch(() => {
                        reject()
                    })
                })
            },
            updateEvent: async function () {
                return new Promise((resolve, reject) => {
                    const docRef = db.collection('events')
                    this.setConsultantData()
                    .then(
                        //TODO: uploadImgをもう一度使えるようにする
                        this.$refs.imgForm.uploadImg()
                    .then(url => {
                        this.getImgUrl(url)
                        console.log('イベント画像取得')
                    }).then(() => {
                        console.log('イベントID: ', this.evId, this.objEventData)
                        docRef.doc(this.evId).set(this.objEventData, {marge: true})
                        console.log('イベント更新')
                    }).then(() => {
                        resolve()
                    }).catch(() => {
                        console.log('noCatch')
                        reject()
                    }))
                })
            },
            setConsultantData: async function () {
                return new Promise((resolve, reject) => {
                    getUser().then(mapUser => {
                        this.uid = mapUser.get('id')
                    }).then(() => getConsultantData(this.uid)
                    ).then(mapConsultant => {
                        this.consultantName = mapConsultant.get('name')
                        this.salonName = mapConsultant.get('salonName')
                    }).then(() => {
                        resolve()
                    }).catch(() => {
                        reject()
                    })
                })
            }
        },
        mounted: async function () {
            await this.getEventData()
            await this.getGuestsName()
            const user = await getUser()
            await getConsultantData(user.get('id'))
        },
        created() {
            //TODO: デフォルト日付を本日日付にする
            this.$set(this.objEventData, 'date', this.defaultDate)
        }
    }
</script>
<style scoped>
    #introduction {
        height: 10em;
    }

    @media screen and (min-width: 768px) {
        #introduction {
            height: 6em;
        }
    }

    @media screen and (min-width: 992px) {
        
    }

    label {
        margin-bottom: -0.1em;
    }

    label p {
        margin-bottom: -0.1em;
    }
</style>