import API from '@/api/index';

export const getProducts = (data) => API.get(`/products`);
export const getProductsAndMeta = (data) => API.get(`/products?populate=*`);
