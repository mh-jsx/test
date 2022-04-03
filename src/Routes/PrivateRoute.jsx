import {Route, Redirect} from "react-router-dom";
import Layout from "./../Layout/Index";
import {useAuthContext} from "./../Context/authContext";

// Wrapper for Route component that checks if user is authenticated
const PrivateRoute = ({component: Component, ...rest}) => {
  const {isAuthenticated} = useAuthContext();

  return (
    <>
      {isAuthenticated() ? (
        <>
          {
            // page main navigation / layout
          }
          <Layout />
          {
            // main page content
          }
          <main>
            <Route {...rest} render={(props) => <Component {...props} />} />
          </main>
        </>
      ) : (
        <Redirect to='/' />
      )}
    </>
  );
};

export default PrivateRoute;
