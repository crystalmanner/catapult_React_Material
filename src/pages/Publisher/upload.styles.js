import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  body: {
    minHeight: '100%',
    width: '100%'
  },
  uploadDiv: {
    minHeight: '100%',
    background: 'white',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  feedDiv: {
    width: '460px',
    background: '#f9f9f9',
    borderLeft: 'solid 1px #dedede',
    position: 'relative'
  },
  statusBar: {
    position: 'absolute',
    zIndex: 10
  },
  uploadImg: {
    width: '136px',
    marginBottom: '30px'
  },
  noFeedText: {
    width: '300px'
  },
  uploadText: {
    color: '#181e22',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    marginBottom: '15px'
  },
  errorIcon: {
    marginLeft: '10px'
  },
  uploadBtn: {
    backgroundColor: '#673ab7',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.31)',
    color: 'white',
    height: '40px',
    width: '160px',
    '&.active, &:hover': {
      backgroundColor: '#ffca37'
    }
  },
  feedHeader: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12.5px 25px',
    backgroundColor: 'white'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  feedTitle: {
    fontSize: '20px',
    letterSpacing: '0.2px',
    color: '#181e22',
    fontWeight: '400',
    textTransform: 'uppercase'
  },
  feedUpdated: {
    color: '#777777',
    marginRight: '10px',
    fontWeight: '100'
  },
  feedUpdatedTime: {
    color: '#45d369',
    fontWeight: '100'
  },
  feeds: {
    padding: '25px',
    position: 'absolute',
    bottom: '0',
    width: '100%',
    top: props => `${props.feedHeaderHeight}px`,
    overflowY: 'auto'
  },
  feedItem: {
    marginBottom: '25px',
    position: 'relative'
  },
  feedItemTitle: {
    color: '#181e22',
    fontSize: '16px'
  },
  feedItemPublished: {
    color: '#777777',
    fontSize: '16px;'
  },
  selectBtn: {
    color: 'white',
    fontSize: '12px',
    height: '30px',
    width: '110px'
    // position: "absolute",
    // right: 0,
    // bottom: "5px",
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  flexBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  screenIndicator: {
    fontSize: '22px',
    textAlign: 'center',
    color: '#dcdcdc',
    position: 'absolute',
    width: '100%',
    bottom: '25px'
  },
  input: {
    display: 'none'
  },
  spinner: {
    width: '115px !important',
    height: '115px !important'
  },
  progressBar: {
    width: '115px'
  },
  processText: {
    marginTop: '30px'
  },
  feedImg: {
    width: '100%'
  },
  selectBrand: {
    height: '40px',
    width: '120px',
    borderRadius: '5px',
    color: '#673ab7',
    paddingLeft: '15px',
    border: 'solid 1px #673ab7',
    outline: 'none',
    fontSize: '14px'
    // font-weight: 600;
  }
}));

export { useStyles };
