import { UserInterfase } from '@/interfaces/UserInterfase';
import API from '@/api/index';
import qs from 'qs';

export const sendPhone = async (params: any) => {
  console.log(params);

  try {
    const res = await API.post(`/sms/signup`, params);
    console.log(res);
  } catch (e) {
    console.error(e);
  }
};

export const checkSms = async (
  params: object
): Promise<UserInterfase | undefined> => {
  console.log(params);

  try {
    const { user, jwt }: any = await API.post(`/sms/signup`, params);

    if (jwt) {
      localStorage.setItem('jwt', jwt);
    }

    const User: UserInterfase = {
      id: 0,
      firstname: '',
      lastname: '',
      patronymic: '',
      birthday: '',
      email: '',
      phone: '',
    };

    User.id = user.id;
    User.firstname = user.firstname;
    User.lastname = user.lastname;
    User.patronymic = user.patronymic;
    User.birthday = user.birthday;
    User.email = user.email;
    User.phone = user.phone;

    return User;
  } catch (e) {
    console.error(e);
  }
};
