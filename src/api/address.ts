import API from '@/api/index';
import { UserInterfase } from '@/interfaces/UserInterfase';

export const saveAddress = async (
  params: any
): Promise<UserInterfase | undefined> => {
  try {
    const data = {
      street: params.street,
      apartment: params.apartment,
      entrance: params.entrance,
      floor: params.floor,
      order: params.order,
    };
    return API.post(`/addresses?populate=${params.type}`, { data })
      .then((data: any) => data)
      .catch((e: any) => console.error(e));
  } catch (e) {
    console.error(e);
  }
};
