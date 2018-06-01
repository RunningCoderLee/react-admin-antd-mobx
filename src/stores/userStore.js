import { observable, flow } from 'mobx';
import { setCurrentAuthority } from '~/components/authorization';
import { loadToken } from '~/utils/token';
import { requestGetUserInfo } from '~/service/user';

class UserStore {
  @observable token = loadToken();
  @observable username = '';

  getUserInfo = flow(function* getUserInfo() {
    try {
      const { name, authority } = yield requestGetUserInfo();

      this.username = name;

      setCurrentAuthority(authority);

      return Promise.resolve();
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
      return Promise.reject(err);
    }
  })
}

export default new UserStore();
