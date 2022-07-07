<template>
<div>
    <div class="row">
            <div class="col-12">
                <h2>イベント検索</h2>
            </div>
        </div>
    <div class="row">
        <div class="col-12 mb-3 d-flex flex-wrap align-items-center p-2" style="background-color: lightgray;">
            <div class="col-12 col-md-4 mb-1 mb-md-0">
                <div class="d-flex flex-wrap align-items-center">
                    <label for="event-date col-12 col-md-4">
                        日付:
                    </label>
                    <div class="input-group form-inline col-12 col-md-8">
                        <input v-model="date" class="form-control calender" type="date" :disabled="notUse" id="event-date" />
                        <!-- TODO: optionにvalueを入れる -->
                        <select v-model="dateComparison" class="form-control">
                            <option v-for="item in selectList" v-bind:key="item.value" v-bind:value="item.value">
                                {{ item.text }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-7">
                <div class="input-group form-inline">
                    <label>
                        キーワード:
                        <input v-model="keyWords" class="form-conrtol" placeholder="例)Bouquet パーソナルカラー" />
                    </label>
                </div>
            </div>
            <div class="col-12 col-md-1 d-flex justify-content-md-end">
                <button type="button" class="btn btn-light btn-block" @click="searchClick">
                    検索
                </button>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <p v-if="eventList.length == 0">{{ message }}</p>
            <div v-for="event in eventList" v-bind:key="event.id">
                {{ event.name }}
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { formatDate, bqDateParse } from '@/scripts/functions'
import { eventSearch, DATE_COMPARISON_NOUSE, DATE_COMPARISON_TODAY, DATE_COMPARISON_BEFORE, DATE_COMPARISON_AFTER, SearchEventCriteria } from '@/scripts/event'

// const DATE_COMPARISON_NOUSE = -1
// const DATE_COMPARISON_TODAY = 0
// const DATE_COMPARISON_BEFORE = 1
// const DATE_COMPARISON_AFTER = 2

// const searchEvUrl = 'https://imecon.portal.api/api/typesense/events/list'

export default {
    name: 'EventSearch',
    data() {
        return {
            criteria: new SearchEventCriteria(),
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
            console.log(this.dateComparison)
            return this.dateComparison == DATE_COMPARISON_NOUSE
        },
        date: {
            get () {
                return formatDate(this.criteria.date, '-')
            },
            set (val) {
                this.criteria.date = bqDateParse(val)
            }
        },
        dateComparison: {
            get () {
                return this.criteria.dateComparison
            },
            set (val) {
                this.$set(this.criteria, 'dateComparison', val)
            }
        },
        keyWords: {
            get () {
                return this.criteria.keyWords
            },
            set (val) {
                this.$set(this.criteria, 'keyWords', val)
            }
        }
    },
    methods: {
        /**
         * 検索ボタン押下
         */
        searchClick: async function () {
            console.log('searchStart!')
            const data = await eventSearch(this.criteria)
            console.log('searchedData:', data)
            if (data == null || data.lentgh == 0) {
                this.message = '条件に合致するイベントが存在しません。'
                return false
            }
            console.log('検索結果: ', data)
            this.eventList = data
            return false
        }
    }
}
</script>