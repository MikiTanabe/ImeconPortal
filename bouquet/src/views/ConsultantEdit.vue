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
                        <span class="input-group-text" id="consultant-name-label">誕生年</span>
                    </div>
                        <input type="month" :bind="birth" placeholder="誕生年" aria-label="Birth"
                        area-describedby="birth-label" class="form-control">
                    </div>
                </div>
                <div class="input-group mb-3">
                    <div class="d-flex align-items-center">
                        <input type="checkbox" :bind="showBirth" class="d-inline-block mx-3">
                        <div>
                            <span>誕生年をプロフィールに表示する</span>
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
            }
        },
        created() {
            
        }
    }
</script>