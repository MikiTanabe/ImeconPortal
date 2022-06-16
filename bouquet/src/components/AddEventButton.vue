<template>
    <div class="row">
        <div class="d-flex align-items-center col-12 mt-2">
            <button type="button" @click="$router.push('EventEdit')" class="btn-gold">
                イベントの追加 <fa-icon :icon="['fas', 'plus']" size="lg" />
            </button>
        </div>
    </div>
</template>
<script>

export default {
    name: 'AddEventButton'
}
</script>
