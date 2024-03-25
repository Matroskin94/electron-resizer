const Toastify = require('toastify-js');

export const app = {
  Toastify: {
    showToast: (options: Toastify.Options) => Toastify(options).showToast(),
  },
};
