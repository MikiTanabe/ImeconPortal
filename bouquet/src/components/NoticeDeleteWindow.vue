<template>
    <div>
        <delete-button :modal="true" :target="targetName" :disable="!deleteAble">btnText</delete-button>
        <modal-window :target="targetName" :btn2="true" :btn2Txt="btnText" @click="click">
            <div>
                {{ message }}
            </div>
        </modal-window> 
    </div>
</template>
<script>
    import ModalWindow from '@/components/ModalWindow'
    import DeleteButton from '@/components/DeleteButton'

    export default {
        name: 'NoticeDeleteWindow',
        components: {
            ModalWindow,
            DeleteButton
        },
        data() {
            return {
                targetName: 'notice-delete'
            }
        },
        props: {
            prMessage: {
                type: String,
                default: ''
            },
            deleteAble: {
                type: Boolean,
                default: true
            },
            prBtnText: {
                type: String,
                default: ''
            }
        },
        computed: {
            message: function () {
                return this.prMessage
            },
            btnText: function () {
                return this.prBtnText
            }
        },
        methods: {
            click: function () {
                const modalName = '#' + this.targetName
                this.$emit('click')
                $( modalName ).modal('hide')
            }
        }
    }
</script>