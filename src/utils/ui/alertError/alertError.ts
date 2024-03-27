type TAlertType = 'success' | 'error';

const ALERT_STYLES: Record<TAlertType, { background: string }> = {
  success: {
    background: 'green',
  },
  error: {
    background: 'red',
  },
};

const showToast = (message: string, type: TAlertType) => {
  console.log('window.api', window.api);
  window.api.app.Toastify.showToast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      color: 'white',
      textAlign: 'center',
      position: 'fixed',
      padding: '8px',
      left: '0px',
      width: '100%',
      ...ALERT_STYLES[type],
    },
  });
};

export const alertError = (message: string) => {
  showToast(message, 'error');
};

export const alertSuccess = (message: string) => {
  showToast(message, 'success');
};
