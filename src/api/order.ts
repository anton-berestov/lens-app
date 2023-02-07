import API from '@/api/index';

// @ts-ignore
export const sendOrderDetails = async (params: any): Promise<undefined> => {
  try {
    const a = params.map(async (el: any) => {
      // @ts-ignore
      for (const key in el) {
        // @ts-ignore
        el[key] = el[key].toString();
      }

      const data = {
        // @ts-ignore
        product: el.product,
        // @ts-ignore
        product_amount: el.product_amount,
        // @ts-ignore
        product_count: el.product_count,
        // @ts-ignore
        product_discount: el.product_discount,
        // @ts-ignore
        sphere: el.sphere,
        // @ts-ignore
        radius: el.radius,
      };

      const res = await API.post(`/order-product-details`, { data });
      console.log(res);
      // @ts-ignore
      return res.data.id;
    });
    return a;
  } catch (e) {
    console.error(e);
  }
};

// @ts-ignore
export const sendOrder = async (params: object): Promise<undefined> => {
  console.log(params);
  // if (product_details.length) {
  //   for (const key in order) {
  //     // @ts-ignore
  //     order[key] = order[key].toString();
  //   }
  //
  //   const data = {
  //     // @ts-ignore
  //     order_product_details: product_details,
  //     // @ts-ignore
  //     count: order.count,
  //     // @ts-ignore
  //     total_amount: order.total_amount,
  //     // @ts-ignore
  //     total_discount: order.total_discount,
  //     user: {
  //       // @ts-ignore
  //       id: order.user,
  //     },
  //   };
  //
  //   const res = API.post(`/orders`, { data });
  //   console.log(res);
  // }
};
