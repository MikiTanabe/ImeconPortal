<template>
    <div>
        <div class="modal fade" :id="target" tabindex="-1" >
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header" v-if="windowTitle!=''">
                        <h5 class="modal-title">{{ windowTitle }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            ×
                        </button>
                    </div>
                    <div class="modal-body">
                        <slot />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-gray" data-dismiss="modal">閉じる</button>
                        <button v-if="btn2" type="button" class="btn-green" @click="click">{{ btn2Txt }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ModalWindow',
        data() {
            return {
                windowTitle: ''
            }
        },
        props: {
            target: {
                type: String,
                default: 'modal-window'
            },
            btn2: {
                type: Boolean,
                default: false
            },
            btn2Txt: {
                type: String,
                default: ''
            }
        },
        methods: {
            click: function () {
                this.$emit('click')
            }
        }
    }
</script>