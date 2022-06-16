<template>
    <div class="col-12">
        <div class="row mb-3">
           <h2>コンサルタントプロフィール編集</h2>
        </div>
        <div class="row">
            <div class="col-12 col-md-8">
                <upload-img-form ref="imgForm" :prNumStorage="numStorage" :id="consultantID" :preview="prevImgUrl" :changePrvImg="true" @changePrvImg="changeImgFileCallback"/>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="consultant-name-label">コンサルタント名</span>
                    </div>
                    <input type="text" v-model="consulName" placeholder="コンサルタント名" aria-label="ConsultantName"
                    area-describedby="consultant-name-label" class="form-control">
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="birth-label">誕生年</span>
                    </div>
                    <input type="month" v-model="birth" placeholder="誕生年" aria-label="Birth"
                    area-describedby="birth-label" class="form-control">
                </div>
                <div class="input-group mb-3">
                    <div class="d-flex align-items-center">
                        <input type="checkbox" v-model="showBirth" class="d-inline-block mx-3" id="show-birth">
                        <label for="show-birth">
                            誕生年をプロフィールに表示する
                        </label>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="certification-label">資格等</span>
                    </div>
                    <input type="text" v-model="certification" placeholder="日本化粧品検定1級、カラーコーディネーター1級など" aria-label="Certification"
                    area-describedby="certification-label" class="form-control">
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="introduction-label">自己紹介文</span>
                    </div>
                    <textarea type="text" v-model="introduction" placeholder="自己紹介文" aria-label="Introduction"
                    area-describedby="introduction-label" class="form-control"></textarea>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="id-instagram">Instagram アカウント名</span>
                    </div>
                    <input type="url" v-model="igName" aria-label="IgName" placeholder="Instagram アカウント名"
                    area-describedby="url-blog-label" class="form-control">
                </div>
                <div class="my-3">
                    <p>Instagramアカウント名を登録するとトップページ・プロフィールページに投稿が表示されます。（ビジネスアカウントのみ）</p>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="id-instagram">Youtube チャンネルID</span>
                    </div>
                    <input type="url" v-model="youtuCh" aria-label="YoutuCh" placeholder="Youtube チャンネルID"
                    area-describedby="url-blog-label" class="form-control">
                </div>
                <div class="my-3">
                    <p>YoutubeチャンネルIDを登録するとトップページ・プロフィールページに投稿が表示されます。</p>
                </div>
                <!-- TODO: チャンネル名/アカウント名の登録 -->
                <!-- 未実装機能 STA -->
                <div class="d-flex flex-wrap justify-content-center">
                    <div class="col-12 col-md-6 d-none">
                        <button type="button" class="btn btn-danger btn-block">
                            <fa-icon :icon="['fab', 'youtube']" class="icon mr-2" disabled/>
                            Youtubeを連携する
                        </button>
                    </div>
                    <div class="col-12 col-md-6 d-none">
                        <button type="button" class="btn btn-dark btn-block">
                            <fa-icon :icon="['fab', 'instagram']" class="icon mr-2" disabled/>
                            Instagramを連携する
                        </button>
                    </div>
                </div>
                <div class="my-3 d-none">
                    <p>「Youtube、Instagramを連携する」ボタンをクリック後、承認していただくとトップページに承認したアカウントの投稿が表示されるようになります。</p>
                </div>
                <!-- 未実装機能 END -->
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="url-blog-label">ブログ・HP等</span>
                    </div>
                    <input type="url" v-model="urlBlog" aria-label="UrlBlog" placeholder="https://"
                    area-describedby="url-blog-label" class="form-control">
                </div>
                <div class="d-flex flex-wrap justify-content-start mb-3">
                    <pink-button @click="save()">{{ submitText }}</pink-button>
                    <notice-delete-window @click="del()" :prMessage="delMessage" :prBtnText="'削除'"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    //import json from '@/scripts/consultantsFormat.json'
    import UploadImgForm from '@/components/UploadImgForm'
    import { storageNumbers } from '@/scripts/picture'
    import { formatDate } from '@/scripts/functions'
    import { db } from '@/firebase/firestore'
    import { getUser } from '@/scripts/user'
    import { Consultant } from '@/models/consultantModel'
    import PinkButton from '@/components/PinkButton'
    import NoticeDeleteWindow from '@/components/NoticeDeleteWindow'

    const thisName = 'ConsultantEdit'

    export default {
        name: thisName,
        data() {
            return {
                profileImg: null,
                numStorage: storageNumbers.PROFILE,
                prevImgUrl: '',
                consultantData: this.prObjConsultantData,
                blnHavProfile: false,
                consultantID: null,
                delMessage: 'プロフィールを削除します。よろしいですか？'

            }
        },
        props: {
            prObjConsultantData: {
                type: Consultant,
                default: () => new Consultant()
            }
        },
        components: {
            UploadImgForm,
            PinkButton,
            NoticeDeleteWindow
        },
        computed: {
            birth: {
                get: function () {
                    return this.consultantData.birth
                },
                set: function (newVal) {
                    this.$set(this.consultantData, 'birth', newVal)
                }
            },
            certification: {
                get: function () {
                    return this.consultantData.certification
                },
                set: function (newVal) {
                    this.$set(this.consultantData, 'certification', newVal)
                }
            },
            consulName: {
                get: function () {
                    return this.consultantData.consulName
                },
                set: function (newVal) {
                    this.$set(this.consultantData, 'consulName', newVal)
                }
            },
            igName: {
                get: function () {
                    return this.consultantData.igName
                },
                set: function (newVal) {
                    this.$set(this.consultantData, 'igName', newVal)
                }
            },
            introduction: {
                get: function () {
                    return this.consultantData.introduction
                },
                set: function (newVal) {
                    this.$set(this.consultantData, 'introduction', newVal)
                }
            },
            keyWords: {
                get: function () {
                    return this.consultantData.keyWords
                },
                set: function (newVal) {
                    this.$set(this.consultantData, 'keyWords', newVal)
                }
            },
            profileImgUrl: {
                get: function () {
                    return this.consultantData.profileImgUrl
                },
                set: function (newVal) {
                    this.$set(this.consultantData, 'profileImgUrl', newVal)
                }
            },
            salonName: {
                get: function () {
                    return this.consultantData.salonName
                },
                set: function (newVal) {
                    this.$set(this.consultantData, 'salonName', newVal)
                }
            },
            salonID: {
                get: function () {
                    return this.consultantData.salonID
                },
                set: function (newVal) {
                    this.$set(this.consultantData, 'salonID', newVal)
                }
            },
            showBirth: {
                get: function () {
                    return this.consultantData.showBirth
                },
                set: function (newVal) {
                    this.$set(this.consultantData, 'showBirth', newVal)
                }
            },
            uid: {
                get: function () {
                    return this.consultantData.uid
                },
                set: function (newVal) {
                    this.$set(this.consultantData, 'uid', newVal)
                }
            },
            urlBlog: {
                get: function () {
                    return this.consultantData.urlBlog
                },
                set: function (newVal) {
                    this.$set(this.consultantData, 'urlBlog', newVal)
                }
            },
            youtuCh: {
                get: function () {
                    return this.consultantData.youtuCh
                },
                set: function (newVal) {
                    this.$set(this.consultantData, 'youtuCh', newVal)
                }
            },
            submitText: function () {
                return this.blnHavProfile ? "更新" : "新規登録"
            },
            defaultDate: function () {
                return formatDate(new Date(), '-')
            }
        },
        mounted: async function () {
            await this.getConsultantData()
        },
        methods: {
            getConsultantData: async function () {
                if (this.prObjConsultantData.blnHavProfile) {
                    //プロパティでデータが渡されている場合はfirebaseからのデータ取得を中止する
                    return
                }
                const user = await getUser()
                const docRef = db.collection('consultants')
                                 .where('uid', '==', user.get('id'))
                docRef.get().then(docSnapshot => {
                    docSnapshot.forEach(doc => {
                        if(doc.exists){
                            this.consultantData = new Consultant(doc)
                            this.prevImgUrl = doc.get('profileImgUrl')
                            this.blnHavProfile = true;
                            this.consultantID = doc.id
                        }
                        return true
                    })
                    return
                })
            },
            save: async function () {
                try {
                    const docRef = db.collection('consultants')
                    const doc = docRef.doc(this.consultantID)
                    const docGet = await doc.get()
                    this.consultantData.setDocData(this.consultantData)
                    if(docGet.exists && this.consultantID!='sample'){
                        // イベントの更新
                        if (docGet.get('profileImgUrl') != this.prevImgUrl) {
                            this.profileImgUrl = await this.$refs.imgForm.uploadImg()
                        }
                        this.consultantData.setDocData(this.consultantData)
                        await this.consultantData.update(doc)
                        // TODO: コンサルタントプロフィール画像アップロード
                        alert('コンサルタントプロフィールを更新しました')
                    } else {
                        console.log(this.consultantData)
                        await this.consultantData.add(docRef)
                        this.profileImgUrl = await this.$refs.imgForm.uploadImg()
                        await docRef.doc(this.consultantID).set(
                            {profileImgUrl: this.profileImgUrl},
                            {marge: true}
                        ).then(() => {
                            alert('コンサルタントプロフィールを新規登録しました')
                        })
                        this.$router.push('/mypage/mypagehome').catch({})
                    }
                } catch (e) {
                    console.log(e)
                    alert('コンサルタントプロフィールの' + (this.consultantID != 'sample' || this.consultantID !== 'undefined'? '更新': '追加') + 'に失敗しました')
                }
            },
            del: async function () {
                // TODO: 削除処理
                alert('削除')
            },
            /**
             * ファイルアップロードコンポーネント用画像選択時のコールバック関数
             * @param {String} val 選択画像URL
             */
            changeImgFileCallback: function (val) {
                this.prevImgUrl = val
            }
        }
    }
</script>