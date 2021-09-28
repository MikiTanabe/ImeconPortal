<template>
    <div>
        <delete-button :modal="true" :target="targetName" :disable="!deleteAble">イベントを削除</delete-button>
        <modal-window :target="targetName" :btn2="true" :btn2Txt="'イベントを削除'" @click="click">
            <div>
                イベント【{{ evTitle }}】を削除します。
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
            prEvTitle: {
                type: String,
                default: ''
            },
            deleteAble: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            evTitle: function () {
                return this.prEvTitle
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