import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  compaignLogo: {
    height: '117px',
    borderRadius: '5px',
    // minWidth: '150px',
    border: 'dashed 2px #e3e3e3',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '45px'
  },
  logoTitle: {
    color: '#e3e3e3'
  },
  logoImg: {
    maxWidth: '146px',
    maxHeight: '113px',
    marginTop: '15px'
  },

  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    width: '725px',
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
}));

export { useStyles };
