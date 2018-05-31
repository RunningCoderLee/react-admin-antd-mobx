import Authorization from './authorization';
import AuthorizedRoute from './route';

Authorization.AuthorizedRoute = AuthorizedRoute;

export { setCurrentAuthority } from './checkPermissions';

export default Authorization;
