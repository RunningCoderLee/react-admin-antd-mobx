import { observable, flow } from 'mobx';
import { saveToken, loadToken } from '~/utils/token';
import { requestLogin, requestRegister } from '~/service/user';

class UserStore {
  @observable token = loadToken();

  login = flow(function* login(params) {
    try {
      const { data: { status, token } } = yield requestLogin(params);
      if (status === 'error') {
        return Promise.resolve(false);
      }

      console.log(token); // eslint-disable-line no-console

      this.token = token;
      saveToken(token);
      return Promise.resolve(true);
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
      return Promise.reject(err);
    }
  })

  register = flow(function* register(params) {
    try {
      const { data: { token } } = yield requestRegister(params);
      this.token = token;
      saveToken(token);
      return Promise.resolve();
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
      return Promise.reject(err);
    }
  })
}

export default new UserStore();
