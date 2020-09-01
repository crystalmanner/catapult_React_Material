import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Appbar from "./Appbar";
import Sidebar from "./Sidebar";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  contentWrapper: {
    width: "100%"
  },
  content: {
    paddingTop: "55px",
    height: "100vh"

  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  }
}));

const Main = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Sidebar />
      <div className={classes.contentWrapper}>
        <Appbar />
        <main className={classes.content} id="content-el">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Main;
