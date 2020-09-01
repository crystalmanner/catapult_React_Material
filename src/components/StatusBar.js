import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import './StatusBar.scss';

const useStyles = makeStyles(theme => ({
  statusBar: {
    position: 'absolute',
    width: '100%',
    height: '80px',
    bottom: 1,
    left: 0,
    backgroundColor: '#f7f6f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '30px 48px',
    borderTop: 'solid 1px #dedede'
  },
  bar: {
    flexGrow: '1',
    height: '2px',
    backgroundColor: '#673ab7',
    margin: '0 5px'
  },
  nextBtn: {
    marginLeft: '60px',
    boxShadow: '0 0px 0px 0px !important'

  }
}));

const StatusBar = ({ step, nextButton, history, onNext }) => {
  const classes = useStyles();

  const handleClickNext = no => {
    if (step === no + 1) return;
    if (no === 0) {
      history.push('/');
    }
    if (no === 1) {
      history.push('/publisher/brand');
    }
    if (no === 2) {
      history.push('/publisher/template');
    }
    if (no === 3) {
      history.push('/publisher/review');
    }
  };

  function handleFinish() {
    onNext();
    handleClickNext(step);
  }

  return (
    <div className={classes.statusBar}>
      <div className="stepNo">
        01
        {step === 1 && <div className="curPage">UPLOAD</div>}
        {step > 1 && (
          <Button
            variant="contained"
            color="primary"
            className={['selectBtn', step === 1 ? 'show' : ''].join(' ')}
            onClick={() => handleClickNext(0)}
          >
            UPLOAD
          </Button>
        )}
      </div>
      <div className={classes.bar}></div>
      <div className="stepNo">
        02
        {step === 2 && <div className="curPage">BRAND</div>}
        {step > 2 && (
          <Button
            variant="contained"
            color="primary"
            className={['selectBtn', step === 2 ? 'show' : ''].join(' ')}
            onClick={() => handleClickNext(1)}
          >
            BRAND
          </Button>
        )}
      </div>
      <div className={classes.bar}></div>
      <div className="stepNo">
        03
        {step === 3 && <div className="curPage">INSERT</div>}
        {step > 3 && (
          <Button
            variant="contained"
            color="primary"
            className={['selectBtn', step === 3 ? 'show' : ''].join(' ')}
            onClick={() => handleClickNext(2)}
          >
            INSERT
          </Button>
        )}
      </div>
      <div className={classes.bar}></div>
      <div className="stepNo">
        04
        {step === 4 && <div className="curPage">REVIEW</div>}
        {step > 4 && (
          <Button
            variant="contained"
            color="primary"
            className={['selectBtn', step === 4 ? 'show' : ''].join(' ')}
            onClick={() => handleClickNext(3)}
          >
            REVIEW
          </Button>
        )}
      </div>
      {nextButton && (
        <Button
          variant="contained"
          color="primary"
          className={classes.nextBtn}
          onClick={() => handleFinish()}
        >
          {step === 4 ? 'FINISH' : 'NEXT'}
        </Button>
      )}
    </div>
  );
};

export default withRouter(StatusBar);
