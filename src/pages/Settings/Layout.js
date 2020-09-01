import React from 'react';
import { Route } from 'react-router-dom';
import { Grid, Box } from '@material-ui/core';

import BusinessAddress from './BusinessAddress';
import ChangePassword from './ChangePassword';
import Overview from './SettingsOverview';
import PaymentInfo from './PaymentInfo';
import PersonalInfo from './PersonalInfo';

const SettingsLayout = () => {
  return (
    <Box p={4}>
      <Grid container justify="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Route path="/settings" exact component={Overview} />
          <Route path="/settings/payment-info" exact component={PaymentInfo} />
          <Route
            path="/settings/personal-info"
            exact
            component={PersonalInfo}
          />
          <Route
            path="/settings/business-address"
            exact
            component={BusinessAddress}
          />

          <Route
            path="/settings/change-password"
            exact
            component={ChangePassword}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsLayout;
