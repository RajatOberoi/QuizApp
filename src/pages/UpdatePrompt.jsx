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
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swScriptUrl, registration) {
      console.log(swScriptUrl, 'url script', registration, 'registration');
    },
    onRegisterError(error) {
      console.log(error, 'error during registration');
    },
    onNeedRefresh() {
      setNeedRefresh(true);
    },
  });

  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   const intervalId = setInterval(async () => {
  //     console.log('Checking for new PWA version...');
  //     try {
  //       // Get the service worker registration
  //       const registration = await navigator.serviceWorker.getRegistration();
  //       console.log(registration, 'navigator registration');
  //       if (registration) {
  //         // Manually trigger the update check
  //         await registration.update();
  //       } else {
  //         console.warn('No service worker registration found.');
  //       }
  //     } catch (error) {
  //       console.error('Error checking for PWA update:', error);
  //     }
  //   }, PWA_CHECK_INTERVAL);

  //   // Clear the interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, []);
  console.log(needRefresh, 'need refresh');
  // ### 2. ROBUST SKIP & PROMPT LOGIC ###
  // This effect determines whether to show the prompt
  useEffect(() => {
    if (needRefresh) {
      // Check sessionStorage to see if the user has already skipped this update
      const isUpdateSkipped =
        sessionStorage.getItem('updateSkipped') === 'true';
      // Show the prompt if not skipped
      if (!isUpdateSkipped) {
        setShow(true);
      }
    }
  }, [needRefresh]);

  // ### 3. USER ACTIONS (RELOAD / SKIP) ###
  /**
   * Called when the user clicks the "Reload" button.
   * Installs the new service worker and reloads the page.
   */
  const handleReload = () => {
    updateServiceWorker(true);
  };

  /**
   * Called when the user clicks the "Skip" button.
   * Hides the prompt and marks the update as skipped for the session.
   */
  const handleSkip = () => {
    sessionStorage.setItem('updateSkipped', 'true');
    setShow(false);
  };

  if (!show) {
    return null;
  }

  return (
    <Dialog open={show} onClose={handleSkip}>
      <DialogTitle>Update Available</DialogTitle>
      <DialogContent>
        A new version is available. Reload to update?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReload} color="primary">
          Reload
        </Button>
        <Button onClick={handleSkip} color="secondary">
          Skip
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdatePrompt;
