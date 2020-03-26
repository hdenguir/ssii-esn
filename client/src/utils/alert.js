import { toast } from 'react-toastify';

export const setNotify = (error, status = 'error') => {
  if (status === 'success') {
    toast.success(error);
    return;
  }

  // Error
  if (error.response) {
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);

    const { errors } = error.response.data;
    if (errors) errors.forEach(err => toast.error(err.msg));
    return;
  } else if (error.request) {
    /*
     * The request was made but no response was received, `error.request`
     * is an instance of XMLHttpRequest in the browser and an instance
     * of http.ClientRequest in Node.js
     */
    toast.error(error.message);
    return;
  } else {
    // Something happened in setting up the request and triggered an Error
    toast.error(error.message);
    return;
  }
};
