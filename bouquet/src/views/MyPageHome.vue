<template>
    <div>
        <div class="row">
            <div class="col-12">
                <h1 class="text-nowrap">マイページトップ</h1>
            </div>
        </div>
        <information-bar />
        <h2 class="mt-4">参加予定のイベント</h2>
        <join-event-list />
        <h2 class="mt-4">主催イベント</h2>
        <hold-event-list />
        <!-- サロンパネル作成、設置 <salon-info-panel /> -->
    </div>
</template>
<script>
    import InformationBar from '@/components/InformationBar.vue'
    import JoinEventList from '@/components/JoinEventList.vue'
    import HoldEventList from '@/components/HoldEventList.vue'

    export default {
        name: 'MyPageHome',
        components: {
            InformationBar,
            JoinEventList,
            HoldEventList
        }
    }
</script>
<style>
</style>