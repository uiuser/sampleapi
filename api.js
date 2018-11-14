import axios from 'axios';

const axiosInstane =  axios.create({
  baseURL: `http://www.jaggerybook.com/api/`
});



// Add a request interceptor
export const reqInterceptor = function (config) {
    // get the bearer token and add it in the header
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        throw new Error('attempt to load data without bearer token');
    }
    config.headers = Object.assign({}, config.headers, createTokenHeaders(accessToken));
    return config;
};

axiosInstane.interceptors.request.use(reqInterceptor);


export const createTokenHeaders = (accessToken) => {
    return {
        authorization: `Bearer ${accessToken}`
    };
};

export const performGet = (uri, queryParams = {}) => {
  const requestParams = {
    params: queryParams,
  };
  return axiosInstane.get(uri, requestParams);
};

export const performPost = (uri, postPayload = {}) => {
  const requestParams = {};
  return axiosInstane.post(uri, postPayload, requestParams);
};

export const performPut = (uri, putPayload = {}) => {
  const requestParams = {};
  return axiosInstane.put(uri, putPayload, requestParams);
};

export const performPatch = (uri, patchPayload = {}) => {
  const requestParams = {};
  return axiosInstane.patch(uri, patchPayload, requestParams);
};

export default  {
  get: (uri, queryParams = {}) => {
    return performGet(uri, queryParams);
  },
  post: (uri, postPayload = {}) => {
    return performPost(uri, postPayload);
  },

  put: (uri, putPayload = {}) => {
    return performPut(uri, putPayload);
  },

  patch: (uri, patchPayload ={}) => {
    return performPatch(uri, patchPayload);
  }


}
