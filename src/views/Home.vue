<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import VueApexCharts from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'

const store = useDashboardStore()

// 為工具函式加上型別
const formatPrice = (num: number | undefined): string =>
    num?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? 'N/A'

const formatPercent = (num: number | undefined): string =>
    num?.toFixed(2) ?? 'N/A'

// 使用 computed 來確保圖表數據是響應式的
const chartSeries = computed(() => [{
    name: 'BTC 每日均價',
    data: store.historicalData.map(item => [
        new Date(item.date).getTime(), // 將 YYYY-MM-DD 轉成時間戳
        item.averagePrice
    ])
}])

// 為圖表設定加上 ApexOptions 型別
const chartOptions = computed<ApexOptions>(() => ({
    chart: {
        type: 'area',
        height: 400,
        zoom: { enabled: true },
        background: 'transparent'
    },
    theme: {
        mode: 'dark'
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    xaxis: {
        type: 'datetime',
        labels: { datetimeUTC: false }
    },
    yaxis: {
        labels: {
            formatter: (val: number) => `$${val.toLocaleString()}`,
        },
    },
    tooltip: {
        x: {
            format: 'yyyy/MM/dd',
        },
    },
}))

onMounted(() => {
    store.fetchData()
})
</script>

<template>
    <v-container fluid>
        <v-progress-linear :active="store.isLoading" indeterminate color="cyan" absolute top></v-progress-linear>

        <v-alert v-if="store.error" type="error" prominent class="mb-4">
            {{ store.error }}
        </v-alert>

        <v-row v-if="!store.isLoading && store.mainData">
            <v-col cols="12" md="4">
                <v-card class="mb-4" elevation="2">
                    <v-card-title>即時數據</v-card-title>
                    <v-list-item>
                        <v-list-item-title class="text-h4 font-weight-bold text-cyan-accent-3">
                            ${{ formatPrice(store.mainData.currentPrice) }}
                        </v-list-item-title>
                        <v-list-item-subtitle>當前價格</v-list-item-subtitle>
                    </v-list-item>
                    <v-divider class="my-2"></v-divider>
                    <v-list-item>
                        <v-list-item-title>${{ formatPrice(store.mainData.high24h) }}</v-list-item-title>
                        <v-list-item-subtitle>24小時最高價</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>${{ formatPrice(store.mainData.low24h) }}</v-list-item-title>
                        <v-list-item-subtitle>24小時最低價</v-list-item-subtitle>
                    </v-list-item>
                </v-card>
            </v-col>

            <v-col cols="12" md="8">
                <v-card class="mb-4" elevation="2">
                    <v-card-title>三日均價指標</v-card-title>
                    <v-list-item>
                        <v-list-item-title class="text-h5">
                            ${{ formatPrice(store.mainData.threeDayAveragePrice) }}
                        </v-list-item-title>
                        <v-list-item-subtitle>三日均價</v-list-item-subtitle>
                    </v-list-item>
                    <v-divider class="my-2"></v-divider>
                    <v-list-item class="text-green-accent-3">
                        <v-list-item-title>${{ formatPrice(store.mainData.threeDayAveragePriceUp5Percent)
                        }}</v-list-item-title>
                        <v-list-item-subtitle>掛單賣出目標 (三日均價 +5%)</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item class="text-red-accent-3">
                        <v-list-item-title>${{ formatPrice(store.mainData.threeDayAveragePriceDown5Percent)
                        }}</v-list-item-title>
                        <v-list-item-subtitle>掛單買入目標 (三日均價 -5%)</v-list-item-subtitle>
                    </v-list-item>
                    <v-divider class="my-2"></v-divider>
                    <v-list-item>
                        <v-list-item-title>
                            <span class="text-green-lighten-1">+{{ formatPercent(store.mainData.threeDayAverageUpRate)
                            }}%</span> /
                            <span class="text-red-lighten-1">{{ formatPercent(store.mainData.threeDayAverageDownRatet)
                            }}%</span>
                        </v-list-item-title>
                        <v-list-item-subtitle>三日均價波動率 (最高/最低)</v-list-item-subtitle>
                    </v-list-item>
                </v-card>
            </v-col>

            <v-col cols="12">
                <v-card elevation="2">
                    <v-card-title>90天歷史價格圖</v-card-title>
                    <v-card-text>
                        <vue-apex-charts :options="chartOptions" :series="chartSeries" height="400"></vue-apex-charts>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>