import {
  Product,
  Image,
  Brand,
  Material,
  Manufacturer,
  Period,
  Radius,
  Sphere,
  Type,
  Diameter,
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
        // if Product has brand map to Diameter Interface
        const diameter: Diameter = { id: 0, title: '' };
        if ({}.propertyIsEnumerable.call(p.attributes, 'diameter')) {
          const b = p.attributes.diameter.data;
          diameter.id = b?.id;
          diameter.title = b?.attributes.title;
        }
        // if Product has manufacturer map to Producer Interface
        const manufacturer: Manufacturer = { id: 0, title: '' };
        if (Object.hasOwnProperty.call(p.attributes, 'manufacturer')) {
          const m = p.attributes.manufacturer.data;
          manufacturer.id = m?.id;
          manufacturer.title = m?.attributes.title;
        }
        // if Product has manufacturer map to Material Interface
        const material: Material = { id: 0, title: '' };
        if (Object.hasOwnProperty.call(p.attributes, 'material')) {
          const m = p.attributes.material.data;
          material.id = m?.id;
          material.title = m?.attributes.title;
        }
        // if Product has manufacturer map to Period Interface
        const period: Period = { id: 0, title: '' };
        if (Object.hasOwnProperty.call(p.attributes, 'period')) {
          const m = p.attributes.period.data;
          period.id = m?.id;
          period.title = m?.attributes.title;
        }
        // if Product has manufacturer map to Radius Interface
        const radius: Radius = { id: 0, title: '' };
        if (Object.hasOwnProperty.call(p.attributes, 'radius')) {
          const m = p.attributes.radius.data;
          radius.id = m?.id;
          radius.title = m?.attributes.title;
        }
        // if Product has manufacturer map to Sphere Interface
        const sphere: Sphere = { id: 0, title: '' };
        if (Object.hasOwnProperty.call(p.attributes, 'sphere')) {
          const m = p.attributes.sphere.data;
          sphere.id = m?.id;
          sphere.title = m?.attributes.title;
        }
        // if Product has manufacturer map to Sphere Interface
        const type: Type = { id: 0, title: '', description: '' };
        if (Object.hasOwnProperty.call(p.attributes, 'type')) {
          const m = p.attributes.type.data;
          type.id = m?.id;
          type.title = m?.attributes.title;
          type.description = m?.attributes.description;
        }

        products.push({
          id: p.id,
          title: p.attributes.title,
          short_title: p.attributes.short_title,
          price: p.attributes.price,
          discount: p.attributes.discount,
          image: images,
          brand: brand.title,
          diameter: diameter.title,
          manufacturer: manufacturer.title,
          material: material.title,
          period: period.title,
          radius: radius.title,
          sphere: sphere.title,
          type: type.title,
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
      // console.log(response.data);

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
      // if Product has brand map to Diameter Interface
      const diameter: Diameter = { id: 0, title: '' };
      if ({}.propertyIsEnumerable.call(p.attributes, 'diameter')) {
        const b = p.attributes.diameter.data;
        diameter.id = b?.id;
        diameter.title = b?.attributes.title;
      }
      // if Product has manufacturer map to Producer Interface
      const manufacturer: Manufacturer = { id: 0, title: '' };
      if (Object.hasOwnProperty.call(p.attributes, 'manufacturer')) {
        const m = p.attributes.manufacturer.data;
        manufacturer.id = m?.id;
        manufacturer.title = m?.attributes.title;
      }
      // if Product has manufacturer map to Material Interface
      const material: Material = { id: 0, title: '' };
      if (Object.hasOwnProperty.call(p.attributes, 'material')) {
        const m = p.attributes.material.data;
        material.id = m?.id;
        material.title = m?.attributes.title;
      }
      // if Product has manufacturer map to Period Interface
      const period: Period = { id: 0, title: '' };
      if (Object.hasOwnProperty.call(p.attributes, 'period')) {
        const m = p.attributes.period.data;
        period.id = m?.id;
        period.title = m?.attributes.title;
      }
      // if Product has manufacturer map to Radius Interface
      const radius: Radius = { id: 0, title: '' };
      if (Object.hasOwnProperty.call(p.attributes, 'radius')) {
        const m = p.attributes.radius.data;
        radius.id = m?.id;
        radius.title = m?.attributes.title;
      }
      // if Product has manufacturer map to Sphere Interface
      const sphere: Sphere = { id: 0, title: '' };
      if (Object.hasOwnProperty.call(p.attributes, 'sphere')) {
        const m = p.attributes.sphere.data;
        sphere.id = m?.id;
        sphere.title = m?.attributes.title;
      }
      // if Product has manufacturer map to Sphere Interface
      const type: Type = { id: 0, title: '', description: '' };
      if (Object.hasOwnProperty.call(p.attributes, 'type')) {
        const m = p.attributes.type.data;
        type.id = m?.id;
        type.title = m?.attributes.title;
      }

      product.id = p.id;
      product.title = p.attributes.title;
      product.short_title = p.attributes.short_title;
      product.price = p.attributes.price;
      product.discount = p.attributes.discount;
      product.image = images;
      product.brand = brand.title;
      product.diameter = diameter.title;
      product.manufacturer = manufacturer.title;
      product.material = material.title;
      product.period = period.title;
      product.radius = radius.title;
      product.sphere = sphere.title;
      product.type = type.title;
    }
    // console.log(products);
    return product;
  } catch (e) {
    console.error(e);
  }
};

export const getCharacteristics = async (
  url: any,
  params?: any
): Promise<Characteristics[] | undefined> => {
  try {
    // empty paramstring
    let paramString = '';
    // params include
    if (params) {
      paramString = qs.stringify(params);
    }

    const response = await API.get(`/${url}/?${paramString}`);

    const characteristics: Characteristics[] = [];

    if (response.data) {
      response.data.map((el: any) => {
        characteristics.push({
          id: el.id,
          title: el.attributes.title,
          description: el.attributes.description,
        });
      });
    }

    return characteristics;
  } catch (e) {
    console.error(e);
  }
};
