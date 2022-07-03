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
                        <select v-model="criteria.dateComparison" class="form-control">
                            <option v-for="item in selectList" v-bind:key="item.value" :value="item.value">
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
                        <input v-model="criteria.KeyWords" class="form-conrtol" placeholder="例)Bouquet パーソナルカラー" />
                    </label>
                </div>
            </div>
            <div class="col-12 col-md-1 d-flex justify-content-md-end">
                <button type="button" class="btn btn-light btn-block">
                    検索
                </button>
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
import { callFetchMethodPost, formatDate, bqDateParse } from '@/scripts/functions'

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
        },
        date: {
            get () {
                return formatDate(this.criteria.date, '-')
            },
            set (val) {
                this.criteria.date = bqDateParse(val)
            }
        }
    },
    /**
     * 検索ボタン押下
     */
    searchClick: async function () {
        const data = await callFetchMethodPost(searchEvUrl, { criteria: this.criteria })
        if (data == null) {
            this.message = '条件に合致するイベントが存在しません。'
            return false
        }
        this.eventList = data
    }
}
</script>