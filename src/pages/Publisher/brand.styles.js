import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  body: {
    minHeight: "100%",
    width: "100%",
    paddingBottom: "90px",
    background: "white",
    position: "relative"
  },
  firstSection: {
    width: "100%",
    maxWidth: "1000px",
    display: "flex",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "50px",
    paddingBottom: "30px",
    borderBottom: "solid 1px #e5e3e3",
    marginBottom: "30px"
  },
  secondSection: {
    width: "100%",
    maxWidth: "1000px",
    display: "flex",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: "30px"
  },
  vSeperateBar: {
    height: "291px",
    borderLeft: "solid 1px #e5e3e3"
  },
  videoFile: {
    marginTop: "25px"
  },
  subtitle: {
    fontSize: "14px",
    letterSpacing: "0.2px",
    color: "black",
    marginBottom: "8px",
    textTransform: "uppercase"
  },
  title: {
    fontSize: "20px",
    color: "#181e22",
    marginBottom: "20px"
  },
  videoLink: {
    fontSize: "12px",
    color: "#74bdd5",
    marginBottom: "25px",
    maxWidth: "250px",
    wordBreak: "break-all"
  },
  processing: {
    background: "#f7f6f9",
    padding: "15px",
    textAlign: "center",
    marginBottom: "30px"
  },
  circular: {
    width: "57.5px !important",
    height: "57.5px !important"
  },
  ratings: {
    display: "flex",
    width: "100%",
    marginLeft: "-12px",
    "& div": {
      marginLeft: "12px"
    }
  },
  rating: {
    height: "27px",
    width: "35px",
    borderRadius: "5px",
    color: "white",
    fontSize: "12px",
    backgroundColor: "rgba(103, 58, 183, 0.4);",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  ratingActive: {
    backgroundColor: "#673ab7"
  },
  campaignWrapper: {
    display: "flex",
    flexDirection: "column"
  },
  selectCampaign: {
    height: "40px",
    width: "205px",
    borderRadius: "5px",
    border: "solid 1px #e3e3e3",
    marginBottom: "20px"
  },
  by: {
    height: "40px",
    width: "205px",
    borderRadius: "5px",
    border: "solid 1px #e3e3e3",
    marginTop: "20px"
  },
  compaignLogo: {
    height: "117px",
    borderRadius: "5px",
    minWidth: "150px",
    border: "dashed 2px #e3e3e3",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "45px"
  },
  logoTitle: {
    color: "#e3e3e3"
  },
  displayLogoImg: {
    maxWidth: "205px",
    maxHeight: "117px",
    marginTop: "15px"
  },
  logoImg: {
    maxWidth: "146px",
    maxHeight: "113px",
    marginTop: "15px"
  },
  compaign: {
    display: "flex",
    flex: 1
  },
  iconBtn: {
    width: "25px",
    height: "25px !important",
    minHeight: "25px",
    fontSize: "20px",
    margin: "8px 15px"
  },
  addingCampaign: {
    margin: "8px 15px"
  },
  checkBox: {
    minWidth: "125px",
    marginRight: "5px"
  },
  checkBoxLabel: {
    color: "rgba(42, 53, 60, 0.7)",
    fontSize: "12px"
  },
  table: {
    width: "500px"
  },
  tableHeader: {
    backgroundColor: "#d8d8d8",
    fontSize: "12px",
    fontWeight: "400",
    color: "black",
    height: "36px",
    padding: "11px 20px"
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    width: "725px",
    // height: "404px",
    borderRadius: "10px",
    boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.5)",
    backgroundColor: "#ffffff",
    padding: "25px",
    "&:focus": {
      outline: "none"
    }
  },
  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px"
  },
  modalTitle: {
    fontSize: "20px",
    color: "#181e22"
  },
  textField: {
    width: "100%"
  },
  flexCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
    marginTop: "10px"
  },
  modalBtn: {
    width: "100%",
    height: "40px"
  },
  themeStyle: {
    display: "flex",
    width: "100%",
    justifyContent: "center"
  },
  videoContainer: {
    position: "relative",
    overflow: "hidden",
    paddingTop: "56.25%",
    width: "250px"
  },
  responsiveIframe: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: 0
  }
}));

export { useStyles };
