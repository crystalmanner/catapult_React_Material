import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  body: {
    minHeight: '100%',
    width: '100%',
    paddingBottom: '90px',
    background: 'white',
    position: 'relative'
  },
  firstSection: {
    width: '100%',
    maxWidth: '1300px',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '30px',
    paddingTop: '30px'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    width: '375px',
    // height: "404px",
    borderRadius: '10px',
    boxShadow: '0 2px 3px 0 rgba(0, 0, 0, 0.5)',
    backgroundColor: '#ffffff',
    padding: '25px',
    '&:focus': {
      outline: 'none'
    }
  },
  modalHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px'
  },
  modalTitle: {
    fontSize: '20px',
    color: '#181e22'
  },
  textField: {
    width: '100%'
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
    marginTop: '10px'
  },
  modalBtn: {
    width: '100%',
    height: '40px'
  },
  imgDiv: {
    width: '364px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'black',
    marginBottom: '90px'
  },
  platformSelect: {
    position: 'absolute',
    left: '0px',
    bottom: '-40px'
  },
  platformSelectButton: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: '#512da8'
    }
  },
  platformSelectTitle: {
    marginTop: '2px',
    marginLeft: '4px'
  },
  platformSelectCheckbox: {
    padding: '0px'
  },
  platformSelectCheckboxRoot: {
    color: 'white'
  },
  platforms: {
    position: 'absolute',
    right: '0px',
    bottom: '-40px'
  },
  platform: {
    height: '40px',
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#139a40'
    }
  },
  platformIcon: {
    color: 'white',
    fontSize: '25px'
  },
  platformActive: {
    backgroundColor: '#48d678'
  },
  mlAuto: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  headerSection: {
    boxShadow: '0 2px 3px 0 rgba(0, 0, 0, 0.2)',
    backgroundColor: '#f7f6f9',
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 10
  },
  headerBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 9
  },
  headerContent: {
    width: '100%',
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '30px',
    paddingTop: '0px'
  },
  headerContainer: {
    // height: "52px",
    width: '100%',
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '0px 30px'
  },
  basicBtn: {
    backgroundColor: '#6dd28f',
    color: 'white',
    padding: '9px',
    borderRadius: '5px',
    '&.active': {
      backgroundColor: '#48d678'
    }
  },
  headerImg: {
    display: 'inline-flex',
    marginLeft: '8px',
    height: '27px',
    width: '27px',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '50%'
  },
  showBtn: {
    position: 'absolute',
    bottom: '-25px',
    left: 'calc(50% - 12.5px)',
    backgroundColor: '#ffcb37',
    width: '25px',
    height: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: '3px',
    borderBottomRightRadius: '3px',
    cursor: 'pointer',
    opacity: 0.7,
    '&:hover': {
      opacity: 1
    }
  },
  flexColumnCenter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tmpImg: {
    position: 'relative',
    marginBottom: '20px',
    height: '150px',
    width: '270px'
  },
  img: {
    position: 'absolute'
  },
  toggleButtonSelected: {
    backgroundColor: `${theme.palette.primary.dark} !important`
  }
}));

export { useStyles };
