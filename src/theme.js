import { createMuiTheme } from "@material-ui/core/styles";
import { blue, deepPurple, indigo, teal } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#f2f2f2"
    },
    primary: deepPurple,
    secondary: blue,
    text: {
      primary: "#777"
    },
    type: "light",
    tag: {
      evergreen: { backgroundColor: teal[500], color: "#fff" },
      news: { backgroundColor: indigo[500], color: "#fff" }
    }
  },
  typography: {
    fontFamily: ["Proxima Nova", "sans-serif"].join(",")
  },
  overrides: {
    MuiListItemText: {
      root: {
        color: "#3c464d"
      }
    },
    MuiInput: {
      underline: {
        "&:before": {
          borderBottomColor: "#673ab7"
        },
        "&:hover:not(.Mui-disabled):before": {
          borderBottomWidth: "1px"
        }
      }
    },
    MuiInputBase: {
      input: {
        backgroundColor: "white",
        color: "#7A7A7A",
        fontFamily: ["Proxima Nova", "sans-serif"].join(","),
        fontSize: "12px",
        fontWeight: 500
      }
    },
    MuiFormControl: {
      marginNormal: {
        marginTop: "10px",
        marginBottom: "10px"
      }
    },
    MuiFormInput: {
      root: {
        color: "#bbb",
        fontSize: "12px",
        fontWeight: 500
      }
    },
    MuiFormLabel: {
      root: {
        color: "#bbb",
        fontSize: "12px",
        fontWeight: 500,
        textTransform: "uppercase"
      }
    },
    MuiOutlinedInput: {
      input: {
        padding: "19px 15px 17px"
      },
      inputSelect: {
        padding: "16px 32px 15px 15px"
      },
      notchedOutline: {
        borderColor: "rgba(42,53,60,0.3)"
      }
    },
    MuiCheckbox: {
      root: {
        color: "#673ab7"
      }
    }
  }
});

export default theme;
