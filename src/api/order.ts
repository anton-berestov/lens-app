import API from '@/api/index';
//TODO API Interfaces

// @ts-ignore
export const sendOrderDetails = async (params: any): Promise<undefined> => {
  try {
    const a = params.map((el: any) => {
      const data = {
        product: el.product,
        product_amount: el.product_amount,
        product_count: el.product_count,
        product_discount: el.product_discount,
        sphere: el.sphere,
        radius: el.radius,
      };

      return API.post(`/order-product-details`, { data })
        .then((data: any) => data.data.id)
        .catch((e) => console.error(e));
    });
    // @ts-ignore
    return Promise.all(a);
  } catch (e) {
    console.error(e);
  }
};

// @ts-ignore
export const sendOrder = async (params: any): Promise<undefined> => {
  try {
    const data = {
      order_product_details: params.order_details,
      count: params.order.count,
      total_amount: params.order.total_amount,
      total_discount: params.order.total_discount,
      user: {
        id: params.order.user,
      },
    };

    const res = API.post(`/orders`, { data });
    // @ts-ignore
    return res;
  } catch (e) {
    console.error(e);
  }
};
