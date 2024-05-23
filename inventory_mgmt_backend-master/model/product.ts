interface Product {
  id?: number;
  name: string;
  category_id: number;
  description?: string;
  quantity: number;
  threshold?: number;
  user_id: number;
  price: number;
}

export default Product;
