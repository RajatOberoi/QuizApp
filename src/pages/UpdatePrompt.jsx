import React, { useState, useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const PWA_CHECK_INTERVAL = 3000;

function UpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      r &&
        setInterval(async () => {
          if (r.installing || !navigator) return;

          if ('connection' in navigator && !navigator.onLine) return;

          const resp = await fetch(swUrl, {
            cache: 'no-store',
            headers: {
              cache: 'no-store',
              'cache-control': 'no-cache',
            },
          });

          if (resp?.status === 200) await r.update();
        }, PWA_CHECK_INTERVAL);
    },
    onRegisterError(error) {
      console.log(error, 'error during registration');
    },
    onNeedRefresh() {
      setNeedRefresh(true);
    },
  });

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (needRefresh) {
      const isUpdateSkipped =
        sessionStorage.getItem('updateSkipped') === 'true';
      if (!isUpdateSkipped) {
        setShow(true);
      }
    }
  }, [needRefresh]);

  const handleReload = async () => {
    try {
      // navigator.serviceWorker.addEventListener('controllerchange', () => {
      //   window.location.reload();
      // });
      // console.log('I am in handle reload');
      // updateServiceWoker();
      window.location.reload()
    } catch (error) {
      console.error('Error updating service worker:', error);
    }
  };

  const handleSkip = () => {
    sessionStorage.setItem('updateSkipped', 'true');
    setShow(false);
  };

  if (!show) {
    return null;
  }

  return (
    <Dialog open={show} onClose={handleSkip}>
      <DialogTitle>
        <Typography variant="h6">Application Update</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Typography>
          A new version of the application is available.Choose Yes to reload and
          update
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSkip} variant="secondary">
          {Common.NO}
        </Button>
        <Button onClick={handleReload} variant="primary">
          {Common.YES}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdatePrompt;
