import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ExampleChart from './assets/exampleChart.svg';
import { getCampaignById, campaignSelector } from '../../modules/campaign';

const CampaignDetailInsights = ({
  campaignId,
  selectedCampaign,
}) => {
  return (
    <div className="row m-0">
      <div className="col p-0">
        <div className="row m-0 campaignInsightsTopRow">
          <div className="col-12">
            <div className="row">
              <div className="col-4 d-flex justify-content-center">
                <div className="campaignInsightsRow1Title"># OF VIDEOS</div>
              </div>

              <div className="col-4 d-flex justify-content-center">
                <div className="campaignInsightsRow1Title">
                  IMPRESSIONS SERVED
                </div>
              </div>

              <div className="col-4 d-flex justify-content-center">
                <div className="campaignInsightsRow1Title">REVENUE EARNED</div>
              </div>
            </div>

            <div className="row">
              <div className="col-4 d-flex justify-content-center">
                <div className="campaignInsightsRow1Data">{selectedCampaign.videos}</div>
              </div>

              <div className="col-4 d-flex justify-content-center">
                <div className="campaignInsightsRow1Data">{selectedCampaign.ad_impressions}</div>
              </div>

              <div className="col-4 d-flex justify-content-center">
                <div className="campaignInsightsRow1Data campaignInsightsRow1DataGreen">
                  ${selectedCampaign.revenue_earned}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-4 d-flex justify-content-center"></div>

              <div className="col-4 d-flex justify-content-center">
                <div className="campaignInsightsRow1SubData">
                  ${selectedCampaign.earned_total} total
                </div>
              </div>

              <div className="col-4 d-flex justify-content-center">
                <div className="campaignInsightsRow1SubData">${selectedCampaign.impressions_total} total</div>
              </div>
            </div>
          </div>

          <div className="campaignInsightsMiddleBorder" />

          <div className="col-12 pl-4">
            <div className="row m-0">
              <div className="col-4">
                <div className="col-12 p-0 campaignInsightsRow2Title">
                  AD IMPRESSIONS
                </div>
                <div className="col-12 p-0 campaignInsightsRow2Data">
                  {selectedCampaign.ad_impressions}
                </div>
              </div>
              <div className="col-4">
                <div className="col-12 campaignInsightsRow2Title">CLICKS</div>
                <div className="col-12 campaignInsightsRow2Data">{selectedCampaign.clicks}</div>
              </div>

              <div className="col-4 p-0">
                <div className="col-12 p-0 campaignInsightsRow2Title">
                  POST REACH
                </div>
                <div className="col-12 p-0 campaignInsightsRow2Data">
                {selectedCampaign.post_reach}
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 pl-4 campaignInsightsRow2">
            <div className="row m-0">
              <div className="col-4">
                <div className="col-12 p-0 campaignInsightsRow2Title">
                  VIDEO IMPRESSIONS
                </div>
                <div className="col-12 p-0 campaignInsightsRow2Data">
                {selectedCampaign.video_impressions}
                </div>
              </div>
              <div className="col-4">
                <div className="col-12 campaignInsightsRow2Title">CTR</div>
                <div className="col-12 campaignInsightsRow2Data">{selectedCampaign.ctr}%</div>
              </div>

              <div className="col-4 p-0">
                <div className="col-12 p-0 campaignInsightsRow2Title">
                  VIDEO AVG. WATCH TIME
                </div>
                <div className="col-12 p-0 campaignInsightsRow2Data">
                  {selectedCampaign.watch_time}m 0s
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col text-center">
            <div className="campaignInsightsImageTitle text-right">
              EXACT AMOUNT OF TIME SEEN PER VIDEO
            </div>
            <img
              src={ExampleChart}
              className="campaignInsightsChart"
              alt="Image Icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapState = state => ({
  placeholder: 'placeholder',
  selectedCampaign: campaignSelector(state)
});
const enhance = compose(
  connect(mapState),
  withRouter
);

export default enhance(CampaignDetailInsights);
