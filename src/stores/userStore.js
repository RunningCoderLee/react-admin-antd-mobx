import { observable, flow } from 'mobx';
import Cookies from 'js-cookie';
import { requestLogin } from '~/service/user';

class UserStore {
  @observable token = Cookies.get('token') || '';

  login = flow(function* login(params) {
    try {
      const { data: { status, token } } = yield requestLogin(params);
      if (status === 'error') {
        return Promise.resolve(false);
      }

      console.log(token);

      this.token = token;
      return Promise.resolve(true);
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  })
}

export default new UserStore();
