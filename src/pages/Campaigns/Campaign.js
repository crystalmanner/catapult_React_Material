import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CampaignOverview from './CampaignOverview';
import CampaignDetail from './CampaignDetail';

import './campaign.sass';

import DownArrow from './assets/downArrow.svg';

const Campaign = () => {
  const [minimize, setMinimize] = useState(false); // all / past / meshed / live

  return (
    <div className="container-fluid h-100 campaignBody overflow-hidden">
      <div className="row h-100">
        <div
          className="col-auto campaignOverviewCol"
          style={{ width: minimize ? '100%' : '60%' }}
        >
          <CampaignOverview />
        </div>

        <div className="col p-0">
          <div className="campaignMinimizeButtonWrapper">
            <div
              className="campaignMinimizeButton"
              onClick={() => setMinimize(!minimize)}
            >
              {minimize ? 'Maximize' : 'Minimize'} {'  '}
              <img src={DownArrow} className="campaignDownArrow" alt="Arrow" />
            </div>
          </div>
          <div className={`${minimize ? 'd-none' : 'd-block'}`}>
            <CampaignDetail />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapState = state => ({
  placeholder: 'placeholder'
});

const enhance = compose(
  connect(mapState),
  withRouter
);

export default enhance(Campaign);
