import Authorization from './authorization';
import AuthorizedRoute from './route';
import check from './checkPermissions';

Authorization.AuthorizedRoute = AuthorizedRoute;
Authorization.check = check;

export { setCurrentAuthority } from './checkPermissions';

export default Authorization;
