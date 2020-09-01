import React from "react";
import { withRouter, Switch } from "react-router-dom";
import { AuthLayout, MainLayout } from "./layouts";

import SettingsLayout from "./pages/Settings";
import Distribute from "./pages/Distribute";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NoAccess from "./pages/NoAccess";
import {
  Design,
  Mrss,
  MrssViewer,
  Upload,
  Brand,
  Template,
  Review
} from "./pages/Publisher";
import { Campaigns } from "./pages/Campaigns";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const renderWithLayout = (Component, Layout) => <Layout> {Component} </Layout>;

const Routes = () => {
  return (
    <>
      <Switch>
        <ProtectedRoute
          path="/"
          exact
          render={() => renderWithLayout(<Upload />, MainLayout)}
        />
        <ProtectedRoute
          path="/settings"
          render={() => renderWithLayout(<SettingsLayout />, MainLayout)}
        />
        <ProtectedRoute
          path="/publisher/upload"
          exact
          render={() => renderWithLayout(<Upload />, MainLayout)}
        />
        <ProtectedRoute
          path="/publisher/mrss"
          exact
          render={() => renderWithLayout(<Mrss />, MainLayout)}
        />
        <ProtectedRoute
          path="/publisher/mrss/:id"
          exact
          render={routeProps =>
            renderWithLayout(<MrssViewer {...routeProps} />, MainLayout)
          }
        />
        <ProtectedRoute
          path="/distribute"
          exact
          render={routeProps =>
            renderWithLayout(<Distribute {...routeProps} />, MainLayout)
          }
        />
        <ProtectedRoute
          path="/publisher/design"
          exact
          render={() => renderWithLayout(<Design />, MainLayout)}
        />
        <ProtectedRoute
          path="/publisher/brand"
          exact
          render={() => renderWithLayout(<Brand />, MainLayout)}
        />
        <ProtectedRoute
          path="/publisher/template"
          exact
          render={() => renderWithLayout(<Template />, MainLayout)}
        />
        <ProtectedRoute
          path="/publisher/review"
          exact
          render={() => renderWithLayout(<Review />, MainLayout)}
        />
        <ProtectedRoute
          path="/campaigns"
          exact
          render={() => renderWithLayout(<Campaigns />, MainLayout)}
        />
        <PublicRoute
          path="/signin"
          exact
          render={() => renderWithLayout(<SignIn />, AuthLayout)}
        />
        <PublicRoute
          path="/signup"
          render={() => renderWithLayout(<SignUp />, AuthLayout)}
        />
        <PublicRoute path="/no-access" component={NoAccess} />
      </Switch>
    </>
  );
};

export default withRouter(Routes);
