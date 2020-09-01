import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  FormControlLabel,
  Grid,
  LinearProgress,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  withStyles
} from "@material-ui/core";
import BasicTemplateImg from "./assets/basic-template.png";
import AdvancedTemplateImg from "./assets/advanced-template.png";
import CustomTemplateImg from "./assets/custom.png";
import CrownImg from "./assets/crown.svg";
import ClockImg from "./assets/clock.svg";
import BrandLogoPlaceholder from "./assets/brand-logo-placeholder.png";

const logoCorners = [
  {
    label: "Top Left",
    value: "topLeft"
  },
  {
    label: "Top Right",
    value: "topRight"
  },
  {
    label: "Bottom Left",
    value: "bottomLeft"
  },
  {
    label: "Bottom Right",
    value: "bottomRight"
  }
];

const useStyles = makeStyles(theme => ({
  wrapper: {
    minWidth: 1000,
    margin: "0 auto",
    [theme.breakpoints.down("md")]: {
      maxWidth: 1000
    },
    [theme.breakpoints.up("lg")]: {
      position: "relative",
      left: "-102px",
      maxWidth: 1200
    }
  },
  card: {
    fontSize: 12,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2.5)
  },
  progressBarWrapper: {
    backgroundColor: "white",
    borderRadius: 5,
    overflow: "hidden",
    position: "relative",
    textAlign: "center",
    boxShadow: "0 2px 3px rgba(0,0,0,0.2)"
  },
  progressBarText: {
    color: "white",
    fontSize: 12,
    position: "absolute",
    width: "100%",
    left: 0,
    top: "50%",
    transform: "translateY(-45%)",
    fontWeight: 500
  },
  button: {
    width: "114px",
    textTransform: "none",
    padding: "5px 8px 3px"
  },
  insertOption: {
    color: "white",
    marginLeft: "auto",
    marginRight: "auto",
    position: "relative",
    width: "270px"
  },
  insertText: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -40%)",
    fontSize: "20px",
    width: "100%",
    "& b": {
      color: "white"
    }
  },
  deliveryBubble: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: "11.5px",
    position: "absolute",
    bottom: "10px",
    right: "10px",
    padding: "5px 10px 3px",
    fontSize: "12px",
    "& img": {
      verticalAlign: "middle"
    }
  },
  brandLogoPlaceholder: {
    border: "2px dashed #dedede",
    borderRadius: "5px",
    fontSize: "12px",
    height: "108px",
    padding: theme.spacing(1, 0),
    width: "162px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& .semibold": {
      color: "#b5b5b5",
      marginBottom: "8px"
    }
  },
  renderBtn: {
    backgroundColor: "white",
    boxShadow: "0 2px 3px rgba(0,0,0,0.2)",
    color: theme.palette.primary.main,
    fontSize: 12,
    height: 40,
    textTransform: "none",
    "&:hover": {
      backgroundColor: "white"
    }
  },
  renderStopBtn: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 0,
    height: "100%",
    width: "40px",
    minWidth: 0,
    backgroundColor: "#EBFBFF",
    boxShadow: "none",
    fontWeight: 500,
    fontSize: "14px",
    color: "#6D6D6D",
    "&:hover": {
      backgroundColor: "white"
    }
  }
}));

const BorderLinearProgress = withStyles({
  root: {
    height: 40,
    backgroundColor: "rgba(68, 188, 215, 0.3)"
  },
  bar: {
    borderRadius: 5,
    backgroundImage: `repeating-linear-gradient(
      -45deg,
      #B2E5F0,
      #B2E5F0 20px,
      #89DCEE 20px,
      #89DCEE 40px
    )`
  }
})(LinearProgress);

const types = [
  {
    title: <span>Basic Template</span>,
    img: BasicTemplateImg,
    text: (
      <>
        PLUG <b>AND PLAY</b>
      </>
    ),
    delivery: <>Instant</>
  },
  {
    title: (
      <span>
        Advanced Template <img src={CrownImg} alt="" />
      </span>
    ),
    img: AdvancedTemplateImg,
    text: (
      <>
        DELAYED <b>DELIVERY</b>
      </>
    ),
    delivery: (
      <>
        <Box mr={0.5} component="span">
          <img src={ClockImg} alt="" />
        </Box>{" "}
        1 - 3 DAYS
      </>
    )
  },
  {
    title: (
      <span>
        Custom <img src={CrownImg} alt="" />
      </span>
    ),
    img: CustomTemplateImg,
    text: (
      <>
        LET'S <b>CHAT</b>
      </>
    ),
    delivery: (
      <>
        <Box mr={0.5} component="span">
          <img src={ClockImg} alt="" />
        </Box>{" "}
        2 - 5 DAYS
      </>
    )
  }
];

const pageSectionStyles = makeStyles(theme => ({
  leftCol: {
    [theme.breakpoints.up("lg")]: {
      textAlign: "right"
    }
  }
}));

const PageSection = ({ title = "", children }) => {
  const classes = pageSectionStyles();
  return (
    <Grid container spacing={3}>
      <Grid item md={12} lg={2} className={classes.leftCol}>
        <Box pt={2.35}>
          <small>
            <b className="semibold">{title}</b>
          </small>
        </Box>
      </Grid>
      <Grid item md={12} lg={10}>
        {children}
      </Grid>
    </Grid>
  );
};

const InsertType = ({ title, img, text, delivery }) => {
  const classes = useStyles();
  return (
    <Box textAlign="center">
      <Typography>
        <b>{title}</b>
      </Typography>

      <Box mt={3} mb={4} className={classes.insertOption}>
        <img src={img} style={{ display: "block" }} alt="" />
        <div className={classes.insertText}>{text}</div>
        <div className={classes.deliveryBubble}>{delivery}</div>
      </Box>

      <Button
        color="primary"
        variant="contained"
        size="small"
        className={classes.button}
      >
        Select
      </Button>
    </Box>
  );
};

const StyledRadio = withStyles(theme => ({
  root: {
    textTransform: "none",
    "& .MuiButtonBase-root": {
      padding: theme.spacing(1, 0.75, 1.25, 1.5)
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1rem"
    },
    "& .MuiFormControlLabel-label": {
      fontSize: 12
    }
  }
}))(FormControlLabel);

const PublisherDesign = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState("topLeft");

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <Box className={classes.wrapper}>
      <PageSection>
        <Grid container spacing={3}>
          <Grid item style={{ flexGrow: 1 }}>
            <Box mb={2} className={classes.progressBarWrapper}>
              <BorderLinearProgress
                className={classes.margin}
                variant="determinate"
                color="secondary"
                value={50}
              />
              <div className={classes.progressBarText}>Processing 50%</div>
              <Button variant="contained" className={classes.renderStopBtn}>
                X
              </Button>
            </Box>
          </Grid>
          <Grid item style={{ width: 144 }}>
            <Button variant="contained" className={classes.renderBtn} fullWidth>
              Render
            </Button>
          </Grid>
        </Grid>
      </PageSection>

      <PageSection title="Insert Branding">
        <Card className={classes.card}>
          <Grid container spacing={2}>
            <Grid item md={3}>
              <Box style={{ borderRight: "1px solid #e5e3e3", width: "95%" }}>
                <Box
                  mb={4}
                  style={{
                    backgroundColor: "#c7c7c7",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 100,
                    width: 180
                  }}
                >
                  <b className="semibold">Sample</b>
                </Box>

                <Box pb={1.5}>
                  <Typography variant="body2" component="h6" gutterBottom>
                    <b>Upload Status:</b>
                  </Typography>
                  Upload Complete
                </Box>

                <Box pb={1.5} style={{ width: 180, wordBreak: "break-all" }}>
                  <Typography variant="body2" component="h6" gutterBottom>
                    <b>Video File:</b>
                  </Typography>
                  <Link to="#blah">
                    [9-4-19]compositerender.Frankenstein.mp4
                  </Link>
                </Box>
              </Box>
            </Grid>
            <Grid item md={3}>
              <Box pb={1.5}>
                <Typography variant="body2" component="h6">
                  <b>Brand Logo:</b>
                </Typography>
              </Box>
              <Button
                color="primary"
                variant="contained"
                size="small"
                className={classes.button}
              >
                Upload
              </Button>

              <Box mt={3} className={classes.brandLogoPlaceholder}>
                <b className="semibold">Brand Logo</b>
                <img src={BrandLogoPlaceholder} alt="" style={{ width: 33 }} />
              </Box>
            </Grid>
            <Grid item md={3}>
              <Typography variant="body2" gutterBottom>
                <b>Choose logo corner:</b>
              </Typography>

              <RadioGroup
                aria-label="logo corner"
                name="logoCorner"
                value={value}
                onChange={handleChange}
              >
                {logoCorners.map(({ label, value }) => (
                  <StyledRadio
                    key={label}
                    value={value}
                    control={<Radio color="primary" />}
                    label={label}
                  />
                ))}
              </RadioGroup>
            </Grid>
            <Grid item md={3}>
              <Box pb={1.5}>
                <Typography variant="body2" component="h6">
                  <b>Insert Timestamp:</b>
                </Typography>
              </Box>
              <Button
                color="primary"
                variant="contained"
                size="small"
                className={classes.button}
              >
                Select
              </Button>
            </Grid>
          </Grid>
        </Card>
      </PageSection>

      <PageSection title="Select Insert Type">
        <Card className={classes.card}>
          <Grid container spacing={2}>
            {types.map((type, index) => (
              <Grid item md={4} key={index}>
                <InsertType {...type} />
              </Grid>
            ))}
          </Grid>
        </Card>
      </PageSection>

      <PageSection title="Brand Brief">
        <Card className={classes.card}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" component="h6">
                <b>Insert Timestamp:</b>
              </Typography>

              <Box style={{ maxWidth: 300 }}>
                <TextField
                  id="advertiserName"
                  name="advertiserName"
                  label="Advertiser name"
                  placeholder=""
                  helperText=""
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value=""
                />
              </Box>

              <Box style={{ maxWidth: 300 }}>
                <TextField
                  id="voiceoverText"
                  name="voiceoverText"
                  label="Voice Over Text (Max 45 words)"
                  placeholder=""
                  helperText=""
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value=""
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body2" component="h6">
                <b>Additional Information:</b>
              </Typography>

              <Box style={{ maxWidth: 300 }}>
                <TextField
                  id="callToAction"
                  name="callToAction"
                  label="(OPTIONAL) CALL TO ACTION"
                  placeholder=""
                  helperText=""
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value=""
                />
              </Box>

              <Box style={{ maxWidth: 300 }}>
                <TextField
                  id="promoCode"
                  name="promoCode"
                  label="(OPTIONAL) PROMO CODE"
                  placeholder=""
                  helperText=""
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value=""
                />
              </Box>
            </Grid>
          </Grid>
        </Card>

        <Box textAlign="center" py={1}>
          <Button
            color="primary"
            variant="contained"
            size="small"
            className={classes.button}
            onClick={() => (document.documentElement.scrollTop = 0)}
          >
            Back to Top
          </Button>
        </Box>
      </PageSection>
    </Box>
  );
};

export default PublisherDesign;
