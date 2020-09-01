import React from "react";

import Home from "@material-ui/icons/Home";
import List from "@material-ui/icons/FormatListBulleted";
import DateRange from "@material-ui/icons/DateRange";
import Send from "@material-ui/icons/Send";

const iconStyle = { fontSize: "1.4rem" };

export const sidebarLinks = [
  {
    icon: <Home style={iconStyle} />,
    linkTo: "/",
    title: "Home"
  },
  {
    badge: "2",
    icon: <List style={iconStyle} />,
    linkTo: "",
    title: "Queue",
    disabled: true
  },
  {
    icon: <DateRange style={iconStyle} />,
    linkTo: "",
    title: "Calendar",
    disabled: true
  },
  {
    icon: <Send style={iconStyle} />,
    title: "Distribute",
    disabled: true
  }
];
