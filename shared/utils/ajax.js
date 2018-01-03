// wrap super agent, it provide easy implementation for service

import request from 'superagent';

// import config from '../../config';

const isSSOTimeOutResponse = body => body && (body instanceof Object) && body.success === false && body.errorCode === -1000;

function ajax(options) {
  const defaults = {
    host: null,
    path: null,
    type: 'post',
    data: {},
    'Content-Type': 'application/json'
  };

  options = Object.assign({}, defaults, options);
  // server render first screen
  // domain is required for node http request
  const isNode = typeof window === 'undefined';
  if (isNode && options.host === null) {
    // options.url = config.Local.domain + options.path;
    options.url = '';
  } else {
    options.url = options.host === null ? options.path : options.host + options.path;
  }


  const promise = request[options.type](options.url).withCredentials();

  // set super agent request header
  Object.keys(options).forEach((key) => {
    if (!key.match(/url|type|data/)) {
      promise.set(key, options[key]);
    }
  });

  // set super agent timeout
  promise.timeout({
    response: 10000,
    deadline: 60000
  });

  return new Promise((resolve, reject) => {
    promise.send(options.data).then((res) => {
      if (isSSOTimeOutResponse(res.body)) {
        reject(res.body);
      } else {
        resolve(res.body);
      }
    }).catch((err) => {
      reject(err.toString());
    });
  });
}

const get = path => ajax({
  path,
  type: 'get'
});

const post = (path, data, contentType) => ajax({
  path,
  data,
  type: 'post',
  'Content-Type': contentType
});

export default {
  isSSOTimeOutResponse,
  ajax,
  get,
  post
};
