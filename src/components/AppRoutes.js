import React from "react";
import { Route } from "react-router-dom";
const AppRoutes = ({ Layout, Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

export default AppRoutes;
