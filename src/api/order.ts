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

export const getOrderHistory = async (params: any): Promise<undefined> => {
  try {
    return API.get(`/orders?populate=*&filters[user][id]=${params}`)
      .then(({ data }: any) => {
        return data.map((el: any) => {
          return {
            id: el.id,
            date: el.attributes.createdAt,
            count: el.attributes.count,
            price: el.attributes.total_discount,
            deliverTo: el.attributes.deliverTo.data,
            status: 'В процессе доставки',
          };
        });
      })
      .catch((e: any) => console.error(e));
  } catch (e) {
    console.error(e);
  }
};

export const getOrderById = async (params: any): Promise<undefined> => {
  try {
    // @ts-ignore
    return API.get(`/orders/${params}?populate=*`)
      .then(async ({ data }) => {
        const res = await data.attributes.order_product_details.data.map(
          (el: any) => {
            return API.get(`/order-product-details/${el.id}?populate=*`)
              .then(async (el) => {
                const product = await API.get(
                  `/products/${el.data.attributes.product.data.id}?populate=*`
                ).then((el: any) => {
                  return el.data.attributes.image.data.map((e: any) => {
                    return e.attributes.url;
                  });
                });

                return {
                  product: {
                    title: el.data.attributes.product.data.attributes.title,
                    short_title:
                      el.data.attributes.product.data.attributes.short_title,
                    price: el.data.attributes.product.data.attributes.price,
                    discount:
                      el.data.attributes.product.data.attributes.discount,
                    img: product,
                  },

                  price: el.data.attributes.product_discount,
                  count: el.data.attributes.product_count,
                  radius: {
                    id: el.data.attributes.radius.data.id,
                    title: el.data.attributes.radius.data.attributes.title,
                  },
                  sphere: {
                    id: el.data.attributes.sphere.data.id,
                    title: el.data.attributes.sphere.data.attributes.title,
                  },
                };
              })
              .catch((e: any) => console.error(e));
          }
        );
        console.log(res);

        return {
          id: data.id,
          date: data.attributes.createdAt,
          order_product_details: res,
        };
      })
      .catch((e: any) => console.error(e));
  } catch (e) {
    console.error(e);
  }
};
