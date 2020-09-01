import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { TextField, Button } from '@material-ui/core';

import ImageIcon from './assets/imageIcon.svg';
import { getCampaignById, campaignSelector, updateCampaignLogo, updateCampaign } from '../../modules/campaign';
import { useStyles } from './campaign.styles';
import campaignLogo from '../../assets/icons/compaign-logo.svg';

const CampaignDetailEdit = ({
  campaignId,
  selected,
  updateCampaign,
  updateCampaignLogo
}) => {

  var uploadRef = null;
  const [state, setState] = React.useState({
    addingCampaign: false
  });

  const [newCampaign, setNewCampaign] = React.useState({
    name: selected.name?selected.name:'',
    url: selected.url?selected.url:'',
    // darkLogo: selected.dark_logo,
    // lightLogo: selected.light_logo,
    flightStart: selected.flight_start?selected.flight_start:'',
    flightEnd: selected.flight_end?selected.flight_end:'',
    impressionsRequired: selected.impressions_required?selected.impressions_required:'',
    cpm: selected.cpm?selected.cpm:'',
    onScreenOffer: selected.on_screen_offer?selected.on_screen_offer:'',
    campaignLiveRead: selected.live_read_text?selected.live_read_text:'',
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
    setState({ addingCampaign: true });
    console.log(newCampaign);
    const result = await updateCampaign(campaignId, newCampaign);
    const campaign = result.value.data;
    setSelectedCampaign({
      ...campaign,
      selectedType: 'dark'
    });
    setState({ addingCampaign: false });
  };

  const classes = useStyles();

  useEffect(()=> {
    const update = {
      name: selected.name?selected.name:'',
      url: selected.url?selected.url:'',
      // darkLogo: selected.dark_logo,
      darkLogoPreview: selected.dark_logo,
      // lightLogo: selected.light_logo,
      lightLogoPreview:selected.light_logo,
      flightStart: selected.flight_start?selected.flight_start:'',
      flightEnd: selected.flight_end?selected.flight_end:'',
      impressionsRequired: selected.impressions_required?selected.impressions_required:'',
      cpm: selected.cpm?selected.cpm:'',
      onScreenOffer: selected.on_screen_offer?selected.on_screen_offer:'',
      campaignLiveRead: selected.live_read_text?selected.live_read_text:'',
      selectedLogo: '',
      errors: {}
    };
    setNewCampaign(update);

  }, [selected]);
  return (
    <div className="row campaignEditFieldContainer h-100">
      <div className="col">
        <div className="row">
          <div className="col-12 p-0 campaignEditTitle">Edit Campaign</div>
        </div>
        <div className="d-flex flex-column justify-content-around campaignEditFieldInnerWrapper">
          <div className="row">
            <div className="col pl-4">
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
            </div>
            <div className="col pr-4">
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
            </div>
          </div>
          <div className="row">
            <div className="col pl-4">
              <TextField
                id="outlined-uncontrolled"
                name="flightStart"
                label="FLIGHT START"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={newCampaign.flightStart}
                onChange={handleNewCampaignChange}
              />
            </div>
            <div className="col pr-4">
              <TextField
                id="outlined-uncontrolled"
                name="flightEnd"
                label="FLIGHT END"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={newCampaign.flightEnd}
                onChange={handleNewCampaignChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col pl-4">
              <TextField
                id="outlined-uncontrolled"
                name="impressionsRequired"
                label="IMPRESSIONS REQUIRED"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={newCampaign.impressionsRequired}
                onChange={handleNewCampaignChange}
              />
            </div>
            <div className="col pr-4">
              <TextField
                id="outlined-uncontrolled"
                name="cpm"
                label="CPM"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={newCampaign.cpm}
                onChange={handleNewCampaignChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col px-4">
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
            </div>
          </div>

          <div className="row">
            <div className="col px-4">
              <TextField
                id="campaignLiveRead"
                name="campaignLiveRead"
                label="CAMPAIGN LIVE-READ"
                multiline
                rows={6}
                rowsMax={6}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={newCampaign.campaignLiveRead}
                onChange={handleNewCampaignChange}
                helperText="240 character max"
                error={newCampaign.errors.campaignLiveRead}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6 pl-5 pr-4">
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
            <div className="col-6 pl-4 pr-5">
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
          <div className="row">            
            <div className="col px-4">
              <Button
                color="primary"
                variant="contained"
                className={classes.modalBtn}
                onClick={handleCreateCampaign}
              >
                UPDATE
              </Button>
            </div>
          </div>
        </div>
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
    </div>
  );
};

const mapState = state => ({
  placeholder: 'placeholder',
  selected: campaignSelector(state)
});

const mapProps = {
  updateCampaign,
  updateCampaignLogo
};

const enhance = compose(
  connect(mapState, mapProps),
  withRouter
);

export default enhance(CampaignDetailEdit);
