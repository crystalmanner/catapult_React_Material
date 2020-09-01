import React, { useState, useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./campaignDetail.sass";

import CampaignDetailVideos from "./CampaignDetailVideos";
import CampaignDetailEdit from "./CampaignDetailEdit";
import CampaignDetailInsights from "./CampaignDetailInsights";
import { campaignSelector, campaignIdSelector, getCampaignById } from "../../modules/campaign";
import { Button } from "@material-ui/core";

const CampaignDetail = ({ campaignId, getCampaignById, selectedCampaign, history }) => {
  const [detailType, setDetailType] = useState("videos"); // videos / insights / edit
  const [editHeight, setEditHeight] = useState(0);

  useEffect(() => {
    getCampaignById(campaignId);
    var campaignEditFieldContainerTop = document
      .getElementById("campaignEditFieldContainer")
      .getBoundingClientRect().top;

    setEditHeight(window.innerHeight - campaignEditFieldContainerTop);

    const handleResize = () =>
      setEditHeight(window.innerHeight - campaignEditFieldContainerTop);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [getCampaignById, campaignId]);

  const addVideos = () => {
    history.push('/', {campaignId: campaignId});
  };

  return (
    <>
      <div className="campaignVideoRow">
        <div className="col-12 px-4">
          <div className="row">
            <div className="col-9 campaignVideoHeaderTitle d-flex align-self-center">
              <div className="align-self-center">
                <div className="subTitle">CAMPAIGN:</div>
                <div>{selectedCampaign.name}</div>
              </div>
            </div>
            <div className="col-3">
              <Button color="primary" variant="contained" onClick={addVideos} style={{fontSize: '12px'}}>
                Add Video
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="d-inline-flex justify-content-around campaignDetailTitleRow">
        <div
          className={`d-inline-flex align-items-center campaignDetailTitleItem ${
            detailType === "videos" ? "campaignDetailTitleHighlight" : null
          }`}
          onClick={() => setDetailType("videos")}
        >
          VIDEOS
        </div>
        <div
          className={`d-inline-flex align-items-center campaignDetailTitleItem ${
            detailType === "insights" ? "campaignDetailTitleHighlight" : null
          }`}
          onClick={() => setDetailType("insights")}
        >
          INSIGHTS
        </div>
        <div
          className={`d-inline-flex align-items-center campaignDetailTitleItem ${
            detailType === "edit" ? "campaignDetailTitleHighlight" : null
          }`}
          onClick={() => setDetailType("edit")}
        >
          EDIT
        </div>
      </div>

      <div
        id="campaignEditFieldContainer"
        className="campaignDetailScroll"
        style={{ height: editHeight }}
      >
        {detailType === "videos" && (
          <CampaignDetailVideos campaignId={campaignId} />
        )}

        {detailType === "edit" && (
          <CampaignDetailEdit campaignId={campaignId} />
        )}

        {detailType === "insights" && (
          <CampaignDetailInsights campaignId={campaignId} />
        )}
      </div>
    </>
  );
};

const mapState = state => ({
  placeholder: "placeholder",
  campaignId: campaignIdSelector(state),
  selectedCampaign: campaignSelector(state)
});

const mapProps = {
  getCampaignById
};
const enhance = compose(connect(mapState, mapProps), withRouter);

export default enhance(CampaignDetail);
