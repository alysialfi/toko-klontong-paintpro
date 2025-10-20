export type Product = {
  _id: string;
  CategoryId: number;
  categoryName: string;
  sku: string;
  name: string;
  description: string;
  weight: number;
  width: number;
  length: number;
  height: number;
  image: string;
  price: number;
};

export type ProductCreateInput = Omit<Product, '_id'>;

export type ProductCategory = {
  id: 1 | 2 | 3;
  name: "Beverages" | "Household" | "Snacks";
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { id: 1, name: "Beverages" },
  { id: 2, name: "Household" },
  { id: 3, name: "Snacks" }
];