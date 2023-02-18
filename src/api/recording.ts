import API from '@/api/index';

export const getDoctor = async (): Promise<undefined> => {
  try {
    return API.get(`doctors?populate=*`)
      .then(({ data }: any) => data)
      .catch((e: any) => console.error(e));
  } catch (e) {
    console.error(e);
  }
};

export const checkDate = async (params: any): Promise<undefined> => {
  try {
    return API.get(
      `recordings?populate=*&filters[appointment][date]=${params}&filters[appointment][reserved]=true`
    )
      .then(({ data }: any) =>
        data.map((el: any) => {
          return el.attributes.time;
        })
      )
      .catch((e: any) => console.error(e));
  } catch (e) {
    console.error(e);
  }
};

export const getTime = async (): Promise<undefined> => {
  try {
    return API.get(`recordings?populate=*`)
      .then(({ data }: any) =>
        data.map((el: any) => {
          return { time: el.attributes.time, id: el.id };
        })
      )
      .catch((e: any) => console.error(e));
  } catch (e) {
    console.error(e);
  }
};

export const sendRecord = async (data: any): Promise<undefined> => {
  try {
    return API.post(`appointments`, { data })
      .then(({ data }: any) => data)
      .catch((e: any) => console.error(e));
  } catch (e) {
    console.error(e);
  }
};
