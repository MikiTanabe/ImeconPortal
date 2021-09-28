<template>
    <p><router-link :to="returnText" class="notice-link"><slot /></router-link></p>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props: {
        prpReturnText: {
            type: String,
            default: '/'
        }
    },
    computed: {
        returnText: function () {
            return this.prpReturnText
        }
    }
}
</script>
<style scoped>
    p {
        
    }
</style>