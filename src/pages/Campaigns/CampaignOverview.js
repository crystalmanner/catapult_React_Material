import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  Modal,
  Fade,
  IconButton,
  Grid,
  TextField,
  Button,
  Backdrop
} from '@material-ui/core';

import { Close } from '@material-ui/icons';

import { 
  getCampaigns,
  
  createCampaign,
  updateCampaignLogo,
  campaignListSelector,
  setCampaign,
  getCampaignById,
  campaignIdSelector
} from '../../modules/campaign';
import campaignLogo from '../../assets/icons/compaign-logo.svg';
import { useStyles } from './campaign.styles';

import './campaignOverview.sass';

import CatapultLogo from './catapult.svg';
const getRemainDates = date => {
  let expDate = new Date(date);
  let curDate = new Date();
  let deltaDay = Math.ceil((expDate - curDate)/(1000 * 60 * 60 * 24));
  return deltaDay
}
const isNew = date => {
  let expDate = new Date(date);
  let curDate = new Date();
  let deltaDay = Math.ceil((expDate - curDate)/(1000 * 60 * 60 * 24));
  return deltaDay >= -10;
}
const getStringDate = days => {
  if(days >= 1) {
    return days + ' days'
  } else if(days === 1) {
    return days + ' day'
  } else if(days === 0) {
    return 'expired today now!'
  } else {
    return Math.abs(days) + ' days passed.'
  }
}

const CampaignOverview = ({
  campaignList,
  campaignId,

  setCampaign,
  getCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaignLogo
}) => {
  const [campaignType, setCampaignType] = useState('all'); // all / past / meshed / live

  const [overviewHeight, setOverviewHeight] = useState(0);

  var uploadRef = null;
  const [state, setState] = React.useState({
    addingCampaign: false
  });
  const [campaignDialogOpen, setCampaignDialogOpen] = React.useState(false);

  const [newCampaign, setNewCampaign] = React.useState({
    name: '',
    url: '',
    darkLogo: null,
    lightLogo: null,
    onScreenOffer: '',
    campaignLiveRead: '',
    selectedLogo: '',
    errors: {}
  });
  const [selectedCampaign, setSelectedCampaign] = React.useState({});
  const handleNewCampaignChange = e => {
    const update = {
      ...newCampaign,
      [e.target.name]: e.target.value,
      errors: {}
    };
    if (e.target.name === 'campaignLiveRead' && e.target.value.length > 240) {
      update.errors.campaignLiveRead = true;
    }
    setNewCampaign(update);
  };  
  const handleNewCampaignLogoChange = type => e => {
    setNewCampaign({ ...newCampaign, selectedLogo: type });
    uploadRef.click(e);
  };

  const handleUploadCampaignLogo = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async e => {
      if (state.editSelectedLogo) {
        const res = await updateCampaignLogo(
          selectedCampaign.id,
          selectedCampaign.selectedType,
          file
        );
        setSelectedCampaign({
          ...selectedCampaign,
          [`${selectedCampaign.selectedType}_logo`]: res.value.data[
            `${selectedCampaign.selectedType}_logo`
          ]
        });
      } else {
        setNewCampaign({
          ...newCampaign,
          [newCampaign.selectedLogo]: file,
          [`${newCampaign.selectedLogo}Preview`]: e.target.result,
          selectedLogo: ''
        });
      }
    };
    reader.readAsDataURL(file);
  };
  const handleCreateCampaign = async () => {
    if (newCampaign.errors.campaignLiveRead) return;
    setCampaignDialogOpen(false);
    setState({ addingCampaign: true });
    const result = await createCampaign(newCampaign);
    const campaign = result.value.data;
    setSelectedCampaign({
      ...campaign,
      selectedType: 'dark'
    });
    setState({ addingCampaign: false });
  };

  const setCampaignId = id => e => {
    setCampaign(id);
    // getCampaignById(id);
  }

  const classes = useStyles();

  useEffect(() => {
    getCampaigns();
    var campaignOverviewWrapperTop = document
      .getElementById('campaignOverviewWrapper')
      .getBoundingClientRect().top;

    setOverviewHeight(window.innerHeight - campaignOverviewWrapperTop);

    const handleResize = () =>
      setOverviewHeight(window.innerHeight - campaignOverviewWrapperTop);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [getCampaigns]);

  return (
    <>
      <div className="row campaignTitleRow d-flex justify-content-between">
        <div className="d-inline-block">
          <div className="d-inline-flex campaignTitle p-0">Campaigns</div>

          <div className="d-inline-flex">
            <div className="campaignNewIcon d-flex align-items-center justify-content-center">
              <Button color="primary" variant="contained"
                onClick={() => setCampaignDialogOpen(true)}
              >
                New
              </Button>
            </div>
          </div>
        </div>

        <div className="campaignTitleCategoriesRowWrapper">
          <div className="d-inline-flex justify-content-around h-100 campaignTitleCategoriesRow">
            <div
              className={`d-inline-flex align-items-center h-100 campaignTitleCategoriesItem ${
                campaignType === 'all'
                  ? 'campaignTitleCategoriesHighlight campaignGreen'
                  : null
              }`}
              onClick={() => setCampaignType('all')}
            >
              ALL
            </div>
            <div
              className={`d-inline-flex align-items-center h-100 campaignTitleCategoriesItem ${
                campaignType === 'past'
                  ? 'campaignTitleCategoriesHighlight campaignOrange'
                  : null
              }`}
              onClick={() => setCampaignType('past')}
            >
              PAST
            </div>
            <div
              className={`d-inline-flex align-items-center h-100 campaignTitleCategoriesItem ${
                campaignType === 'meshed'
                  ? 'campaignTitleCategoriesHighlight campaignYellow'
                  : null
              }`}
              onClick={() => setCampaignType('meshed')}
            >
              MESHED
            </div>
            <div
              className={`d-inline-flex align-items-center h-100 campaignTitleCategoriesItem ${
                campaignType === 'live'
                  ? 'campaignTitleCategoriesHighlight campaignGreen'
                  : null
              }`}
              onClick={() => setCampaignType('live')}
            >
              LIVE
            </div>
          </div>
        </div>
      </div>
      <div className="row campaignSubTitlesRow">
        <div className="col">
          <div className="row campaignOverviewRowLabels">
            <div className="col-auto p-0 campaignOverviewCol1 bg-white d-flex justify-content-center d-flex align-items-center">
              STAGE
            </div>
            <div className="col p-0">
              <div className="row m-0">
                <div className="col-auto p-0 campaignOverviewCol2"></div>
                <div className="col-auto p-0 campaignOverviewCol3 d-flex align-items-center">
                  CAMPAIGN NAME
                </div>
                <div className="col-auto p-0 campaignOverviewCol4 d-flex align-items-center justify-content-center">
                  DAYS REMAINING
                </div>
                <div className="col-auto p-0 campaignOverviewCol56 d-flex align-items-center justify-content-center">
                  % DELIVERED
                </div>
                <div className="col-auto p-0 campaignOverviewCol56 d-flex align-items-center justify-content-center">
                  CTR
                </div>
                <div className="col-auto p-0 campaignOverviewCol7 d-flex align-items-center justify-content-center">
                  REVENUE EARNED
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="campaignOverviewWrapper"
        className="col p-0 campaignOverviewRowWrapper"
        style={{ height: overviewHeight }}
      >
        <div className="row m-0 campaignStatusTitlesRow d-flex justify-content-center">
          <div className="col-auto d-flex align-items-center campaignStatusTitles campaignOrange">
            <span className="campaignStatusTitlesSquare" /> Past
          </div>
          <div className="col-auto d-flex align-items-center campaignStatusTitles campaignYellow">
            <span className="campaignStatusTitlesSquare" /> Meshed
          </div>
          <div className="col-auto d-flex align-items-center campaignStatusTitles campaignGreen">
            <span className="campaignStatusTitlesSquare" /> Live
          </div>
        </div>

        {campaignList.map((campaign, index) => {
          if(campaignType === 'live') {
            if (getRemainDates(campaign.date_expired)<0) return <></>;
          } else if (campaignType === 'meshed') {
            if (getRemainDates(campaign.date_expired)< -5 || getRemainDates(campaign.date_expired)>0) return <></>;
          } else if (campaignType === 'past') {
            if (getRemainDates(campaign.date_expired)>=-5) return <></>;
          }

          return (
            <React.Fragment key={campaign.id}>
              {isNew(campaign.date_created) && (
                <div className="row campaignNewAssetIconWrapper2">
                  <div className="campaignNewAssetIcon2" />
                </div>
              )}
              <div  className="row campaignOverviewRow">
                <div
                  className={`col-auto p-0 campaignOverviewCol1 
                    ${
                      getRemainDates(campaign.date_expired) < -5
                        ? 'campaignOrange'
                        : getRemainDates(campaign.date_expired) < 0
                        ? 'campaignYellow'
                        : 'campaignGreen'
                    }
                  `}
                ></div>
                <div className={`col p-0 cursor-pointer ${campaign.id === campaignId ? 'selected':null}`} 
                  onClick={setCampaignId(campaign.id)}>
                  <div className="row m-0 d-flex align-items-center campaignOverviewRowInner">
                    <div className="col-auto p-0 d-flex justify-content-center campaignOverviewCol2">
                      <img
                        src={
                          campaign.light_logo?campaign.light_logo:(campaign.dark_logo?campaign.dark_logo:CatapultLogo)
                        }
                        className="campaignOverviewRowLogo"
                        alt="Catapult"
                      />
                    </div>
                    <div className="col-auto p-0 campaignOverviewCol3">
                      {campaign.name}
                    </div>
                    <div className="col-auto p-0 campaignOverviewCol4">
                      {getStringDate(getRemainDates(campaign.date_expired))}
                      <br/>
                    </div>
                    <div className="col-auto p-0 campaignOverviewCol56">
                      {campaign.delivered}%
                    </div>
                    <div className="col-auto p-0 campaignOverviewCol56">
                      {campaign.ctr}%
                    </div>
                    <div className="col-auto p-0 campaignOverviewCol7 campaignGreen">
                      ${campaign.revenue_earned}
                    </div>
                  </div>
                </div>
                {isNew(campaign.date_created) && (
                  <div className="campaignNewAssetIconWrapper">
                    <div className="campaignNewAssetIcon">NEW ASSET!</div>
                  </div>
                )} 
              </div>
            </React.Fragment>
          );
        })}
      </div>
    
    
      <input
        ref={x => (uploadRef = x)}
        accept="image/*"
        style={{ display: 'none' }}
        id="upload-image-button"
        name="image-upload"
        type="file"
        onChange={handleUploadCampaignLogo}
      />
      <Modal
        className={classes.modal}
        open={campaignDialogOpen}
        onClose={() => setCampaignDialogOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={campaignDialogOpen}>
          <div className={classes.paper}>
            <div className={classes.modalHeader}>
              <div className={classes.modalTitle}>Add New Campaign</div>
              <IconButton onClick={() => setCampaignDialogOpen(false)}>
                <Close></Close>
              </IconButton>
            </div>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  id="outlined-uncontrolled"
                  name="name"
                  label="CAMPAIGN NAME"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={newCampaign.name}
                  onChange={handleNewCampaignChange}
                />
                <TextField
                  id="outlined-uncontrolled"
                  name="url"
                  label="CAMPAIGN LINK"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={newCampaign.url}
                  onChange={handleNewCampaignChange}
                />
                
                <div className="row">
                  <div className="col-6">
                    <div
                      className={classes.compaignLogo}
                      onClick={handleNewCampaignLogoChange('lightLogo')}
                    >
                      {!newCampaign.lightLogoPreview && (
                        <div className={classes.logoTitle}>LIGHT LOGO</div>
                      )}
                      <img
                        src={newCampaign.lightLogoPreview || campaignLogo}
                        alt=""
                        className={classes.logoImg}
                        style={
                          newCampaign.lightLogoPreview
                            ? { marginTop: '0px', width: '100%' }
                            : { opacity: 0.2 }
                        }
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div
                      className={classes.compaignLogo}
                      onClick={handleNewCampaignLogoChange('darkLogo')}
                    >
                      {!newCampaign.darkLogoPreview && (
                        <div className={classes.logoTitle}>DARK LOGO</div>
                      )}
                      <img
                        src={newCampaign.darkLogoPreview || campaignLogo}
                        alt=""
                        className={classes.logoImg}
                        style={
                          newCampaign.darkLogoPreview
                            ? { marginTop: '0px', width: '100%' }
                            : { opacity: 0.2 }
                        }
                      />
                    </div>
                  </div>
                </div>
                
                {/* <div className={classes.flexCenter}>
                  <div
                    className={classes.compaignLogo}
                    onClick={handleNewCampaignLogoChange('lightLogo')}
                  >
                    {!newCampaign.lightLogoPreview && (
                      <div className={classes.logoTitle}>LIGHT LOGO</div>
                    )}
                    <img
                      src={newCampaign.lightLogoPreview || campaignLogo}
                      alt=""
                      className={classes.logoImg}
                      style={
                        newCampaign.lightLogoPreview
                          ? { marginTop: '0px' }
                          : { opacity: 0.2 }
                      }
                    />
                  </div>
                  <div
                    className={classes.compaignLogo}
                    onClick={handleNewCampaignLogoChange('darkLogo')}
                  >
                    {!newCampaign.darkLogoPreview && (
                      <div className={classes.logoTitle}>DARK LOGO</div>
                    )}
                    <img
                      src={newCampaign.darkLogoPreview || campaignLogo}
                      alt=""
                      className={classes.logoImg}
                      style={
                        newCampaign.darkLogoPreview
                          ? { marginTop: '0px' }
                          : { opacity: 0.2 }
                      }
                    />
                  </div>
                </div> */}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="onScreenOffer"
                  name="onScreenOffer"
                  label="ON-SCREEN OFFER"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={newCampaign.onScreenOffer}
                  onChange={handleNewCampaignChange}
                />
                <TextField
                  id="campaignLiveRead"
                  name="campaignLiveRead"
                  label="CAMPAIGN LIVE-READ"
                  multiline
                  rows={8}
                  rowsMax={8}
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={newCampaign.campaignLiveRead}
                  onChange={handleNewCampaignChange}
                  helperText="240 character max"
                  error={newCampaign.errors.campaignLiveRead}
                />
              </Grid>
            </Grid>
            <Button
              color="primary"
              variant="contained"
              className={classes.modalBtn}
              onClick={handleCreateCampaign}
            >
              ADD
            </Button>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

const mapState = state => ({
  placeholder: 'placeholder',
  campaignList: campaignListSelector(state),
  campaignId: campaignIdSelector(state),
});

const mapProps = {
  getCampaigns,
  createCampaign,
  setCampaign,
  getCampaignById,
  updateCampaignLogo
}
const enhance = compose(
  connect(mapState, mapProps),
  withRouter
);

export default enhance(CampaignOverview);
