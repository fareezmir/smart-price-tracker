import { TrackedProduct } from '../types/product_type';

export interface ProductRepositoryInterface {
  getAllTrackedProducts(): Promise<TrackedProduct[]>;
}