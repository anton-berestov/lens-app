import API from '@/api/index';

export const getProducts = (data) => API.get(`/products`);
