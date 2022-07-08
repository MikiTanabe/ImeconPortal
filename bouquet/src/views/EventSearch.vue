<template>
<div>
    <div class="row">
            <div class="col-12">
                <h2>イベント検索</h2>
            </div>
        </div>
    <div class="row">
        <div class="col-12 mb-3 d-flex flex-wrap align-items-end p-2" style="background-color: lightgray;">
            <div class="col-12 col-md-4 px-0 mb-1 mb-md-0">
                <div class="d-flex flex-wrap align-items-start">
                    <label for="event-date" class="form-label">
                        日付:
                    </label>
                    <div class="input-group form-inline col-12 p-0 pr-1">
                        <input
                            v-model="date"
                            class="form-control calender"
                            type="date"
                            :disabled="notUse"
                            id="event-date" />
                        <select v-model="dateComparison" class="form-control">
                            <option v-for="item in selectList" v-bind:key="item.value" :value="item.value">
                                {{ item.id }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6 p-0 mb-1 mb-md-0">
                <label for="search-event-keywords" class="form-label">
                    キーワード:
                </label>
                <div class="input-group form-inline">
                    
                    <input v-model="keyWords"
                           class="form-control"
                           placeholder="例)Bouquet パーソナルカラー"
                           id="search-event-keywords"
                           style="width: 60%;"
                    />
                </div>
            </div>
            <div class="col-12 col-md-2 p-0 d-flex justify-content-md-end">
                <button type="button" class="btn btn-light btn-block" @click="searchClick">
                    検索
                </button>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12 p-0">
            <p v-if="eventList.length == 0">{{ message }}</p>
            <div v-for="event in eventList" v-bind:key="event.id">
                <div class="event-panel d-flex col-12 p-2 mb-2 h-20 h-md-10">
                    <div class="img-wrapper col-5 col-md-3 p-0">
                        <img :src="event.data.imgUrl" class="img-fluid">
                    </div>
                    <div class="col-7 col-md-9 p-1">
                        <h5 class="d-block">{{ event.data.title }}</h5>
                        <div class="h-20">
                            <p>{{ event.data.introduction }}</p>
                        </div>
                        <div class="h-10">
                            <p>開催日: {{ showDate(event.data.date.toDate()) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { formatDate, bqDateParse } from '@/scripts/functions'
import { eventSearch, SearchEventCriteria } from '@/scripts/event'
import { DATE_COMPARISON_NOUSE, DATE_COMPARISON_TODAY, DATE_COMPARISON_BEFORE, DATE_COMPARISON_AFTER } from '@/scripts/typesenseManager'

// const searchEvUrl = 'https://imecon.portal.api/api/typesense/events/list'

export default {
    name: 'EventSearch',
    data() {
        return {
            criteria: new SearchEventCriteria(),
            selectList: [
                {
                    id: '指定しない',
                    value: DATE_COMPARISON_NOUSE
                },
                {
                    id: '当日',
                    value: DATE_COMPARISON_TODAY
                },
                {
                    id: 'より前',
                    value: DATE_COMPARISON_BEFORE
                },
                {
                    id: '以降',
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
            this.eventList = data
            return false
        },
        showDate: function (val) {
            return formatDate(val, '/')
        }
    }
}
</script>