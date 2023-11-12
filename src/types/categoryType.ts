export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface CreateCategory {
  name: string;
  description: string;
}

export interface EditCategory {
  name: string;
  description: string;
}
