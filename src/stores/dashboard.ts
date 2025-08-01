// src/stores/dashboard.ts
import { defineStore } from 'pinia';
import apiService from '@/services/apiService';
import type { MainDashboardDto, DailyAverageDto } from '@/types/api';

// 定義 state 的型別
interface DashboardState {
  mainData: MainDashboardDto | null;
  historicalData: DailyAverageDto[];
  isLoading: boolean;
  error: string | null;
}

export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardState => ({
    mainData: null,
    historicalData: [],
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchData() {
      this.isLoading = true;
      this.error = null;
      try {
        const [mainResponse, historicalResponse] = await Promise.all([
          apiService.getMainDashboard(),
          apiService.getHistoricalChart(),
        ]);

        const mainResult = mainResponse.data;
        if (mainResult.returnCode === '1' && mainResult.data) {
          this.mainData = mainResult.data;
        } else {
          throw new Error(`儀表板數據加載失敗: ${mainResult.returnMess}`);
        }

        const historicalResult = historicalResponse.data;
        if (historicalResult.returnCode === '1' && historicalResult.data) {
          this.historicalData = historicalResult.data;
        } else {
          throw new Error(`歷史圖表數據加載失敗: ${historicalResult.returnMess}`);
        }

      } catch (err: any) {
        this.error = err.response?.data?.returnMess || err.message || '發生未知錯誤';
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
});