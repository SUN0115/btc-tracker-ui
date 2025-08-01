// src/services/apiService.ts
import axios, { type AxiosResponse } from 'axios';
import type { RespondObj, MainDashboardDto, DailyAverageDto } from '@/types/api';

// const apiClient = axios.create({
//   baseURL: 'https://btc-tracker-api-rj02.onrender.com/api', // 後端 API URL
// });
const apiClient = axios.create({
  // 這裡不能是 localhost！
  // 必須是你 Render 部署成功後的公開網址
  baseURL: 'https://btc-tracker-api-rj02.onrender.com/api', 
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