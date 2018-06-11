import React, { Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import { LocaleProvider } from 'antd';
import zhCn from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import rootStore from '~/stores/index';
import history from '~/utils/history';

import asyncComponent from '~/components/asyncComponent';
import Authorization from '~/components/authorization';

const AsyncUserLayout = asyncComponent(() => import('~/layouts/user'));
const AsyncBasicLayout = asyncComponent(() => import('~/layouts/basic'));
const AsyncException = asyncComponent(() => import('~/components/exception'));

const { AuthorizedRoute } = Authorization;

moment.locale('zh-cn');

const App = () => (
  <Fragment>
    {/* <StrictMode> */}
    <Provider {...rootStore}>
      <LocaleProvider locale={zhCn}>
        <Router history={history}>
          <Switch>
            <Route path="/user" component={AsyncUserLayout} />
            <AuthorizedRoute authority={['admin', 'user']} path="/" redirectPath="/user" component={AsyncBasicLayout} />
            <Route render={() => <AsyncException type="404" />} />
          </Switch>
        </Router>
      </LocaleProvider>
    </Provider>
    {/* </StrictMode> */}
    {
    process.env.REACT_APP_ENABLE_MOBX_DEV_TOOL === 'true' ?
      <DevTools
        highlightTimeout={parseInt(process.env.REACT_APP_MOBX_DEV_TOOL_HIGHLIGHT_TIMEOUT, 10)}
        position={{ top: 12, right: 20 }}
      /> :
    null
  }
  </Fragment>
);

export default App;

