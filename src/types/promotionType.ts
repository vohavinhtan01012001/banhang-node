export interface CreatePromotionType {
  title: string;
  discount: string | null;
  startDate: Date | null;
  endDate: Date | null;
  status: number;
}

export interface UpdatePromotionType {
  title: string;
  discount: string | null;
  startDate: Date | null;
  endDate: Date | null;
  status: number;
}
