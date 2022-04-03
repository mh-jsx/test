import "./App.scss";
import PrivateRoute from "./Routes/PrivateRoute";
import {Switch, Route, Redirect} from "react-router-dom";
import {ReactQueryDevtools} from "react-query/devtools";

// pages imports

import Settings from "./Pages/Settings/Index";

message.config({top: 130});

function App() {
  const routes = [
    {
      path: "/settings",
      component: Settings,
      exact: true,
    },
  ];

  const {isRTL} = useLanguage();

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/forgot-password' exact component={Forgot} />
        <Route path='/reset-password' exact component={Reset} />
        <Route path='/privacy-policy' exact component={PrivacyPolicy} />
        <Route path='/faq' exact component={FAQ} />

        {routes.map((route, index) => (
          <PrivateRoute
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
            name={route.name}
          />
        ))}
        <Redirect to='/' />
      </Switch>

      <ReactQueryDevtools />
    </div>
  );
}

export default App;
