import { UserInterfase } from '@/interfaces/UserInterfase';
import API from '@/api/index';

export const sendPhone = async (params: object) => {
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
  try {
    const { user, jwt }: any = await API.post(`/sms/callback`, params);

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

    if (jwt) {
      localStorage.setItem('jwt', jwt);
      localStorage.setItem('user', JSON.stringify(User));
    }

    return User;
  } catch (e) {
    console.error(e);
  }
};

export const updateUser = async (params: any) => {
  try {
    console.log(params);
    const req = {
      firstname: params.firstname,
      lastname: params.lastname,
      patronymic: params.patronymic,
      birthday: params.birthday,
    };

    const data: any = await API.put(`/users/${params.id}`, req);
    console.log(data);

    const User: UserInterfase = {
      id: 0,
      firstname: '',
      lastname: '',
      patronymic: '',
      birthday: '',
      email: '',
      phone: '',
    };

    User.id = data.id;
    User.firstname = data.firstname;
    User.lastname = data.lastname;
    User.patronymic = data.patronymic;
    User.birthday = data.birthday;
    User.email = data.email;
    User.phone = data.phone;

    localStorage.setItem('user', JSON.stringify(User));

    return User;
  } catch (e) {
    console.error(e);
  }
};
