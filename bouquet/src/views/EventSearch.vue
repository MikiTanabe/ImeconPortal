<template>
<div>
    <div class="row">
        <div class="col-12 mb-3">
            <div class="col-12 col-md-3">
                <div class="input-group form-inline">
                    <input v-model="criteria.date" class="form-control calender" :disabled="notUse" />
                    <select v-model="criteria.dateComparison">
                        <option v-for="item in selectList" v-bind:key="item.value" :value="item.value">
                            {{ item.text }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="col-12 col-md-3">
                <div class="input-group">
                    <input v-model="criteria.KeyWords" class="form-conrtol" />
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div v-for="event in eventList" v-bind:key="event.id">
                {{ event.name }}
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { callFetchMethodPost } from '@/scripts/functions'

const DATE_COMPARISON_NOUSE = -1
const DATE_COMPARISON_TODAY = 0
const DATE_COMPARISON_BEFORE = 1
const DATE_COMPARISON_AFTER = 2

const searchEvUrl = 'https://imecon.portal.api/api/typesense/events/list'

export default {
    name: 'EventSearch',
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
            ],
            eventList: () => new Array(),
            message: ''
        }
    },
    computed: {
        notUse() {
            return this.criteria.dateComparison == DATE_COMPARISON_NOUSE
        }
    },
    /**
     * 検索ボタン押下
     */
    searchClick: async function () {
        const data = await callFetchMethodPost(searchEvUrl, { criteria: criteria })
        if (data == null) {
            this.message = '条件に合致するイベントが存在しません。'
            return false
        }
        this.eventList = data
    }
}
</script>