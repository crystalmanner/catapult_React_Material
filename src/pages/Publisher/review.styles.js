import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  body: {
    minHeight: '100%',
    width: '100%',
    background: 'white',
    position: 'relative'
  },
  bodyContainer: {
    width: '100%',
    // maxWidth: "1100px",
    padding: '30px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: '50px'
  },
  LeftDiv: {
    minHeight: '100%',
    background: 'white',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingRight: '50px'
  },
  rightDiv: {
    width: '300px',
    position: 'relative'
  },
  title: {
    fontSize: '20px',
    color: '#181e22',
    marginBottom: '16px'
  },
  bg1: {
    backgroundColor: '#d8d8d8'
  },
  bg2: {
    backgroundColor: '#ebebeb'
  },
  bg3: {
    backgroundColor: '#f5f5f5'
  },
  headerDiv: {
    height: '35px',
    padding: '0 20px',
    backgroundColor: '#d8d8d8',
    color: 'black',
    fontSize: '12px',
    alignItems: 'center',
    fontWeight: '500'
  },
  commonDiv: {
    padding: '20px'
  },
  flexDiv: {
    color: 'black',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  posContainer: {
    position: 'relative'
  },
  posText: {
    position: 'absolute',
    top: '10px',
    left: '15px',
    fontSize: '12px'
  },
  items: {
    width: 'calc(100% + 10px)',
    borderLeft: 'solid 10px #673ab7',
    marginLeft: '-10px',
    position: 'relative',
    maxHeight: '640px',
    overflowY: 'auto'
  },
  itemTitle: {
    color: '#385898',
    marginBottom: '12px'
  },
  ratio: {
    minWidth: '70px',
    display: 'flex',
    justifyContent: 'center'
  },
  flexTop: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  rating: {
    height: '27px',
    width: '35px',
    borderRadius: '5px',
    color: 'white',
    fontSize: '12px',
    backgroundColor: '#673ab7',
    textAlign: 'center',
    padding: '6px 0'
  },
  w50: {
    width: '50%'
  },
  logoDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  deleteBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.71)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirmBtn: {
    margin: '0 20px'
  }
}));

export { useStyles };
