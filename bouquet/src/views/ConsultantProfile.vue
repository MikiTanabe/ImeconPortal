<template>
    <div class="col-12">
        <div class="col-12 col-md-10">
             <img :src="consultantData.profileImgUrl" class="img-fluid">
        </div>
        <div class="col-12">
            <div class="data-box col-12 col-md-3 col-lg-2 py-1 mt-3 text-center">
                <p class="my-auto">DATA</p>
            </div>
            <div class="data-detail-box col-12 mb-3 py-1 py-md-2 px-2 px-md-3 mt-1">
                <div class="d-md-flex align-items-md-center">
                    <p class="name mb-n1 mr-2">{{ consultantData.consulName }}</p>
                    <a :href="consultantData.igName" target="blank" v-if="consultantData.igName!=''" class="mr-1"><fa-icon :icon="['fab', 'instagram']" size="2x" color="black" /></a>
                    <a :href="consultantData.youtuCh" target="blank" v-if="consultantData.youtuCh!=''"><fa-icon :icon="['fab', 'youtube']" size="2x" color="black"/></a>
                    <a :href="consultantData.urlBlog" target="blank" v-if="consultantData.urlBlog!=''"><fa-icon :icon="['fas', 'home']" size="2x" /></a>
                </div>
                <p v-if="consultantData.showBirth" class="mt-2 small">{{ birthYear }}年生まれ</p>
                <p style="white-space: pre-wrap"> {{ consultantData.introduction }}</p>
                <p class="small">{{ consultantData.certification }}</p>
            </div>
            <a href="javascript:void(0)" @click="back()" class="notice-link">>>戻る</a>
        </div>
    </div>
</template>
<script>
    // import json from '@/scripts/consultantsFormat.json'
    import { getConsultantData } from '@/scripts/consultant'
    import { Consultant } from '@/models/consultantModel'
    import { pushConsultantEdit } from '@/scripts/routerPush'
    const thisName = 'ConsultantProfile'
    const PROF_EDIT = 'ConsultantEdit'
    let prevPageUrl = ''
    
    export default {
        name: thisName,
        data() {
            return {
                consultantData: this.prObjConsultantData,
                previousRoute: ""
            }
        },
        props: {
            prObjConsultantData: {
                type: Consultant,
                default: new Consultant()
            },
            prUid: {
                type: String,
                default: ''
            }
        },
        computed: {
            birthYear: function () {
                return new Date(this.consultantData.birth).getFullYear()
            },
            uid: function () {
                return this.prUid
            }
        },
        created: async function () {
            // データが渡されていない場合、fbからデータを取得する
            if (this.consultantData.consultantID == 'sample') {
                if (this.uid == '') {
                    alert('コンサルタントデータを取得できませんでした')
                    return
                }
                this.consultantData = await getConsultantData(this.uid)
            }
        },
        methods: {
            back: function () {
                console.log('from name: ', prevPageUrl)
                if (prevPageUrl == PROF_EDIT) {
                    // propを渡して編集ページに遷移する
                    pushConsultantEdit(this, this.consultantData)
                } else {
                    // 遷移元に戻る
                    this.$router.back()
                }
            }
        },
        beforeRouteEnter(to, from, next) {
            prevPageUrl = from.name
            next()
        }
    }
</script>
<style scoped>
    .data-box {
        background-color: black;
    }

    .data-box p {
        font-family: 'Kosugi', sans-serif;
        font-size: 2em;
        color: white;
    }

    .data-detail-box {
        border-left: 1px solid black;
    }

    .name {
        color: #c73576;
        font-size: 1.5em;
    }
</style>