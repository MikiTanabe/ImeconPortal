<template>
    <div>
        <div class="row">
            <div class="col-12">
                <h1 class="text-nowrap ">マイページトップ</h1>
            </div>
        </div>
        <information-bar />
        <!-- 未実装機能
        <h2 class="mt-4">参加予定のイベント</h2>
        <join-event-list /> -->
        <h2 class="mt-4">主催イベント</h2>
        <p class="small">開催日の近い順に5件まで表示
            <button class="btn btn-link d-inline d-md-none" type="button">
                <span class="small">>イベント管理ページへ</span>
            </button>
        </p>
        <hold-event-list />
        <!-- イベント追加ボタンコンポーネント作成 -->
        <add-event-button />
        <!-- サロンパネル作成、設置 <salon-info-panel /> -->
    </div>
</template>
<script>
    import InformationBar from '@/components/InformationBar.vue'
    // import JoinEventList from '@/components/JoinEventList.vue'
    import HoldEventList from '@/components/HoldEventList.vue'
    import AddEventButton from '@/components/AddEventButton.vue'

    export default {
        name: 'MyPageHome',
        components: {
            InformationBar,
            // JoinEventList,
            HoldEventList,
            AddEventButton
        }
    }
</script>
<style>
</style>