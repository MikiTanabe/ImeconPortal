<template>
</template>
<script>
    import json from '@/scripts/consultantsFormat.json'
    const thisName = 'ConsultantProfile'

    export default {
        name: thisName,
        data() {
            return {

            }
        },
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
            computed: {
                consultantData: function () {
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
                //TODO: consultantdataの展開
            
        }
        }
    }
</script>