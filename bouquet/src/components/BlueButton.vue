<template>
    <div class="d-inline-block">
        <button v-if="modal" type="button" data-toggle="modal" :data-target="'#' + target"><slot /></button>
        <button v-if="!modal" type="button" @click="click" :disabled="disabled"><slot /></button>
    </div>
</template>
<script>
    export default {
        name: 'BlueButton',
        methods: {
            click: function () {
                this.$emit('click')
            }
        },
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            modal: {
                type: Boolean,
                default: false
            },
            target: {
                type: String,
                default: 'modal-window'
            }
        }
    }

</script>
<style scoped>
    button {
        background: #0580cc;
        color: white;
        border: solid 1px #0580cc;
        padding: 10px 20px;
        margin-right: 4px;
        display: inline-block;
    }

    button:hover {
        background: white;
        color: #0580cc;
        border: solid 1px #0580cc;
    }

    button:active {
        background: white;
        color: #0580cc;
        border: solid 1px #0580cc;
    }
</style>