import { UserInterfase } from '@/interfaces/UserInterfase';
import API from '@/api/index';

export const getUser = async (id: any): Promise<UserInterfase | undefined> => {
  try {
    const response = await API.get(`/users/${id}`);

    const user: UserInterfase = {
      id: 0,
      firstname: '',
      lastname: '',
      patronymic: '',
      birthday: '',
      email: '',
      phone: '',
    };

    user.id = response.id;
    user.firstname = response.firstname;
    user.lastname = response.lastname;
    user.patronymic = response.patronymic;
    user.birthday = response.birthday;
    user.email = response.email;
    user.phone = response.phone;

    return user;
  } catch (e) {
    console.error(e);
  }
};
