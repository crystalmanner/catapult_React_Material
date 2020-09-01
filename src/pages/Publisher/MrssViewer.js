import { connect } from "react-redux";
import { compose } from "recompose";
import { loadMrss, mrssesSelector } from "../../modules/mrss";
import { withRouter } from "react-router-dom";
import React from "react";
import {
  Box,
  Button,
  Card,
  Chip,
  Grid,
  Link,
  Typography
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import TextTruncate from "react-text-truncate";
import moment from "moment";

const mapProps = (state, ownProps) => {
  const mrssId = ownProps.match.params.id;
  return {
    mrss: mrssesSelector(state).find(el => el.mediaid === mrssId)
  };
};

const mapDispatch = {
  loadMrss
};

const enhance = compose(
  withRouter,
  connect(
    mapProps,
    mapDispatch
  )
);

const useStyles = makeStyles(theme => ({
  card: {
    backgroundColor: "white",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2.5)
  },
  header: {
    paddingBottom: theme.spacing(2)
  },
  videoContainer: {
    position: "relative",
    overflow: "hidden",
    paddingTop: "56.25%"
  },
  responsiveIframe: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: 0
  },
  relatedEpisodesBox: {
    display: "flex",
    flexDirection: "column",
    minHeight: `calc(100vh - 60px - ${theme.spacing(7)}px)`,
    marginBottom: 0
  },
  relatedEpisode: {
    paddingBottom: theme.spacing(2)
  },
  videoCol: {
    minHeight: `calc(100vh - 60px - ${theme.spacing(7)}px)`,
    marginBottom: 0,

    display: "flex",
    flexDirection: "column"
  },
  tag: {
    marginRight: theme.spacing(0.75)
  }
}));

const MrssViewer = ({ mrss }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item md={7}>
        <Card className={`${classes.card} ${classes.videoCol}`}>
          <Box mb={2}>
            <div className={classes.videoContainer}>
              <iframe
                src={mrss.mrss_video_url}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="video"
                className={classes.responsiveIframe}
              />
            </div>
          </Box>

          <Box mb={1}>
            <Grid container spacing={1}>
              <Grid item xs={true}>
                <Typography variant="h6" component="h1">
                  {mrss.title}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Box mb={1}>
            <Typography>
              <TextTruncate
                line={3}
                element="span"
                truncateText="…"
                text={mrss.description}
              />
            </Typography>
            Published:{" "}
            {moment(mrss.pubdate * 1000).format("DD MMM YYYY HH:mm:ss")}
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default enhance(MrssViewer);
