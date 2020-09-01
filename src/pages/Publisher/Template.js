import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import FsLightbox from 'fslightbox-react';
import { withRouter } from 'react-router-dom';

import {
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import {
  DesktopMac,
  CropSquare,
  CropPortrait,
  AccessTime,
  CheckBoxOutlineBlank,
  CheckBoxOutlined
} from '@material-ui/icons';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import StatusBar from '../../components/StatusBar';
import { useStyles } from './template.styles';

import { setTemplate, videoSelector } from '../../modules/recipe';
import { getTemplates, templateListSelector } from '../../modules/template';
import {
  TEMPLATE_INSTAGRAM,
  TEMPLATE_SNAPCHAT,
  TEMPLATE_DESKTOP
} from '../../constants/templates';

import downIcon from '../../assets/icons/down.png';
import upIcon from '../../assets/icons/up.png';
import imgH1 from '../../assets/imgs/3-1.png';
import imgH2 from '../../assets/imgs/3-2.png';
import imgH3 from '../../assets/imgs/3-3.png';
import CrownImg from './assets/crown.svg';
import './Template.scss';

const PublisherTemplate = ({
  recipe,
  setTemplate,
  getTemplates,
  templateList = []
}) => {
  const classes = useStyles();

  React.useEffect(() => {
    getTemplates();
  }, [getTemplates]);

  const enhancedTemplates = React.useMemo(() => {
    return templateList.map(template => {
      return {
        id: template.id,
        title: template.title,
        videos: {
          [TEMPLATE_DESKTOP]: {
            thumbnail: template.desktop_video_thumbnail,
            video: template.desktop_video_url
          },
          [TEMPLATE_INSTAGRAM]: {
            thumbnail: template.tablet_video_thumbnail,
            video: template.tablet_video_url
          },
          [TEMPLATE_SNAPCHAT]: {
            thumbnail: template.phone_video_thumbnail,
            video: template.phone_video_url
          }
        }
      };
    });
  }, [templateList]);

  const [open, setOpen] = React.useState(true);
  const [selectedTemplatePlan, setSelectedTemplatePlan] = React.useState(
    'basic'
  );
  const [selectedTemplates, setSelectedTemplates] = React.useState(
    enhancedTemplates.reduce((memo, template) => {
      const selected = recipe.templates || [];
      memo[template.id] = Boolean(selected.find(s => s.id === template.id));
      return memo;
    }, {})
  );
  const [selectedTemplateSizes, setselectedTemplateSizes] = React.useState(
    enhancedTemplates.map(template => {
      const selected = (recipe.templates || []).find(s => s.id === template.id);
      return selected ? selected.resolution : Object.keys(template.videos)[0];
    })
  );

  React.useEffect(() => {
    setSelectedTemplates(
      enhancedTemplates.reduce((memo, template) => {
        const selected = recipe.templates || [];
        memo[template.id] = Boolean(selected.find(s => s.id === template.id));
        return memo;
      }, {})
    );
    setselectedTemplateSizes(
      enhancedTemplates.map(template => {
        const selected = (recipe.templates || []).find(
          s => s.id === template.id
        );
        return selected ? selected.resolution : Object.keys(template.videos)[0];
      })
    );
  }, [enhancedTemplates, recipe.templates, templateList]);

  const [videoToPreview, setVideoToPreview] = React.useState(null);
  const [mountLightbox, setMountLightbox] = React.useState(false);

  const toggleHeader = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const selectTemplatePlan = level => {
    setOpen(false);
    setSelectedTemplatePlan(level);
  };

  const selectTemplateSize = targetIndex => (e, selectedSize) => {
    setselectedTemplateSizes(
      selectedTemplateSizes.map((size, index) =>
        index === targetIndex ? selectedSize : size
      )
    );
  };

  const previewTemplate = (template, size) => () => {
    setMountLightbox(true);
    setTimeout(() => {
      setVideoToPreview(template.videos[size].video);
    }, 100);
  };

  const handleSelectAll = e => {
    setSelectedTemplates(
      enhancedTemplates.reduce((memo, template) => {
        memo[template.id] = e.target.checked;
        return memo;
      }, {})
    );
  };

  const isSelectedAll = () => {
    return !enhancedTemplates.some(template => !selectedTemplates[template.id]);
  };

  const handleNext = () => {
    setTemplate({
      templatePlan: selectedTemplatePlan,
      templates: Object.keys(selectedTemplates)
        .filter(templateId => selectedTemplates[templateId])
        .map(templateId => {
          const id = parseInt(templateId);
          const index = enhancedTemplates.findIndex(
            template => template.id === id
          );

          return {
            id,
            resolution: selectedTemplateSizes[index]
          };
        })
    });
  };

  return (
    <>
      <div className={classes.body}>
        {/* <div className={classes.headerSection}>
          <ExpansionPanel expanded={open}>
            <ExpansionPanelSummary className={classes.headerContainer}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  className={classes.flexColumnCenter}
                >
                  <div
                    className={
                      selectedTemplatePlan === 'basic' && classes.basicBtn
                    }
                  >
                    BASIC TEMPLATE
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  className={classes.flexColumnCenter}
                >
                  <div>
                    <Button
                      variant={
                        selectedTemplatePlan === 'advanced'
                          ? 'contained'
                          : 'text'
                      }
                      onClick={() => selectTemplatePlan('advanced')}
                      className={
                        selectedTemplatePlan === 'advanced'
                          ? classes.basicBtn
                          : null
                      }
                      disabled={true}
                    >
                      ADVANCED TEMPLATE
                      <div className={classes.headerImg}>
                        <img src={CrownImg} alt="" />
                      </div>
                    </Button>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  className={classes.flexColumnCenter}
                >
                  <div>
                    <Button
                      variant={
                        selectedTemplatePlan === 'custom' ? 'contained' : 'text'
                      }
                      onClick={() => selectTemplatePlan('custom')}
                      className={
                        selectedTemplatePlan === 'custom'
                          ? classes.basicBtn
                          : null
                      }
                      disabled={true}
                    >
                      CUSTOM
                      <div className={classes.headerImg}>
                        <img src={CrownImg} alt="" />
                      </div>
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.headerContent}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  className={classes.flexColumnCenter}
                >
                  <div className={[classes.tmpImg, 'over-par'].join(' ')}>
                    <div className="over-par__content">
                      <img src={imgH1} alt="" className={classes.img} />
                      <div className="img-text">PLUG AND PLAY</div>
                      <div className="badge bottom-right">Instant</div>
                      <div className="over-child">
                        <div className="clickable-item">PREVIEW</div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => selectTemplatePlan('basic')}
                  >
                    Choose
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  className={classes.flexColumnCenter}
                >
                  <div className={[classes.tmpImg, 'over-par'].join(' ')}>
                    <div className="over-par__content">
                      <img src={imgH2} alt="" />
                      <div className="img-text">DELAYED DELIVERY</div>
                      <div className="badge bottom-right">
                        <AccessTime className="icon" /> 2 - 5 DAYS
                      </div>
                      <div className="over-child">
                        <div className="clickable-item">PREVIEW</div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => selectTemplatePlan('advanced')}
                    disabled={true}
                  >
                    Choose
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  className={classes.flexColumnCenter}
                >
                  <div
                    className={[classes.tmpImg, 'over-par'].join(' ')}
                    disabled={true}
                  >
                    <div className="over-par__content">
                      <img src={imgH3} alt="" className={classes.img} />
                      <div className="img-text">LET'S CHAT</div>
                      <div className="badge bottom-right">
                        <AccessTime className="icon" /> 2 - 5 DAYS
                      </div>
                      <div className="over-child">
                        <div className="clickable-item">PREVIEW</div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={true}
                    onClick={() => selectTemplatePlan('custom')}
                  >
                    Choose
                  </Button>
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <div className={classes.showBtn} onClick={toggleHeader}>
            <img src={open ? upIcon : downIcon} alt="" />
          </div>
        </div>
        {open && (
          <div className={classes.headerBackdrop} onClick={toggleHeader}></div>
        )} */}
        <div className={classes.firstSection}>
          <div className={classes.mlAuto}>
            <FormControlLabel
              control={<Checkbox value="checkedC" checked={isSelectedAll()} />}
              label="Select all"
              onChange={e => handleSelectAll(e)}
            />
          </div>
          <Grid container>
            {enhancedTemplates.map((template, index) => {
              const templateSize =
                selectedTemplateSizes[index] || TEMPLATE_DESKTOP;
              return (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <div className={[classes.imgDiv, 'over-par'].join(' ')}>
                    <div className="over-par__content">
                      <div className="thumb-div">
                        <span />
                        <img
                          className="template-thumb"
                          src={template.videos[templateSize].thumbnail}
                          alt=""
                        />
                        <span />
                      </div>
                      <div className="img-text">{template.title}</div>
                      <div
                        className={[
                          'over-child',
                          templateSize === TEMPLATE_DESKTOP
                            ? 'dir-row'
                            : 'dir-col'
                        ].join(' ')}
                      >
                        <div
                          className="clickable-item"
                          onClick={previewTemplate(template, templateSize)}
                        >
                          PREVIEW
                        </div>
                        {/* <div
                          className="clickable-item"
                          onClick={() =>
                            setSelectedTemplates({
                              ...selectedTemplates,
                              [template.id]: !selectedTemplates[template.id]
                            })
                          }
                        >
                          {!selectedTemplates[template.id]
                            ? 'SELECT'
                            : 'DESELECT'}
                        </div> */}
                      </div>
                    </div>
                    <ToggleButtonGroup
                      className={classes.platformSelect}
                      size="small"
                      exclusive
                      onChange={() => {
                        setSelectedTemplates({
                          ...selectedTemplates,
                          [template.id]: !selectedTemplates[template.id]
                        });
                      }}
                    >
                      <ToggleButton
                        value=""
                        className={classes.platformSelectButton}
                      >
                        {selectedTemplates[template.id] ? (
                          <CheckBoxOutlined />
                        ) : (
                          <CheckBoxOutlineBlank />
                        )}
                        <span className={classes.platformSelectTitle}>
                          Select
                        </span>
                      </ToggleButton>
                    </ToggleButtonGroup>
                    <ToggleButtonGroup
                      className={classes.platforms}
                      size="small"
                      value={templateSize}
                      exclusive
                      onChange={selectTemplateSize(index)}
                    >
                      <ToggleButton
                        key={TEMPLATE_DESKTOP}
                        value={TEMPLATE_DESKTOP}
                        className={classes.platform}
                        classes={{
                          selected: classes.toggleButtonSelected
                        }}
                      >
                        <DesktopMac
                          className={classes.platformIcon}
                        ></DesktopMac>
                      </ToggleButton>
                      <ToggleButton
                        key={TEMPLATE_SNAPCHAT}
                        value={TEMPLATE_SNAPCHAT}
                        className={classes.platform}
                        classes={{
                          selected: classes.toggleButtonSelected
                        }}
                      >
                        <CropPortrait
                          className={classes.platformIcon}
                        ></CropPortrait>
                      </ToggleButton>
                      <ToggleButton
                        key={TEMPLATE_INSTAGRAM}
                        value={TEMPLATE_INSTAGRAM}
                        className={classes.platform}
                        classes={{
                          selected: classes.toggleButtonSelected
                        }}
                      >
                        <CropSquare
                          className={classes.platformIcon}
                        ></CropSquare>
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </div>
        <StatusBar step={3} nextButton={true} onNext={handleNext}></StatusBar>
      </div>
      {mountLightbox && (
        <FsLightbox
          toggler={Boolean(videoToPreview)}
          type="video"
          sources={[videoToPreview]}
          onClose={() => {
            setMountLightbox(false);
            setVideoToPreview(null);
          }}
        />
      )}
    </>
  );
};

const mapState = state => ({
  templateList: templateListSelector(state),
  recipe: videoSelector(state)
});
const mapProps = {
  setTemplate,
  getTemplates
};

const enhance = compose(
  connect(
    mapState,
    mapProps
  ),
  withRouter
);

export default enhance(PublisherTemplate);
