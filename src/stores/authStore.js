import { observable, flow, action, reaction } from 'mobx';
import { setCurrentAuthority } from '~/components/authorization';
import { saveToken, loadToken, parsePayload } from '~/utils/token';
import { requestLogin, requestRegister } from '~/service/user';
// import userStore from './userStore';

class AuthStore {
  @observable token = loadToken();

  constructor() {
    reaction(() => this.token, (token) => {
      const { userType } = parsePayload(token);

      setCurrentAuthority(userType);
    }, {
      fireImmediately: true,
    });
  }

  login = flow(function* login(params) {
    try {
      const { data: { status, token } } = yield requestLogin(params);
      if (status === 'error') {
        return Promise.resolve(false);
      }

      console.log(token); // eslint-disable-line no-console

      this.token = token;
      saveToken(token);

      const { userType } = parsePayload(token);

      setCurrentAuthority(userType);

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

  @action logout = () => {
    this.token = null;
    setCurrentAuthority();
  }
}

export default new AuthStore();
