<template>
    <div>
        <button v-if="!modal" type="button" @click="click" :disabled="disable"><p><slot /></p></button>
        <button v-if="modal" type="button" data-toggle="modal" :data-target="'#' + target" :disabled="disable" @click="click"><slot /></button>
    </div>
</template>
<script>
    export default {
        name: 'DeleteButton',
        props: {
            disable: {
                type: Boolean,
                default: false
            },
            target: {
                type: String,
                default: 'modal-window'
            },
            modal: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            click: function () {
                this.$emit('click')
            }
        }
    }
</script>
<style scoped>
    button {
        background: white;
        color: #998888;
        border: solid 1px #998888;
        padding: 0.6em;
    }

    button:hover {
        background: #998888;
        color: white;
        border: solid 1px #998888;
    }

    button:disabled {
        background: #a1a1a1;
        color: gray;
        border: solid 1px #a1a1a1;
    }

    button p {
        white-space: nowrap;
        margin: auto 0;
    }
</style>