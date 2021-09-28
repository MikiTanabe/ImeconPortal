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
                    <a :href="consultantData.urlBlog" target="blank" v-if="consultantData.urlBlog!=''"><fa-icon :icon="['fab', 'home']" /></a>
                </div>
                <p v-if="consultantData.showBirth" class="mt-2 small">{{ birthYear }}年生まれ</p>
                <p style="white-space: pre-wrap"> {{ consultantData.introduction }}</p>
                <p class="small">{{ consultantData.certification }}</p>
            </div>
            <a href="javascript:void(0)" @click="$router.back()" class="notice-link">>>戻る</a>
        </div>
    </div>
</template>
<script>
    import json from '@/scripts/consultantsFormat.json'
    const thisName = 'ConsultantProfile'
    
    export default {
        name: thisName,
        props: {
            prObjConsultantData: {
                type: Object,
                defdault: json,
                validator(val){
                    return val === 'undefined'? false: true
                } 
            }
        },
        computed: {
            consultantData: function () {
                return this.prObjConsultantData
            },
            birthYear: function () {
                return this.consultantData.birth.toDate().getFullYear()
            }
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