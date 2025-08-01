// src/services/apiService.ts
import axios, { type AxiosResponse } from 'axios';
import type { RespondObj, MainDashboardDto, DailyAverageDto } from '@/types/api';

const apiClient = axios.create({
  baseURL: 'https://localhost:7148/api', // 後端 API URL
});

// 為每個方法加上明確的回傳型別 Promise<AxiosResponse<...>>
export default {
  getMainDashboard(): Promise<AxiosResponse<RespondObj<MainDashboardDto>>> {
    return apiClient.get('/dashboard/main');
  },
  getHistoricalChart(): Promise<AxiosResponse<RespondObj<DailyAverageDto[]>>> {
    return apiClient.get('/dashboard/historical-chart');
  },
};