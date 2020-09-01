import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Dialog,
  Slide,
  Button
} from "@material-ui/core";

import StatusBar from "../../components/StatusBar";
// import playButton from '../../assets/icons/play-button.png';

// Modules Import
import { videoSelector, submitVideo } from "../../modules/recipe";
import { campaignListSelector } from "../../modules/campaign";
import { userSelector } from "../../modules/auth";
import { computeAspectRatio } from "../../helpers/video";
import { templateListSelector } from "../../modules/template";
import { livereadListSelector } from "../../modules/liveread";

import FacebookIcon from "./assets/review/facebook.svg";
import InstagramIcon from "./assets/review/instagram.svg";
import PlayIcon from "./assets/review/play.svg";
import TwitterIcon from "./assets/review/twitter.svg";
import YoutubeIcon from "./assets/review/youtube.svg";
import "./review.sass";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const positions = {
  top_right: "Top Right",
  top_left: "Top Left",
  bottom_right: "Bottom Right",
  bottom_left: "Bottom Left"
};

const PublisherReview = ({
  recipe,
  campaignList,
  templateList,
  livereadList,
  submitVideo,
  history
}) => {
  const videoItems = recipe.videoUrl
    ? [
        {
          title: recipe.videoName,
          rate: computeAspectRatio(recipe.aspectRatio),
          inserts: recipe.templates.map(template => {
            const selected = templateList.find(t => t.id === template.id);
            return {
              title: selected.title
            };
          })
        }
      ]
    : [];

  const campaign = recipe.campaignId
    ? campaignList.find(campaign => campaign.id === recipe.campaignId)
    : {};

  const [thanksDialogOpen, setThanksDialogOpen] = React.useState(false);

  const handleClose = () => {
    history.push("/");
  };

  const getLiveReadTitle = livereadId => {
    if (!livereadId) return "No Campaign";
    if (livereadId === "campaign-specific") return "Campaign";
    return livereadList.find(el => el.id === parseInt(livereadId)) || {};
  };

  const handleSubmit = () => {
    let livereadId = "";
    if (recipe.liveRead && recipe.liveRead !== "campaign-specific") {
      livereadId = recipe.liveRead;
    }
    submitVideo({
      by: recipe.by,
      videoId: recipe.videoId,
      campaignId: recipe.campaignId,
      logoPlacement: recipe.logoPosition,
      logoType: recipe.campaignType,
      templateId: recipe.templates[0].id,
      livereadId,
      useCampaignLiveread: livereadId === "campaign-specific"
    });
    setThanksDialogOpen(true);
  };

  return (
    <div className="reviewBody reviewStyleWrapper">
      <div>
        <div className="pageText">Review:</div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-7 reviewCard reviewCardLeft reviewCardBottom d-table">
              <div className="row">
                <div className="col">
                  <div className="reviewHeaderText">VIDEO ASSET</div>
                  {videoItems.map((item, index) => {
                    return (
                      <>
                        <div item className="reviewHeaderSubText">
                          {item.title}
                        </div>

                        <div className="reviewHeaderSubTextIndented">
                          {item.inserts.map((insert, index) => (
                            <div key={index}>- {insert.title}</div>
                          ))}
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="col-auto">
                  <div className="reviewHeaderText">ADVERTISER LOGO</div>
                  <div className="d-flex justify-content-center">
                    {campaign.id ? (
                      <img
                        src={campaign[`${recipe.campaignType}_logo`]} //src={CatapultLogo}
                        className="reviewCatapultLogo"
                        alt="Catapult"
                      />
                    ) : (
                      <div className="reviewYMarginBottom">No Campaign</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="reviewBottomBorder" />
              <div className="row">
                <div className="col">
                  <div className="reviewHeaderText">CAMPAIGN DETAILS</div>

                  <div className="reviewDarkText">Campaign Name</div>

                  <div className="reviewDarkText">Impressions Remaining</div>
                </div>
                <div className="col-auto">
                  <div className="reviewYMargin">&nbsp; </div>

                  <div className="text-right reviewYMargin">
                    {campaign.id ? campaign.name : "No Campaign"}
                  </div>

                  <div className="reviewYMargin">
                    4,000,000 /
                    <span className="reviewDarkText"> 10,000,000</span>
                  </div>
                </div>
              </div>
              <div className="reviewBottomBorder" />
              <div className="">
                <div className="reviewHeaderText">PUSH TO SOCIAL</div>
              </div>
              <div className="row">
                <div className="col-3">
                  <img
                    src={FacebookIcon}
                    className="reviewSocialButton"
                    alt="Facebook"
                  />
                </div>

                <div className="col-3">
                  <img
                    src={InstagramIcon}
                    className="reviewSocialButton"
                    alt="Instagram"
                  />
                </div>

                <div className="col-3">
                  <img
                    src={TwitterIcon}
                    className="reviewSocialButton"
                    alt="Twitter"
                  />
                </div>

                <div className="col-3">
                  <img
                    src={YoutubeIcon}
                    className="reviewSocialButton"
                    alt="YouTube"
                  />
                </div>
              </div>
            </div>

            <div className="col p-0">
              <div className="col reviewCard reviewCardRight">
                <div className="row">
                  <div className="col-5 reviewHeaderText reviewYMarginResponsive">
                    LOGO POSITION:
                  </div>
                  <div className="col-7 reviewYMargin reviewYMarginResponsive">
                    {recipe.logoPosition
                      ? positions[recipe.logoPosition]
                      : "No Position"}
                  </div>
                </div>
                <div className="reviewBottomBorder m-0" />
                <div className="row">
                  <div className="col-5">
                    <div className="d-inline-block text-center">
                      <div className="reviewHeaderText reviewPlayIcon reviewYMarginResponsive">
                        LIVE READ:
                      </div>
                      <img src={PlayIcon} className="mb-2" alt="PlayIcon" />
                    </div>
                  </div>
                  <div className="col-7 reviewYMargin reviewYMarginResponsive">
                    <div className="pt-2px">
                      {recipe.liveRead
                        ? getLiveReadTitle(recipe.liveRead).title
                        : "No Live Read"}
                    </div>

                    <div className="reviewLightText">
                      {recipe.liveRead ? "Custom 1" : ""}
                    </div>
                  </div>
                </div>
                <div className="reviewBottomBorder m-0" />
                <div className="row">
                  <div className="col-5 reviewHeaderText reviewYMarginResponsive">
                    CALL-TO-ACTION:
                  </div>

                  <div className="col-7 reviewYMargin reviewYMarginResponsive">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor
                  </div>
                </div>
                <div className="reviewBottomBorder m-0" />
                <div className="row">
                  <div className="col-5 reviewHeaderText reviewYMarginResponsive">
                    TIMESTAMP:
                  </div>

                  <div className="col-7 reviewYMargin reviewYMarginResponsive">
                    00:00:11:18
                  </div>
                </div>
              </div>

              <div className="col reviewCard reviewCardBottom reviewCardBottomRight reviewCardRight">
                <div className="row ">
                  <div className="col-8 reviewHeaderText">
                    RENDER ANOTHER VIDEO
                  </div>
                  <div className="col-4 d-flex align-items-center">
                    <Button
                      component="div"
                      color="primary"
                      variant="contained"
                      className="reviewMeshButton ml-auto"
                    >
                      Mesh
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={thanksDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setThanksDialogOpen(false)}
      >
        <DialogTitle>Mesh Submitted!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Thank you for submitting your Mesh, you will receive compiled
            versions by email
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Finish
          </Button>
        </DialogActions>
      </Dialog>
      <StatusBar step={4} nextButton={true} onNext={handleSubmit}></StatusBar>
    </div>
  );
};

const mapState = state => ({
  recipe: videoSelector(state),
  campaignList: campaignListSelector(state),
  currentUser: userSelector(state),
  templateList: templateListSelector(state),
  livereadList: livereadListSelector(state)
});

const mapProps = {
  submitVideo
};

const enhance = compose(connect(mapState, mapProps), withRouter);

export default enhance(PublisherReview);
