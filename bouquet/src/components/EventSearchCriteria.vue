<template>
    <div class="row">
        <div class="col-12">
            <div class="col-12 col-md-3">
                <div class="input-group form-inline">
                    <input v-model="criteria.date" class="form-controle calender" :disabled="notUse" />
                    <select v-model="criteria.dateComparison">
                        <option v-for="item in selectList" v-bind:key="item.value" :value="item.value">
                            {{ item.text }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="col-12 col-md-3">
                <!-- TODO: フリーワードエリア -->
            </div>
        </div>
    </div>
</template>

<script>

const DATE_COMPARISON_NOUSE = -1
const DATE_COMPARISON_TODAY = 0
const DATE_COMPARISON_BEFORE = 1
const DATE_COMPARISON_AFTER = 2

export default {
    name: 'EventSearchCriteria',
    data() {
        return {
            criteria: {
                date: new Date(),
                dateComparison: 0,
                KeyWords: '' 
            },
            selectList: [
                {
                    text: '指定しない',
                    value: DATE_COMPARISON_NOUSE
                },
                {
                    text: '当日',
                    value: DATE_COMPARISON_TODAY
                },
                {
                    text: 'より前',
                    value: DATE_COMPARISON_BEFORE
                },
                {
                    text: '以降',
                    value: DATE_COMPARISON_AFTER
                }
            ]
        }
    },
    computed: {
        notUse() {
            return this.criteria.dateComparison == DATE_COMPARISON_NOUSE
        }
    }
}
</script>