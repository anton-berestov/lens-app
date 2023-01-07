import {
  Product,
  Image,
  Brand,
  Producer,
  Characteristics,
} from '@/interfaces/FrontendInterfaces';
import { AxiosError, AxiosResponse } from 'axios';
import qs from 'qs';
import API from './index';

export const getProducts = async (
  params?: any
): Promise<Product[] | undefined> => {
  try {
    // empty paramstring
    let paramString = '';
    // params include
    if (params) {
      paramString = qs.stringify(params);
    }
    const products: Product[] = [];
    const response = await API.get(`/products?${paramString}`);
    if (response.data) {
      // console.log(response.data);
      response.data.map((p: any) => {
        //extract images
        const images: Image[] = [];

        // if Product has images map to Image Interface
        if (Object.hasOwnProperty.call(p.attributes, 'image')) {
          const img = p.attributes.image.data ?? [];
          img.map((i: any) => {
            images.push({
              id: Number(i.id),
              url: process.env.VUE_APP_API_PUBLIC + i.attributes.url,
              thumbnailUrl:
                process.env.VUE_APP_API_PUBLIC +
                  i.attributes.formats.thumbnail.url ?? '',
              alternativeText: '',
              caption: '',
            });
          });
        }

        // if Product has brand map to Brand Interface
        const brand: Brand = { id: 0, title: '' };
        if ({}.propertyIsEnumerable.call(p.attributes, 'brand')) {
          const b = p.attributes.brand.data;
          brand.id = b?.id;
          brand.title = b?.attributes.title;
        }
        // if Product has manufacturer map to Producer Interface
        const producer: Producer = { id: 0, title: '' };
        if (Object.hasOwnProperty.call(p.attributes, 'manufacturer')) {
          const m = p.attributes.manufacturer.data;
          producer.id = m?.id;
          producer.title = m?.attributes.title;
        }
        // if Product has characteristics map to Characteristics Interface
        const characteristics: Characteristics[] = [];
        if (Object.hasOwnProperty.call(p.attributes, 'product_metas')) {
          const meta = p.attributes.product_metas.data ?? [];
          meta.map((m: any) => {
            characteristics.push({
              id: m.id,
              key: m.attributes.key,
              value: m.attributes.value,
              description: m.attributes.description,
            });
          });
        }

        products.push({
          id: p.id,
          title: p.attributes.title,
          short_title: p.attributes.short_title,
          price: p.attributes.price,
          discount: p.attributes.discount,
          product_meta: characteristics,
          image: images,
          brand_id: brand.id,
          producer_id: producer.id,
        });
      });
    }
    // console.log(products);
    return products;
  } catch (e) {
    console.error(e);
  }
};

/*export const getProductsAndMeta = async (params?: object): Promise<Product[] | undefined> => {
  try {
    const products: Product[] = [];

    const response = await API.get(`/products?populate=*`);

    return products;
  } catch (e) {
    console.log(e);
  }


};*/

export const getProduct = async (
  id: number,
  params?: any
): Promise<Product | undefined> => {
  try {
    // empty paramstring
    let paramString = '';
    // params include
    if (params) {
      paramString = qs.stringify(params);
    }
    const product: Product = { title: '', short_title: '', price: '' };
    const response = await API.get(`/products/${id}/?${paramString}`);
    if (response.data) {
      const p = response.data;
      console.log(response.data);

      //extract images
      const images: Image[] = [];

      // if Product has images map to Image Interface
      if (Object.hasOwnProperty.call(p.attributes, 'image')) {
        const img = p.attributes.image.data ?? [];
        img.map((i: any) => {
          images.push({
            id: Number(i.id),
            url: process.env.VUE_APP_API_PUBLIC + i.attributes.url,
            thumbnailUrl:
              process.env.VUE_APP_API_PUBLIC +
                i.attributes.formats.thumbnail.url ?? '',
            alternativeText: '',
            caption: '',
          });
        });
      }

      // if Product has brand map to Brand Interface
      const brand: Brand = { id: 0, title: '' };
      if ({}.propertyIsEnumerable.call(p.attributes, 'brand')) {
        const b = p.attributes.brand.data;
        brand.id = b?.id;
        brand.title = b?.attributes.title;
      }
      // if Product has manufacturer map to Producer Interface
      const producer: Producer = { id: 0, title: '' };
      if (Object.hasOwnProperty.call(p.attributes, 'manufacturer')) {
        const m = p.attributes.manufacturer.data;
        producer.id = m?.id;
        producer.title = m?.attributes.title;
      }
      // if Product has characteristics map to Characteristics Interface
      const characteristics: Characteristics[] = [];
      if (Object.hasOwnProperty.call(p.attributes, 'product_metas')) {
        const meta = p.attributes.product_metas.data ?? [];
        meta.map((m: any) => {
          characteristics.push({
            id: m.id,
            key: m.attributes.key,
            value: m.attributes.value,
            description: m.attributes.description,
          });
        });
      }

      product.id = p.id;
      product.title = p.attributes.title;
      product.short_title = p.attributes.short_title;
      product.price = p.attributes.price;
      product.discount = p.attributes.discount;
      product.product_meta = characteristics;
      product.image = images;
      product.brand_id = brand.id;
      product.producer_id = producer.id;
    }
    // console.log(products);
    return product;
  } catch (e) {
    console.error(e);
  }
};

export const getMeta = async (
  params?: any
): Promise<Characteristics[] | undefined> => {
  try {
    // empty paramstring
    let paramString = '';
    // params include
    if (params) {
      paramString = qs.stringify(params);
    }

    const response = await API.get(`/product-metas/?${paramString}`);

    const metas: Characteristics[] = [];

    if (response.data) {
      response.data.map((meta: any) => {
        metas.push({
          id: meta.id,
          key: meta.attributes.key,
          value: meta.attributes.value,
          description: meta.attributes.description,
        });
      });
    }

    return metas;
  } catch (e) {
    console.error(e);
  }
};
