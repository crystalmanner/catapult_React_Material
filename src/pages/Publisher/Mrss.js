import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { compose, lifecycle, withHandlers } from "recompose";
import moment from "moment";
import { Link as RouterLink } from "react-router-dom";
import {
  makeStyles,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from "@material-ui/core";
import {
  loadMrsses,
  loadMoreMrsses,
  mrssesSelector,
  moreMrssesApiSelector
} from "../../modules/mrss";
import Loader from "../../components/Loader";

const useStyles = makeStyles(theme => ({
  body: {
    minHeight: "100%",
    width: "100%"
  },
  uploadDiv: {
    minHeight: "100%",
    background: "white",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  feedDiv: {
    width: "460px",
    background: "#f9f9f9",
    borderLeft: "solid 1px #dedede",
    position: "relative"
  },
  statusBar: {
    position: "absolute",
    zIndex: 10
  },
  uploadImg: {
    width: "136px",
    marginBottom: "30px"
  },
  uploadText: {
    color: "#181e22",
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    marginBottom: "15px"
  },
  errorIcon: {
    marginLeft: "10px"
  },
  uploadBtn: {
    backgroundColor: "#FCD339",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.31)",
    color: "white",
    height: "40px",
    width: "160px",
    "&.active, &:hover": {
      backgroundColor: "#ffca37"
    }
  },
  feedHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "25px",
    backgroundColor: "white"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  feedTitle: {
    fontSize: "20px",
    letterSpacing: "0.2px",
    color: "#181e22"
  },
  feedUpdated: {
    color: "#777777",
    marginRight: "10px"
  },
  feedUpdatedTime: {
    color: "#45d369"
  },
  feeds: {
    padding: "25px"
  },
  feedItem: {
    marginBottom: "25px"
  },
  feedItemTitle: {
    color: "#181e22",
    fontSize: "16px"
  },
  feedItemPublished: {
    color: "#777777",
    fontSize: "16px;"
  },
  selectBtn: {
    color: "white",
    fontSize: "12px",
    height: "30px",
    width: "110px"
  },
  flexCenter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  screenIndicator: {
    fontSize: "22px",
    textAlign: "center",
    color: "#dcdcdc",
    position: "absolute",
    width: "100%",
    bottom: "25px"
  },
  input: {
    display: "none"
  },
  spinner: {
    width: "115px !important",
    height: "115px !important"
  },
  progressBar: {
    width: "115px"
  },
  processText: {
    marginTop: "30px"
  },
  feedImg: {
    width: "100%"
  }
}));

const mapProps = state => ({
  moreMrssesApi: moreMrssesApiSelector(state)
});

const mapDispatch = {
  loadMrsses,
  loadMoreMrsses
};

const enhance = compose(
  connect(
    mapProps,
    mapDispatch
  ),
  withHandlers({
    loadMore: props => type => {
      if (type === "mrss" && props.moreMrssesApi) {
        return props.loadMoreMrsses(props.moreMrssesApi);
      }
      return Promise.resolve();
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.loadMrsses({
        url: "https://cdn.jwplayer.com/v2/playlists/2H8pAj6e"
      });
    }
  })
);

let loadingMoreMrsses = false;

const Mrss = ({ loadMore, loadMrsses }) => {
  const classes = useStyles();
  const mrssesEl = useRef();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  function handleScroll(e) {
    const { scrollingElement: element } = e.target;
    if (mrssesEl.current) {
      if (
        element.scrollHeight - element.scrollTop === element.clientHeight &&
        !loadingMoreMrsses
      ) {
        loadingMoreMrsses = true;
        loadMore("mrss").then(() => {
          loadingMoreMrsses = false;
        });
      }
    }
  }

  const brands = [
    {
      id: 1,
      name: "MLB",
      url: "https://cdn.jwplayer.com/v2/playlists/2H8pAj6e"
    },
    {
      id: 2,
      name: "NBA",
      url: "https://cdn.jwplayer.com/v2/playlists/vUagLTQS"
    },
    {
      id: 3,
      name: "NFL",
      url: "https://cdn.jwplayer.com/v2/playlists/HdCzd0rj"
    },
    {
      id: 4,
      name: "NCAA",
      url: "https://cdn.jwplayer.com/v2/playlists/seEXeG1D"
    },
    {
      id: 5,
      name: "90min EN",
      url: "https://cdn.jwplayer.com/v2/playlists/GzBdscja"
    },
    {
      id: 6,
      name: "TBL",
      url: "https://cdn.jwplayer.com/v2/playlists/k1LOF1gp"
    },
    {
      id: 7,
      name: "MF",
      url: "https://cdn.jwplayer.com/v2/playlists/G4ihZAdf"
    },
    {
      id: 8,
      name: "Floor8",
      url: "https://cdn.jwplayer.com/v2/playlists/pSRhdXEX"
    },
    {
      id: 9,
      name: "TheDuel",
      url: "https://cdn.jwplayer.com/v2/playlists/rq4Jvrky"
    }
  ];

  const [values, setValues] = React.useState({
    selectedId: 1
  });

  const handleChange = (
    event: React.ChangeEvent<{ name?: string, value: unknown }>
  ) => {
    let selectedId = event.target.value;
    setValues(oldValues => ({
      ...oldValues,
      selectedId
    }));
    const selectedBrand = brands.filter(item => {
      return item.id === selectedId;
    });
    loadMrsses({
      url: selectedBrand[0].url
    });
  };

  return (
    <>
      <Grid container className={classes.body} spacing={0}>
        <Grid item xs className={classes.uploadDiv}></Grid>
        <Grid item className={classes.feedDiv}>
          <div className={classes.feedHeader}>
            <div>
              <div className={classes.feedTitle}>CATAPULT’S MRSS FEED</div>
              <div>
                <span className={classes.feedUpdated}>LAST UPDATED: </span>
                <span className={classes.feedUpdatedTime}>
                  09-26-19 04:15:15
                </span>
              </div>
            </div>
            <FormControl variant="outlined" className={classes.formControl}>
              {/* <InputLabel htmlFor="brand-name">BRAND</InputLabel> */}
              <Select
                value={values.selectedId}
                onChange={handleChange}
                inputProps={
                  {
                    // id: "outlined-age-simple"
                  }
                }
              >
                {brands.map((item, index) => {
                  return (
                    <MenuItem value={item.id} key={index}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className={classes.feeds} ref={mrssesEl}>
            <Loader action={loadMrsses} selector={mrssesSelector}>
              {Mrsses => (
                <>
                  {Mrsses.map((item, index) => (
                    <div className={classes.feedItem} key={item.mediaid}>
                      <img
                        src={item.image}
                        alt=""
                        className={classes.feedImg}
                      ></img>
                      <div className={classes.feedItemTitle}>{item.title}</div>
                      <div className={classes.flexCenter}>
                        <div className={classes.feedItemPublished}>
                          Published:{" "}
                          {moment(item.pubdate * 1000).format(
                            "DD MMM YYYY HH:mm:ss"
                          )}
                        </div>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.selectBtn}
                          component={RouterLink}
                          to={`/publisher/mrss/${item.mediaid}`}
                        >
                          Select
                        </Button>
                      </div>
                    </div>
                  ))}
                  {loadingMoreMrsses && <CircularProgress />}
                </>
              )}
            </Loader>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default enhance(Mrss);
