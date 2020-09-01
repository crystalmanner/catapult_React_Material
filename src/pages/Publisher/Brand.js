import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  Button,
  Fab,
  IconButton,
  FormControlLabel,
  Modal,
  Fade,
  Backdrop,
  TextField,
  Radio,
  RadioGroup,
  Grid,
  CircularProgress
} from "@material-ui/core";
import { Close, Add as AddIcon, PlayArrow } from "@material-ui/icons";

import StatusBar from "../../components/StatusBar";
import SwitchButton from "../../components/switch/SwitchButton";
import { useStyles } from "./brand.styles";

// Modules Import
import { videoSelector, setBrand } from "../../modules/recipe";
import {
  campaignListSelector,
  getCampaigns,
  createCampaign,
  updateCampaignLogo
} from "../../modules/campaign";
import { getLivereads, livereadListSelector } from "../../modules/liveread";
import { computeAspectRatio } from "../../helpers/video";

import campaignLogo from "../../assets/icons/compaign-logo.svg";
// import timestampImg from '../../assets/imgs/2-1.png';

const logoCorners = [
  { label: "No Position", value: "" },
  { label: "Top Left", value: "top_left" },
  { label: "Top Right", value: "top_right" },
  { label: "Bottom Left", value: "bottom_left" },
  { label: "Bottom Right", value: "bottom_right" }
];

const PublisherBrand = ({
  recipe,
  campaignList,
  livereadList = [],
  getCampaigns,
  getLivereads,
  createCampaign,
  updateCampaignLogo,
  setBrand,
  history
}) => {
  var uploadRef = null;

  const classes = useStyles();

  const enhancedLivereads = React.useMemo(() => {
    return [
      {
        id: "",
        title: "No Campaign"
      },
      {
        id: "campaign-specific",
        title: "Campaign"
      },
      ...livereadList
    ];
  }, [livereadList]);
  const [state, setState] = React.useState({
    addingCampaign: false
  });
  const [newCampaign, setNewCampaign] = React.useState({
    name: "",
    url: "",
    darkLogo: null,
    lightLogo: null,
    onScreenOffer: "",
    campaignLiveRead: "",
    selectedLogo: "",
    errors: {}
  });

  const [pos, setPos] = React.useState(recipe.logoPosition || "");
  const [live, setLive] = React.useState(recipe.liveRead || "");
  const [by, setBy] = React.useState("Sponsored by");

  const [selectedCampaign, setSelectedCampaign] = React.useState(() => {
    const campaign =
      campaignList.find(campaign => campaign.id === history.location.state.campaignId) || {};
    return {
      ...campaign,
      selectedType: recipe.campaignType || "dark"
    };
  });
  const handleSelectCampaign = event => {
    const campaign =
      campaignList.find(
        campaign => campaign.id === parseInt(event.target.value)
      ) || {};
    setSelectedCampaign({
      ...campaign,
      selectedType: campaign.dark_logo
        ? "dark"
        : campaign.light_logo
        ? "light"
        : "dark"
    });
  };

  const [campaignDialogOpen, setCampaignDialogOpen] = React.useState(false);
  const handleNewCampaignChange = e => {
    const update = {
      ...newCampaign,
      [e.target.name]: e.target.value,
      errors: {}
    };
    if (e.target.name === "campaignLiveRead" && e.target.value.length > 240) {
      update.errors.campaignLiveRead = true;
    }
    if (e.target.name === "name" && !e.target.value && newCampaign.name) {
      update.errors.name = true;
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
          selectedLogo: ""
        });
      }
    };
    reader.readAsDataURL(file);
  };
  const handleCreateCampaign = async () => {
    if (newCampaign.errors.campaignLiveRead) return;
    if (newCampaign.errors.name) return;
    setCampaignDialogOpen(false);
    setState({ addingCampaign: true });
    const result = await createCampaign(newCampaign);
    const campaign = result.value.data;
    setSelectedCampaign({
      ...campaign,
      selectedType: campaign.dark_logo
        ? "dark"
        : campaign.light_logo
        ? "light"
        : "dark"
    });
    setState({ addingCampaign: false });
  };

  const handleCampaignLogoChange = e => {
    if (!selectedCampaign.id) return;
    setState({ editSelectedLogo: true });
    uploadRef.click(e);
  };


  const handleSubmit = () => {
    setBrand({
      logoPosition: pos,
      liveRead: live,
      campaignId: selectedCampaign.id,
      campaignType: selectedCampaign.selectedType,
      by
    });
  };

  useEffect(() => {
    getCampaigns();
    getLivereads();
  }, [getCampaigns, getLivereads]);

  const playLiveread = livereadUrl => () => {
    const audioEl = document.createElement("audio");
    audioEl.src = livereadUrl;
    document.body.append(audioEl);
    audioEl.play();
  };

  const aspectRatio = computeAspectRatio(recipe.aspectRatio);
  const aspectRatioClassName = target => {
    return [
      classes.rating,
      aspectRatio === target ? classes.ratingActive : ""
    ].join(" ");
  };

  const selectedCampaignLogo =
    selectedCampaign[`${selectedCampaign.selectedType}_logo`];

  return (
    <div className={classes.body}>
      <div className={classes.firstSection}>
        <div>
          <div className={classes.videoContainer}>
            <iframe
              src={recipe.videoUrl}
              frameBorder="0"
              title="video"
              className={classes.responsiveIframe}
            />
          </div>
          <div className={[classes.subtitle, classes.videoFile].join(" ")}>
            VIDEO FILE:
          </div>
          <div className={classes.videoLink}>{recipe.videoName}</div>
          <div className={classes.subtitle}>Aspect Ratios Detected:</div>
          <div className={classes.ratings}>
            <div className={aspectRatioClassName("4:3")}>4:3</div>
            <div className={aspectRatioClassName("16:9")}>16:9</div>
            <div className={aspectRatioClassName("9:16")}>9:16</div>
            <div className={aspectRatioClassName("N/A")}>N/A</div>
          </div>
        </div>
        <div className={classes.vSeperateBar}></div>
        <div className={classes.campaignWrapper}>
          <div className={classes.subtitle}>SELECT CAMPAIGN:</div>
          <div className={classes.compaign}>
            <div>
              <select
                className={classes.selectCampaign}
                value={selectedCampaign.id}
                onChange={handleSelectCampaign}
                placeholder="Select Campaign"
              >
                <option>Select Campaign</option>
                {campaignList.map(campaign => (
                  <option key={campaign.id} value={campaign.id}>
                    {campaign.name}
                  </option>
                ))}
              </select>
              <div
                className={classes.compaignLogo}
                onClick={handleCampaignLogoChange}
              >
                {!selectedCampaignLogo && (
                  <div className={classes.logoTitle}>Campaign Logo</div>
                )}
                <img
                  src={selectedCampaignLogo || campaignLogo}
                  alt=""
                  className={classes.logoImg}
                  style={
                    selectedCampaignLogo
                      ? { marginTop: "0px" }
                      : { opacity: 0.2 }
                  }
                />
              </div>
              <div className={classes.themeStyle}>
                <SwitchButton
                  checked={selectedCampaign.selectedType === "dark"}
                  onChange={e => {
                    setSelectedCampaign({
                      ...selectedCampaign,
                      selectedType: e.target.checked ? "dark" : "light"
                    });
                  }}
                ></SwitchButton>
              </div>
            </div>
            <div>
              {!state.addingCampaign ? (
                <Fab
                  size="small"
                  color="primary"
                  aria-label="add"
                  className={classes.iconBtn}
                  onClick={() => setCampaignDialogOpen(true)}
                >
                  <AddIcon fontSize="inherit" />
                </Fab>
              ) : (
                <CircularProgress
                  size={28}
                  color="primary"
                  className={classes.addingCampaign}
                />
              )}
            </div>
          </div>
          <select
            className={classes.by}
            value={by}
            onChange={e => setBy(e.target.value)}
            placeholder=""
          >
            <option></option>
            <option value="Sponsored by">Sponsored by</option>
            <option value="Brought to you by">Brought to you by</option>
            <option value="Powered by">Powered by</option>
            <option value="Presented by">Presented by</option>
          </select>
        </div>
        <div>
          <div className={classes.subtitle}>LOGO POSITION:</div>
          <RadioGroup
            aria-label="pos"
            name="pos"
            value={pos}
            onChange={e => setPos(e.target.value)}
          >
            {logoCorners.map((item, index) => (
              <div key={index}>
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value={item.value}
                  label={
                    <span className={classes.checkBoxLabel}>{item.label}</span>
                  }
                  className={classes.checkBox}
                />
              </div>
            ))}
          </RadioGroup>
        </div>
        <div>
          <div className={classes.subtitle} style={{ marginLeft: "52px" }}>
            SELECT LIVEREAD:
          </div>
          <RadioGroup
            aria-label="live"
            name="live"
            value={live}
            onChange={e => setLive(e.target.value)}
          >
            {enhancedLivereads.map((item, index) => (
              <div key={index}>
                {item.id === "campaign-specific" && (
                  <Fab
                    size="small"
                    color="primary"
                    aria-label="add"
                    className={classes.iconBtn}
                    disabled={
                      !selectedCampaign.id || !selectedCampaign.live_read_url
                    }
                    onClick={playLiveread(selectedCampaign.live_read_url)}
                  >
                    <PlayArrow fontSize="inherit" />
                  </Fab>
                )}
                {item.url && (
                  <Fab
                    size="small"
                    color="primary"
                    aria-label="add"
                    className={classes.iconBtn}
                    onClick={playLiveread(item.url)}
                  >
                    <PlayArrow fontSize="inherit" />
                  </Fab>
                )}
                <FormControlLabel
                  control={<Radio value={`${item.id}`} color="primary" />}
                  label={
                    <span className={classes.checkBoxLabel}>{item.title}</span>
                  }
                  className={classes.checkBox}
                  disabled={
                    item.id === "campaign-specific" && !selectedCampaign.id
                  }
                  style={!item.id ? { marginLeft: "42px" } : {}}
                />
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
      <div className={classes.secondSection}>
        <div></div>
        {/* <div style={{ filter: 'blur(3px)' }}>
          <div className={classes.title}>Place Timestamp:</div>
          <img src={timestampImg} alt=""></img>
        </div> */}
        {/* <div>
          <div className={classes.title}>Live Videos:</div>
          <Table className={classes.table}>
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell align="left" className={classes.tableHeader}>
                  Video Name
                </TableCell>
                <TableCell align="center" className={classes.tableHeader}>
                  Video Views Delivered
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {videos.length === 0 && (
                <TableRow style={{ background: '#ebebeb' }}>
                  <TableCell colSpan={2} style={{ textAlign: 'center' }}>
                    No Live videos
                  </TableCell>
                </TableRow>
              )}
              {videos.map((row, index) => (
                <TableRow
                  key={index}
                  style={
                    index % 2
                      ? { background: '#ebebeb' }
                      : { background: '#f5f5f5' }
                  }
                >
                  <TableCell
                    scope="row"
                    align="left"
                    style={{ color: '#385898' }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="center" style={{ color: 'black' }}>
                    {row.views}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell style={{ borderBottom: 'none', color: 'black' }}>
                  Impressions Remaining
                </TableCell>
                <TableCell
                  align="center"
                  style={{ borderBottom: 'none', color: 'black' }}
                >
                  0/0
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div> */}
      </div>

      <input
        ref={x => (uploadRef = x)}
        accept="image/*"
        style={{ display: "none" }}
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
                  defaultValue=""
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={newCampaign.name}
                  onChange={handleNewCampaignChange}
                  helperText={newCampaign.errors.name ? "Name is required" : ""}
                  error={newCampaign.errors.name}
                />
                <TextField
                  id="outlined-uncontrolled"
                  name="url"
                  label="CAMPAIGN LINK"
                  defaultValue=""
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={newCampaign.url}
                  onChange={handleNewCampaignChange}
                />
                <div className={classes.flexCenter}>
                  <div
                    className={classes.compaignLogo}
                    onClick={handleNewCampaignLogoChange("lightLogo")}
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
                          ? { marginTop: "0px" }
                          : { opacity: 0.2 }
                      }
                    />
                  </div>
                  <div
                    className={classes.compaignLogo}
                    onClick={handleNewCampaignLogoChange("darkLogo")}
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
                          ? { marginTop: "0px" }
                          : { opacity: 0.2 }
                      }
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="onScreenOffer"
                  name="onScreenOffer"
                  label="ON-SCREEN OFFER"
                  defaultValue=""
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
                  defaultValue=""
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
      <StatusBar step={2} nextButton={true} onNext={handleSubmit}></StatusBar>
    </div>
  );
};

const mapState = state => ({
  recipe: videoSelector(state),
  campaignList: campaignListSelector(state),
  livereadList: livereadListSelector(state)
});
const mapProps = {
  getCampaigns,
  getLivereads,
  createCampaign,
  updateCampaignLogo,
  setBrand
};

const enhance = compose(connect(mapState, mapProps), withRouter);
export default enhance(PublisherBrand);
