import API from '@/api/index';

export const saveAddress = async (params: any) => {
  try {
    const data = {
      street: params.street,
      apartment: params.apartment,
      entrance: params.entrance,
      floor: params.floor,
      order: params.order,
    };
    return API.post(`/addresses?populate=${params.type}`, { data })
      .then((data) => data)
      .catch((e) => console.error(e));
  } catch (e) {
    console.error(e);
  }
};
