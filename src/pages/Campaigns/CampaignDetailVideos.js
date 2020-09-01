import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as SampleData from "./sampleData";
import {
  videoListSelector,
  getVideosByCampaignId
} from "../../modules/pubVideos";
import { Player } from 'video-react';

import { FilterListOutlined } from "@material-ui/icons";
import playButton from "../../assets/icons/play-button.svg";
import pathIcon from "../../assets/icons/path.svg";
import fbActiveIcon from "../../assets/icons/fb-active.svg";
import fbIcon from "../../assets/icons/fb.svg";
import instagramIcon from "../../assets/icons/instagram.svg";
import instagramActiveIcon from "../../assets/icons/instagram_active.svg";
import ringIcon from "../../assets/icons/snapchat.png";
import ringActiveIcon from "../../assets/icons/snapchat_active.png";
import twitterIcon from "../../assets/icons/twitter.svg";
import twitterActiveIcon from "../../assets/icons/twitter_active.svg";
import youtubeIcon from "../../assets/icons/youtube.svg";
import youtubeActiveIcon from "../../assets/icons/youtube_active.svg";
import "./CampaignDetailVideos.scss";
import { Button } from "@material-ui/core";

const CampaignDetailVideos = ({
  campaignId,
  videoList,
  getVideosByCampaignId
}) => {
  var FB = null;

  useEffect(() => {
    getVideosByCampaignId(campaignId);
  }, [getVideosByCampaignId, campaignId]);

  useEffect(()=>{
    document.addEventListener('FBObjectReady', initialFacebookLogin);
    return () => {
      document.removeEventListener('FBObjectReady', initialFacebookLogin);
    }
  })

  const initialFacebookLogin = () => {
    FB = window.FB;
    console.log('loading library', FB);
    checkLoginStatus();
  }

  const downloadVideo = (url) => {
		fetch(url)
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = 'video';
          a.click();
          a.remove();
				});
		});
  }
  const checkLoginStatus = () => {
    // FB.getLoginStatus(facebookLoginHandler);
  }

  const facebookLogin = () => {
    // console.log('clicked');
    // if (!FB) return;
    // console.log('getlogin status');
    // FB.getLoginStatus(response => {
    //   if (response.status === 'connected') {
    //     facebookLoginHandler(response);
    //   } else {
    //     FB.login(facebookLoginHandler, {scope: 'user_posts,user_videos,publish_pages'});
    //   }
    // });
  }

  const facebookLoginHandler = response => {
    if (response.status === 'connected') {
        console.log(response);
        // FB.api(
        //   `/me/photos`,
        //   "POST",
        //   {
        //     "url": "https://material.io/resources/icons/static/ic_icons_192px_light.svg",
        //     "caption": "test photo upload",
        //   },
        //   function(res) {
        //     console.log(res);
        //   }
        // )
        // FB.ui({
        //   method: 'feed',
        //   name: 'Facebook Dialogs',
        //   link: 'http://192.168.209.131:8000/media/livereads/user_30/0.mp4',
        //   picture: 'http://fbrell.com/f8.jpg',
        //   caption: 'Reference Documentation',
        //   description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
      
        // }, function(response){
        //   // Debug response (optional)
        //   console.log(response);
        // });

    } else {
      console.log('login failed');
    }
  }



  return (
    <div className="row m-0 campaignVideos">
      <div className="col p-0">
        <div className="row mx-2 pt-3">
          <div className="col-2" />
          <div className="col-8 campaignVideosGuideText text-center align-content-center">
            Scroll to find videos that were previously meshed
          </div>
          <div className="col-2 filter text-right d-flex">
            {/* <FilterListOutlined className="pr-1 align-self-center m-auto" />
            <div className="align-self-center m-auto">Filter</div> */}
          </div>
        </div>
        <div className="col-12 videoContent">
          {videoList.map((video, k) => {
            return (
              <div className="px-4 pt-3 mb-2" key={k}>
                {(video.isNew || k === 0) && (
                  <div className="videoBitStyle">
                    <div className="videoAddedIconWrapper">
                      <div className="videoAddedIcon">JUST ADDED!</div>
                    </div>
                    <div className="row campaignNewAssetIconWrapper2">
                      <div className="videoAddedIcon2" />
                    </div>
                    <div className="row campaignVideoContent">
                      <div
                        className="col-6 d-flex aligh-items-center videoThumbnail"
                        style={{ backgroundImage: `url(${video.thumbnail})` }}
                      >
                        <Player
                          src={video.draft_video.video}
                          className="video-iframe"
                        />
                      </div>
                      <div className="col-6 videoDescription">
                        <div className="row">
                          <div className="col-12 align-self-center py-4 pl-4 pr-2">
                            <div>{video.title}</div>
                            <div className="videoDate">
                              {new Date(video.date_created).toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="row btnGroup mb-3">
                          <div className="col-6">
                            <Button fullWidth className="text-capitalize" onClick={facebookLogin}
                              color="secondary" variant="contained">
                              <img className="mr-1" alt="" src={pathIcon} width="12" height="12"/>
                              Distribute
                            </Button>            
                          </div>
                          <div className="col-6">          
                            <Button fullWidth className="text-capitalize"
                              color="primary" variant="contained" onClick={()=>downloadVideo(video.draft_video.video)}>
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {!(video.isNew || k === 0)  && (
                  <div className="row campaignVideoContent mb-4">
                    <div
                      className="col-4 pr-0 d-flex align-items-center videoThumbnail"
                      style={{ backgroundImage: `url(${video.thumbnail})` }}
                    >
                      <Player
                        src={video.draft_video.video}
                        className="video-iframe"
                      />
                    </div>
                    <div className="col-5 pl-lg-4 pr-lg-3 d-flex align-self-center">
                      <div className="align-self-center">
                        <div>{video.title}</div>
                        <div className="videoDate">
                          {new Date(video.date_created).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="col-3 btnGroup-Row">
                      <Button fullWidth className="mt-3 text-capitalize"
                        color="secondary" variant="contained">
                        <img alt="" className="mr-1" src={pathIcon} width="12" height="12"/>
                        Distribute
                      </Button>
                      <Button fullWidth className="my-3 text-capitalize"
                        color="primary" variant="contained" onClick={()=>downloadVideo(video.draft_video.video)}>
                        Download
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <table className="videoTables table table-striped m-0">
          <thead>
            <tr>
              <th scope="col">LIVE VIDEOS</th>
              <th scope="col" className="text-center">
                CHANNEL
              </th>
              <th scope="col" className="text-right">
                VIDEO VIEWS
              </th>
            </tr>
          </thead>
          <div class="text-center">Nothing Live Yet</div>
          {/* <tbody>
            {SampleData.videoList.map((video, k) => {
              return (
                <tr key={k}>
                  <td className="videoTitle">{video.name}</td>
                  <td className="text-center socialIcons">
                    {video.channel.includes(1) && <img src={fbActiveIcon} alt=""/>}
                    {!video.channel.includes(1) && <img src={fbIcon} alt=""/>}

                    {video.channel.includes(2) && (
                      <img src={instagramActiveIcon} alt=""/>
                    )}
                    {!video.channel.includes(2) && <img src={instagramIcon} alt=""/>}

                    {video.channel.includes(3) && <img src={ringActiveIcon} alt=""/>}
                    {!video.channel.includes(3) && <img src={ringIcon} alt=""/>}

                    {video.channel.includes(4) && (
                      <img src={twitterActiveIcon} alt=""/>
                    )}
                    {!video.channel.includes(4) && <img src={twitterIcon} alt=""/>}

                    {video.channel.includes(5) && (
                      <img src={youtubeActiveIcon} alt=""/>
                    )}
                    {!video.channel.includes(5) && <img src={youtubeIcon} alt=""/>}
                  </td>
                  <td className="text-right videoViews">{video.views}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td className="text-uppercase videoTitle">
                Impressions Remaining
              </td>
              <td />
              <td className="text-right">
                835,000/<strong>1,000,000</strong>
              </td>
            </tr>
          </tfoot> */}
        </table>
      </div>
    </div>
  );
};

const mapState = state => ({
  placeholder: "placeholder",
  videoList: videoListSelector(state)
});
const mapProps = {
  getVideosByCampaignId
};
const enhance = compose(connect(mapState, mapProps), withRouter);

export default enhance(CampaignDetailVideos);
