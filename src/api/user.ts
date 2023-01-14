import { UserInterfase } from '@/interfaces/UserInterfase';
import API from '@/api/index';

export const Auth = async (): Promise<UserInterfase | undefined> => {
  const params = {
    identifier: '8berestov8',
    password: '123456789',
  };
  try {
    const { user, jwt }: any = await API.post(`/auth/local`, params);

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
