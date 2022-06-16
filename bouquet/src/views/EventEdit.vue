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
                <upload-img-form ref="imgForm" :prNumStorage="numStorage" :id="evId" :preview="prevImgUrl" :changePrvImg="true" @changePrvImg="changeImgFileCallback" />
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
            <!-- 未来に実装
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
            </div> -->
            <div class="form-group">
                <div class="row">
                    <div class="col-10 d-flex">
                        <pink-button @click="saveClick">{{ saveStr }}</pink-button>
                        <notice-delete-window @click="deleteClick" :deleteAble="deleteAble" :prMessage="delMessage" :prBtnText="'削除'"/>
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
import { formatDate } from '@/scripts/functions'
import UploadImgForm from '@/components/UploadImgForm'
import { storageNumbers } from '@/scripts/picture'
import PinkButton from '@/components/PinkButton'
// import AddGuestWindow from '@/components/AddGuestWindow'
import NoticeDeleteWindow from '@/components/NoticeDeleteWindow'
import ReturnLink from '@/components/ReturnLink'
import { getUser } from '@/scripts/user'
import { Event } from '@/models/eventModel'
import { getConsultantData } from '@/scripts/consultant'
import { getSalonData } from '@/scripts/salon'

    export default {
        name: 'EventEdit',
        data() {
            return {
                eventData: this.prEventData,
                numStorage: storageNumbers.EVENT,
                arrGuests: new Array(),
                prevImgUrl: this.prEventData.imgUrl
            }
        },
        components: {
            UploadImgForm,
            // AddGuestWindow,
            PinkButton,
            NoticeDeleteWindow,
            ReturnLink
        },
        props: {
            prEventData: {
                type: Event,
                default: () => new Event()
            }
        },
        computed: {
            titleTxt: function () {
                return (this.evId == 'sample' || this.evId == '') ? 'イベントの新規作成': 'イベントの編集'
            },
            saveStr: function () {
                return (this.evId == 'sample' || this.evId == '') ? 'イベントを追加': 'イベントの更新'
            },
            evId: {
                get: function () {
                    return this.eventData.evId
                },
                set: function (val) {
                    this.$set(this.eventData, 'date', val)
                }
            },
            deleteAble: function () {
                return this.evId == 'sample'? false: true
            },
            consultantName: {
                get: function () {
                    return this.eventData.consultantName
                },
                set: function (val) {
                    this.$set(this.eventData, 'consultantName', val)
                }
            },
            date: {
                get: function () {
                    return formatDate(this.eventData.date, '-')
                },
                set: function (val) {
                    this.$set(this.eventData, 'date', new Date(val))
                },
            },
            /*
            delete: {
                set: function (val) {
                    this.$set(this.eventData, 'delete', val == ''? new Array(): val)
                },
                get: function () {
                    return this.eventData.delete == ''? new Array(): this.eventData.delete
                }
            },*/
            imgUrl: {
                get: function () {
                    return this.eventData.imgUrl
                },
                set: function (val) {
                    this.$set(this.eventData, 'imgUrl', val)
                }
            },
            introduction: {
                get: function () {
                    return this.eventData.introduction
                },
                set: function (val) {
                    this.$set(this.eventData, 'introduction', val)
                }
            },
            /*
            join: {
                set: function (val) {
                    this.$set(this.eventData, 'join', val == ''? new Array(): val)
                },
                get: function () {
                    return this.eventData.join == ''? new Array(): this.eventData.join
                }
            },
            preJoin: {
                set: function (val) {
                    this.$set(this.eventData, 'preJoin', val == ''? new Array(): val)
                },
                get: function () {
                    return this.eventData.preJoin == ''? new Array(): this.eventData.preJoin
                }
            },
            */
            salonId: {
                get: function () {
                    return this.eventData.salonId
                },
                set: function (val) {
                    this.$set(this.eventData, 'salonId', val)
                }
            },
            salonName: {
                get: function () {
                    return this.eventData.salonName
                },
                set: function (val) {
                    this.$set(this.eventData, 'salonName', val)
                }
            },
            title: {
                get: function () {
                    return this.eventData.title
                },
                set: function (val) {
                    this.$set(this.eventData, 'title', val)
                }
            },
            txtUrl: {
                get: function () {
                    return this.eventData.txtUrl
                },
                set: function (val) {
                    this.$set(this.eventData, 'txtUrl', val)
                }
            },
            uid: {
                get: function () {
                    return this.eventData.uid
                },
                set: function (val) {
                    this.$set(this.eventData, 'uid', val)
                }
            },
            upDate: {
                get: function () {
                    return this.eventData.upDate
                },
                set: function (val) {
                    this.$set(this.eventData, 'upDate', val)
                }
            },
            dateStr: {
                get: function () {
                    return formatDate(this.eventData.date.toDate(), '-')
                },
                set: function (val) {
                    this.$set(this.eventData, 'date', new Date(val))
                }
            },
            delMessage: function () {
                return 'イベント【' + this.title + '】を削除します。'
            }
        },
        methods: {
            getImgUrl: function (url) {
                this.imgUrl = url
            },
            saveClick: async function () {
                try {
                    const docRef = db.collection('events')
                    const doc = docRef.doc(this.evId)
                    const docGet = await doc.get()
                    console.log('docGet:', docGet)
                    if (this.evId == '' || this.evId == 'sample') {
                        // 新規登録の場合、ユーザ情報・コンサルタント情報・サロン情報を取得する
                        const user = await getUser()
                        this.uid = user.get('id')
                        const consultant = await getConsultantData(this.uid)
                        console.log('consulName:', consultant.get('consulName'))
                        this.consultantName = consultant.get('consulName')
                        const salon = await getSalonData(this.uid)
                        console.log('salonData:', salon)
                        this.salonId = salon.id
                        this.salonName = salon.get('name')
                    }
                    if (docGet.exists && this.evId!='sample') {
                        // イベントの更新
                        if (docGet.get('imgUrl') != this.prevImgUrl) {
                            this.imgUrl = await this.$refs.imgForm.uploadImg()
                        }
                        this.eventData.setDocData(this.eventData)
                        await this.eventData.update(doc)
                        alert('イベントデータを更新しました')
                    } else {
                        // イベントの新規登録
                        this.eventData.setDocData(this.eventData)
                        await this.eventData.add(docRef)
                        this.imgUrl = await this.$refs.imgForm.uploadImg()
                        await docRef.doc(this.evId).set(
                            {imgUrl: this.imgUrl},
                            {merge: true}
                        ).then(() => {
                            alert('イベントデータを新規登録しました')
                        })
                    }

                    // マイページホームに遷移する
                    this.$router.push('/mypage/mypagehome').catch({})
                } catch(e) {
                    console.log(e)
                    alert(this.titleTxt + 'に失敗しました')
                }
            },
            deleteClick: async function () {
                const docRef = db.collection('events').doc(this.evId)
                await docRef.delete()
                alert('イベント【' + this.title + '】を削除しました')
                this.$router.push('mypagehome').catch({})
            },
            /*
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
            }, */
            /*
            getNewGuests: function (val) {
                val.forEach(guest => {
                    var wkArray = new Array()
                    if(!(this.preJoin.includes(guest)|| this.join.includes(guest))){
                        wkArray.push(guest)
                    }
                    this.preJoin = this.preJoin.concat(wkArray.slice())
                })
                this.getGuestsName()
            }, */
            /*
            addEvent: async function () {
                return new Promise((resolve, reject) => {
                    const docRef = db.collection('events')
                    this.setConsultantData()
                    .then(() => {
                        docRef.add(this.eventData)
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
                    // this.setConsultantData()
                    .then(
                        //TODO: uploadImgをもう一度使えるようにする
                        this.$refs.imgForm.uploadImg()
                    .then(url => {
                        this.getImgUrl(url)
                        console.log('イベント画像取得')
                    }).then(() => {
                        console.log('イベントID: ', this.evId, this.eventData)
                        docRef.doc(this.evId).set(this.eventData, {marge: true})
                        console.log('イベント更新')
                    }).then(() => {
                        resolve()
                    }).catch(() => {
                        console.log('noCatch')
                        reject()
                    }))
                })
            },*/
            changeImgFileCallback: function (val) {
                this.prevImgUrl = val
            }
        },
        /*
        mounted: async function () {
            await this.getEventData()
            await this.getGuestsName()
            const user = await getUser()
            await getConsultantData(user.get('id'))
        },*/
        created() {
            //TODO: デフォルト日付を本日日付にする
            // this.$set(this.eventData, 'date', this.defaultDate)
            console.log(this.prEventData)
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