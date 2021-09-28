<template>
    <button class="button" @click="click" :disabled="disabled"><slot /></button>
</template>
<script>
    export default {
        name: 'RedButton',
        methods: {
            click: function () {
                this.$emit('click')
            }
        },
        props: {
            disabled: {
                type: Boolean,
                default: false
            }
        }
    }

</script>
<style scoped>
    button {
        background: #ff5077;
        color: white;
        border: solid 1px #ff5077;
        padding: 10px 20px;
        margin-right: 4px;
        display: inline-block;
    }

    button:hover {
        background: white;
        color: #ff5077;
        border: solid 1px #ff5077;
    }

    button:active {
        background: white;
        color: #ff5077;
        border: solid 1px #ff5077;
    }
</style>