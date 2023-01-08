// Product Interface to use in Frontend
export interface Product {
  id?: number;
  title: string;
  short_title: string;
  price: string;
  discount?: string;
  // old_price?: string;
  image?: Array<Image>;
  brand?: string;
  diameter?: string;
  manufacturer?: string;
  material?: string;
  period?: string;
  radius?: Array<Radius>;
  sphere?: Array<Sphere>;
  type?: string;
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

export interface Diameter {
  id: number;
  title: string;
}

export interface Manufacturer {
  id: number;
  title: string;
}

export interface Material {
  id: number;
  title: string;
}

export interface Period {
  id: number;
  title: string;
}

export interface Radius {
  id: number;
  title: string;
}

export interface Sphere {
  id: number;
  title: string;
}

export interface Type {
  id: number;
  title: string;
  description: string;
}

export interface Characteristics {
  id: number;
  title: string;
  description: string;
}
