import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getCookie } from "../helpers/session";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !getCookie("token") ? (
          <Redirect
            to={{ pathname: "/admin", state: { from: props.location } }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
