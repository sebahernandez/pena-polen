export interface PollenLevel {
  type: string;
  level: string;
  description?: string;
}

export interface HistoryRecord {
  city: string;
  date: string;
  levels: PollenLevel[];
  forecast?: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: HistoryRecord[];
  meta: {
    total: number;
    city: string;
    limit: number;
    hasDateRange: boolean;
  };
}

export interface FilterState {
  searchDate: string;
  filterLevel: string;
  filterPollenType: string;
}

export interface PaginationState {
  currentPage: number;
  recordsPerPage: number;
}
