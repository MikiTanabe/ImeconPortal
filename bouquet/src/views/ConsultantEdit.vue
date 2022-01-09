<template>
    <div class="col-12">
        <div class="row mb-3">
           <h2>コンサルタントプロフィール編集</h2>
        </div>
        <div class="row">
            <div class="col-12 col-md-8">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="consultant-name-label">コンサルタント名</span>
                    </div>
                    <input type="text" :bind="consulName" placeholder="コンサルタント名" aria-label="ConsultantName"
                    area-describedby="consultant-name-label" class="form-control">
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="birth-label">誕生年</span>
                    </div>
                    <input type="month" :bind="birth" placeholder="誕生年" aria-label="Birth"
                    area-describedby="birth-label" class="form-control">
                </div>
                <div class="input-group mb-3">
                    <div class="d-flex align-items-center">
                        <input type="checkbox" :bind="showBirth" class="d-inline-block mx-3" id="show-birth">
                        <label for="show-birth">
                            誕生年をプロフィールに表示する
                        </label>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="certification-label">資格等</span>
                    </div>
                    <input type="text" :bind="certification" placeholder="日本化粧品検定1級、カラーコーディネーター1級など" aria-label="Certification"
                    area-describedby="certification-label" class="form-control">
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="introduction-label">自己紹介文</span>
                    </div>
                    <textarea type="text" :bind="introduction" placeholder="自己紹介文" aria-label="Introduction"
                    area-describedby="introduction-label" class="form-control"></textarea>
                </div>
                <div class="d-flex flex-wrap justify-content-center">
                    <div class="col-12 col-md-6">
                        <button type="button" class="btn btn-danger btn-block">
                            <fa-icon :icon="['fab', 'youtube']" class="icon mr-2" />
                            Youtubeを連携する
                        </button>
                    </div>
                    <div class="col-12 col-md-6">
                        <button type="button" class="btn btn-dark btn-block">
                            <fa-icon :icon="['fab', 'instagram']" class="icon mr-2" />
                            Instagramを連携する
                        </button>
                    </div>
                </div>
                <div class="my-3">
                    <p>「Youtube、Instagramを連携する」ボタンをクリック後、承認していただくとトップページに承認したアカウントの投稿が表示されるようになります。</p>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="url-blog-label">ブログ・HP等</span>
                    </div>
                    <input type="url" :bind="urlBlog" aria-label="UrlBlog"
                    area-describedby="url-blog-label" class="form-control">
                </div>
                <div class="d-flex flex-wrap justify-content-center mb-3">
                    <div class="col-12 col-md-6">
                        <button type="button" @click="Submit()" class="btn btn-block btn-primary">
                            {{ submitText }}
                        </button>
                    </div>
                    <div class="col-12 col-md-6">
                        <button type="button" @click="Submit(true)" class="btn btn-block btn-danger">
                            削除
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import json from '@/scripts/consultantsFormat.json'
    const thisName = 'ConsultantEdit'

    export default {
        name: thisName,
        data() {
            return {

            }
        },
        props: {
            prObjConsultantData: {
                type: Object,
                default: () => (json),
                validator(val){
                    return val === 'undefined'? false: true
                } 
            }
        },
        computed: {
            consultantData: function () {
                console.log(json)
                console.log(this.prObjConsultantData)
                return this.prObjConsultantData
            },
            birth: {
                get() {
                    return this.consultantData.birth
                },
                set(newVal) {
                    this.$set(this.consultantData, 'birth', newVal)
                }
            },
            blnHavProfile: {
                get() {
                    return this.consultantData.blnHavProfile
                },
                set(newVal) {
                    this.$set(this.consultantData, 'blnHavProfile', newVal)
                }
            },
            certification: {
                get() {
                    return this.consultantData.certification
                },
                set(newVal) {
                    this.$set(this.consultantData, 'certification', newVal)
                }
            },
            consulName: {
                get() {
                    return this.consultantData.consulName
                },
                set(newVal) {
                    this.$set(this.consultantData, 'consulName', newVal)
                }
            },
            consultantID: {
                get() {
                    return this.consultantData.consultantID
                },
                set(newVal) {
                    this.$set(this.consultantData, 'consultantID', newVal)
                }
            },
            igName: {
                get() {
                    return this.consultantData.igName
                },
                set(newVal) {
                    this.$set(this.consultantData, 'igName', newVal)
                }
            },
            introduction: {
                get() {
                    return this.consultantData.introduction
                },
                set(newVal) {
                    this.$set(this.consultantData, 'introduction', newVal)
                }
            },
            keyWords: {
                get() {
                    return this.consultantData.keyWords
                },
                set(newVal) {
                    this.$set(this.consultantData, 'keyWords', newVal)
                }
            },
            profileImgUrl: {
                get() {
                    return this.consultantData.profileImgUrl
                },
                set(newVal) {
                    this.$set(this.consultantData, 'profileImgUrl', newVal)
                }
            },
            salonName: {
                get() {
                    return this.consultantData.salonName
                },
                set(newVal) {
                    this.$set(this.consultantData, 'salonName', newVal)
                }
            },
            salonID: {
                get() {
                    return this.consultantData.salonID
                },
                set(newVal) {
                    this.$set(this.consultantData, 'salonID', newVal)
                }
            },
            showBirth: {
                get() {
                    return this.consultantData.showBirth
                },
                set(newVal) {
                    this.$set(this.consultantData, 'showBirth', newVal)
                }
            },
            uid: {
                get() {
                    return this.consultantData.uid
                },
                set(newVal) {
                    this.$set(this.consultantData, 'uid', newVal)
                }
            },
            urlBlog: {
                get() {
                    return this.consultantData.urlBlog
                },
                set(newVal) {
                    this.$set(this.consultantData, 'urlBlog', newVal)
                }
            },
            youtuCh: {
                get() {
                    return this.consultantData.youtuCh
                },
                set(newVal) {
                    this.$set(this.consultantData, 'youtuCh', newVal)
                }
            },
            submitText: function () {
                return this.blnHavProfile ? "更新" : "新規登録"
            }
        },
        created() {
            
        }
    }
</script>