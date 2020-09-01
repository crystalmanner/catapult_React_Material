import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { compose, lifecycle, withHandlers } from "recompose";
import { withRouter } from "react-router-dom";
import moment from "moment";

import {
  Button,
  Grid,
  CircularProgress,
  LinearProgress,
  Box
} from "@material-ui/core";
import { ErrorOutline } from "@material-ui/icons";

import StatusBar from "../../components/StatusBar";
import BootstrapTooltip from "../../components/BootstrapTooltip";
import Loader from "../../components/Loader";
import { useStyles } from "./upload.styles";

// Modules Import
import {
  loadMrsses,
  loadMoreMrsses,
  mrssesSelector,
  moreMrssesApiSelector
} from "../../modules/mrss";
import { userSelector } from "../../modules/auth";
import { setVideo, uploadVideo } from "../../modules/recipe";

// Assets Import
import uploadImg from "../../assets/icons/upload.png";
import hibernationImg from "../../assets/icons/hibernation.svg";

const mrssFeedsAvailable = false;
const mrssFeeds = [
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

const mapProps = state => ({
  moreMrssesApi: moreMrssesApiSelector(state),
  currentUser: userSelector(state)
});

const mapDispatch = {
  loadMrsses,
  loadMoreMrsses,
  uploadVideo,
  setVideo
};

const enhance = compose(
  connect(mapProps, mapDispatch),
  withHandlers({
    loadMore: props => type => {
      if (type === "mrss" && props.moreMrssesApi) {
        return props.loadMoreMrsses(props.moreMrssesApi);
      }
      return Promise.resolve();
    }
  }),
  lifecycle({
    // componentDidMount() {
    //   this.props.loadMrsses({
    //     url: 'https://cdn.jwplayer.com/v2/playlists/2H8pAj6e'
    //   });
    // }
  }),
  withRouter
);

let loadingMoreMrsses = false;

const PublisherUpload = ({
  history,
  currentUser,
  loadMore,
  loadMrsses,
  uploadVideo,
  setVideo
}) => {
  const mrssesEl = useRef();
  const feedHeaderEl = useRef();
  const feedHeaderHeight = feedHeaderEl.current
    ? feedHeaderEl.current.clientHeight
    : 0;
  const classes = useStyles({
    feedHeaderHeight
  });
  const [campaignId, setCampaignId] = useState(-1);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    if (history.location.state && history.location.state.campaignId) {
      setCampaignId(history.location.state.campaignId);
      console.log(campaignId);
    } else {
      setCampaignId(-1);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  });

  function handleScroll(e) {
    if (mrssesEl.current) {
      if (
        e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight &&
        !loadingMoreMrsses
      ) {
        loadingMoreMrsses = true;
        loadMore("mrss").then(() => {
          loadingMoreMrsses = false;
        });
      }
    }
  }

  var uploadRef = null;
  const [values, setValues] = React.useState({
    selectedFeedId: 1,
    uploading: false,
    process: 0
  });

  const onUploadProgress = progressEvent => {
    const process = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );

    setValues({
      ...values,
      uploading: true,
      process
    });
  };

  const processVideo = e => {
    const file = e.target.files[0];
    uploadVideo(file, onUploadProgress).then(() => {
      history.push("/publisher/brand", { campaignId: campaignId });
    });
  };

  const handleChange = name => event => {
    const value = event.target.value;
    setValues(oldValues => ({
      ...oldValues,
      [name]: value
    }));
    if (name === "selectedFeedId") {
      const selectedMrss = mrssFeeds.filter(
        feed => feed.id === parseInt(value)
      );

      loadMrsses({
        url: selectedMrss[0].url
      });
    }
  };

  function selectFeed(feed) {
    var img = new Image();
    img.addEventListener("load", function() {
      setVideo({
        videoUrl: feed.mrss_video_url,
        videoName: feed.title,
        aspectRatio: `${this.naturalWidth}:${this.naturalHeight}`
      });
      history.push("/publisher/brand");
    });
    img.src = feed.image;
  }

  return (
    <>
      <Grid container className={classes.body} spacing={0}>
        <Grid item xs className={classes.uploadDiv}>
          {values.uploading && (
            <>
              <CircularProgress className={classes.spinner} />
              <div className={classes.processText}>
                Processing {values.process}%...
              </div>
              <LinearProgress
                variant="determinate"
                value={values.process}
                className={classes.progressBar}
              />
            </>
          )}
          {!values.uploading && (
            <>
              <img src={uploadImg} alt="" className={classes.uploadImg}></img>
              <div className={classes.uploadText}>
                Upload a video asset to begin!
                <BootstrapTooltip
                  title="Multi-video upload coming soon"
                  placement="top"
                >
                  <ErrorOutline className={classes.errorIcon}></ErrorOutline>
                </BootstrapTooltip>
              </div>
              <input
                ref={x => (uploadRef = x)}
                accept="video/mp4,video/x-m4v,video/*"
                className={classes.input}
                id="upload-video-button"
                name="video-upload"
                type="file"
                onChange={processVideo}
              />
              <Button
                variant="contained"
                className={classes.uploadBtn}
                onClick={e => uploadRef.click(e)}
              >
                UPLOAD VIDEO
              </Button>
            </>
          )}
          <StatusBar step={1}></StatusBar>
        </Grid>
        {mrssFeedsAvailable ? (
          <Grid item className={classes.feedDiv}>
            <div className={classes.feedHeader} ref={feedHeaderEl}>
              <div>
                <div className={classes.feedTitle}>
                  {currentUser.business_name}’s MRSS FEED
                </div>
                <div>
                  <span className={classes.feedUpdated}>LAST UPDATED: </span>
                  <span className={classes.feedUpdatedTime}>
                    09-26-19 04:15:15
                  </span>
                </div>
              </div>
              <select
                className={classes.selectBrand}
                value={values.selectedFeedId}
                onChange={handleChange("selectedFeedId")}
              >
                {mrssFeeds.map((feed, index) => (
                  <option value={feed.id} key={index}>
                    {feed.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={classes.feeds} ref={mrssesEl}>
              <Loader action={loadMrsses} selector={mrssesSelector}>
                {mrssFeedList => (
                  <>
                    {mrssFeedList.map(feed => (
                      <div className={classes.feedItem} key={feed.mediaid}>
                        <img
                          src={feed.image}
                          alt=""
                          className={classes.feedImg}
                        ></img>
                        <div className={classes.feedItemTitle}>
                          {feed.title}
                        </div>
                        <div className={classes.flexBottom}>
                          <div className={classes.feedItemPublished}>
                            Published:{" "}
                            {moment(feed.pubdate * 1000).format(
                              "DD MMM YYYY HH:mm:ss"
                            )}
                          </div>
                          <Button
                            variant="contained"
                            color="primary"
                            className={classes.selectBtn}
                            onClick={() => selectFeed(feed)}
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
        ) : (
          <Grid
            item
            className={classes.feedDiv}
            container
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
              >
                <img
                  src={hibernationImg}
                  alt=""
                  className={classes.uploadImg}
                ></img>
                <div className={classes.noFeedText}>
                  Uh Oh! No Media RSS feed detected.
                </div>
                <div>Please contact the Catapult Team for more info.</div>
              </Box>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default enhance(PublisherUpload);
