// Product Interface to use in Frontend
export interface Product {
  id?: number;
  title: string;
  short_title: string;
  price: string;
  old_price?: string;
  image?: Array<Image>;
  producer_id?: number;
  brand_id?: number;
  discount?: string;
  product_meta?: Array<Characteristics>;
  // maybe to delete...
  type_id?: number;
  period_id?: number;
  radius_id?: number;
  sphere_id?: number;
  material_id?: number;
}

// Image Interface to use in Frontend
export interface Image {
  id: number;
  url: string;
  thumbnailUrl: string;
  alternativeText?: string;
  caption?: string;
}

export interface Brand {
  id: number;
  title: string;
}

export interface Producer {
  id: number;
  title: string;
}

export interface Characteristics {
  id?: number;
  key: string;
  value: string;
  description?: string;
}
