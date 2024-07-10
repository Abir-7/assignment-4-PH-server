export interface IInStock {
  quantity: number;
  status: "inStock" | "stockOut";
}

export interface IProduct {
  title: string;
  category: string;
  price: number;
  description: string;
  image: string;
  availability: IInStock;
}
