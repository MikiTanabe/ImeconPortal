<template>
    <div>
        <button type="button" @click="click"><p><slot /></p></button>
    </div>
</template>
<script>
    export default {
        name: 'PinkButton',
        methods: {
            click: function () {
                this.$emit('click')
            }
        }
    }
</script>
<style scoped>
    button {
        background: #d06da3;
        color: white;
        border: solid 1px #d06da3;
        padding: 0.6em;
        margin-right: 3px;
    }

    button:hover {
        background: #c05d93;
        color: white;
        border: solid 1px #c05d93;
    }

    button:active {
        background: white;
        color: #c05d93;
        border: solid 1px #c05d93;
    }

    button p {
        white-space: nowrap;
        margin: auto 0;
    }
</style>