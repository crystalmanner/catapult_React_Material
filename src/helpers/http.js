import axios from 'axios';
export const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const initHttp = (store, onUnAuthCb) => {
  axios.interceptors.request.use(config => {
    const {
      auth: { jwt }
    } = store.getState();

    config.headers = config.headers || {};
    if (jwt && !config.url.indexOf(BASE_URL)) {
      config.headers['Authorization'] = `Token ${jwt}`;
    }

    return config;
  });

  axios.interceptors.response.use(
    res => res,
    err => {
      const message = err.response && err.response.data.message;

      if (message === 'invalid-jwt') {
        onUnAuthCb();
      }

      return Promise.reject(err);
    }
  );
};

export const request = ({
  url,
  fullUrl,
  method = 'get',
  params = {},
  headers = {},
  body = {},
  formData,
  type = 'application/json',
  hasContentType = true,
  onUploadProgress
}) => {
  const baseUrl = BASE_URL;

  if (!url && !fullUrl) {
    return Promise.reject(new Error('Request URL is undefined'));
  }

  const urlParams = {
    ...params
  };
  const reqHeaders = {
    Accept: 'application/json',
    ...headers
  };

  if (hasContentType) {
    reqHeaders['Content-Type'] = type;
  }

  return axios({
    method,
    url: fullUrl || `${baseUrl}${url}`,
    data: formData || JSON.stringify(body),
    params: urlParams,
    headers: reqHeaders,
    onUploadProgress
  });
};
