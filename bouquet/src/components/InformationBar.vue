<template>
    <div class="row">
        <div class="col-12 col-md-10">
            <div class="info-box px-1">
                <p class="mb-n1 small text-nowrap">Information<fa-icon :icon="['fas', 'exclamation']" class="exclamation" /></p>
                <div>
                    <p class="mb-n1 text-nowrap">{{ message }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'InformationBar',
        data() {
            return {
                message: 'お知らせはありません'
            }
        }
    }
</script>
<style scoped>
    .info-box {
        border-top: solid black 1px;
        border-bottom: solid black 1px;
        padding: 2px;
    }

    .exclamation {
        color: red;
        font-size: 0.8em;
        margin-left: 0.3em;
    }
</style>