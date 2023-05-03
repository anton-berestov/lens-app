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
} from '@/interfaces/ProductInterface';
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
    const response = await API.get(`/products/catalog?${paramString}`);

    if (response) {
      response.map((p: any) => {
        //extract images
        const images: Image[] = [];

        // if Product has images map to Image Interface
        if (Object.hasOwnProperty.call(p, 'image')) {
          const img = p.image ?? [];
          img.map((i: any) => {
            images.push({
              id: Number(i.id),
              url: process.env.VUE_APP_API_PUBLIC + i.url,
              thumbnailUrl:
                process.env.VUE_APP_API_PUBLIC + i.formats.thumbnail.url ?? '',
              alternativeText: '',
              caption: '',
            });
          });
        }

        // if Product has brand map to Brand Interface
        const brand: Brand = { id: 0, title: '' };
        if ({}.propertyIsEnumerable.call(p, 'brand')) {
          const b = p.brand;
          brand.id = b?.id;
          brand.title = b?.title;
        }
        // if Product has brand map to Diameter Interface
        const diameter: Diameter = { id: 0, title: '' };
        if ({}.propertyIsEnumerable.call(p, 'diameter')) {
          const b = p.diameter;
          diameter.id = b?.id;
          diameter.title = b?.title;
        }
        // if Product has manufacturer map to Producer Interface
        const manufacturer: Manufacturer = { id: 0, title: '' };
        if (Object.hasOwnProperty.call(p, 'manufacturer')) {
          const m = p.manufacturer;
          manufacturer.id = m?.id;
          manufacturer.title = m?.title;
        }
        // if Product has manufacturer map to Material Interface
        const material: Material = { id: 0, title: '' };
        if (Object.hasOwnProperty.call(p, 'material')) {
          const m = p.material;
          material.id = m?.id;
          material.title = m?.attributes.title;
        }
        // if Product has manufacturer map to Period Interface
        const period: Period = { id: 0, title: '' };
        if (Object.hasOwnProperty.call(p, 'period')) {
          const m = p.period;
          period.id = m?.id;
          period.title = m?.title;
        }
        // if Product has manufacturer map to Radius Interface
        const radius: Radius[] = [];
        if (Object.hasOwnProperty.call(p, 'radius')) {
          const m = p.radius;
          m.map((el: any) => {
            radius.push({ id: el.id, title: el.title });
          });
        }
        // if Product has manufacturer map to Sphere Interface
        const sphere: Sphere[] = [];
        if (Object.hasOwnProperty.call(p, 'sphere')) {
          const m = p.sphere;
          m.map((el: any) => {
            sphere.push({ id: el.id, title: el.title });
          });
        }
        // if Product has manufacturer map to Sphere Interface
        const type: Type = { id: 0, title: '', description: '' };
        if (Object.hasOwnProperty.call(p, 'type')) {
          const m = p.type;
          type.id = m?.id;
          type.title = m?.title;
          type.description = m?.description;
        }
        // console.log(sphere);

        products.push({
          id: p.id,
          title: p.title,
          short_title: p.short_title,
          price: p.price,
          discount: p.discount,
          image: images,
          brand: brand.title,
          diameter: diameter.title,
          manufacturer: manufacturer.title,
          material: material.title,
          period: period.title,
          radius: radius,
          sphere: sphere,
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
      const radius: Radius[] = [];
      if (Object.hasOwnProperty.call(p.attributes, 'radius')) {
        const m = p.attributes.radius.data;
        m.map((el: any) => {
          radius.push({ id: el.id, title: el.attributes.title });
        });
      }
      // if Product has manufacturer map to Sphere Interface

      const sphere: Sphere[] = [];
      if (Object.hasOwnProperty.call(p.attributes, 'sphere')) {
        const m = p.attributes.sphere.data || [];
        m.map((el: any) => {
          sphere.push({ id: el.id, title: el.attributes.title });
        });
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
      product.radius = radius;
      product.sphere = sphere;
      product.type = type.title;
    }
    // console.log(products);
    return product;
  } catch (e) {
    console.error(e);
  }
};

export const getCharacteristics = async (
  url: any
): Promise<Characteristics[] | undefined> => {
  try {
    const response = await API.get(`/${url}`);

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

export const filterProducts = async (
  params?: any
): Promise<Product[] | undefined> => {
  try {
    // empty paramstring
    let paramString = '';
    // params include
    if (params) {
      paramString = qs.stringify({
        populate: '*',
        filters: {
          radius: {
            id: params.radius.id,
          },
          sphere: {
            id: params.sphere.id,
          },
          type: {
            id: {
              $in: params.type.map((el: Type) => el.id),
            },
          },
          period: {
            id: {
              $in: params.period.map((el: Period) => el.id),
            },
          },
        },
        encodeValuesOnly: true,
      });
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
        const radius: Radius[] = [];
        if (Object.hasOwnProperty.call(p.attributes, 'radius')) {
          const m = p.attributes.radius.data;
          m.map((el: any) => {
            radius.push({ id: el.id, title: el.attributes.title });
          });
        }
        // if Product has manufacturer map to Sphere Interface
        const sphere: Sphere[] = [];
        if (Object.hasOwnProperty.call(p.attributes, 'sphere')) {
          const m = p.attributes.sphere.data;
          m.map((el: any) => {
            sphere.push({ id: el.id, title: el.attributes.title });
          });
        }
        // if Product has manufacturer map to Sphere Interface
        const type: Type = { id: 0, title: '', description: '' };
        if (Object.hasOwnProperty.call(p.attributes, 'type')) {
          const m = p.attributes.type.data;
          type.id = m?.id;
          type.title = m?.attributes.title;
          type.description = m?.attributes.description;
        }
        // console.log(sphere);

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
          radius: radius,
          sphere: sphere,
          type: type.title,
        });
      });
    }

    return products;
  } catch (e) {
    console.error(e);
  }
};
