// src/types/api.ts
// 類似後端 model

// 對應後端的 RespondObj<T>
export interface RespondObj<T> {
    returnCode: string;
    returnMess: string;
    data: T | null;
  }
  
  // 對應後端的 MainDashboardDto
  export interface MainDashboardDto {
    currentPrice: number;
    currentPriceUp5Percent: number;
    currentPriceDown5Percent: number;
    high24h: number;
    low24h: number;
    threeDayAveragePrice: number;
    threeDayAveragePriceUp5Percent: number;
    threeDayAveragePriceDown5Percent: number;
    threeDayAverageUpRate: number;
    threeDayAverageDownRatet: number;
  }
  
  // 對應後端的 DailyAverageDto
  export interface DailyAverageDto {
    date: string; // C# 的 DateOnly 在 JSON 中會變成 YYYY-MM-DD 格式的字串
    averagePrice: number;
    maxRate: number;
    minRate: number;
  }