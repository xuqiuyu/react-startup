import React from 'react';
import { notification, Button, Modal } from 'antd';

// import config from '../../config';
import { isSSOTimeOutResponse } from './ajax';
import { SHOW_TYPE } from '../common/constant';

const confirm = Modal.confirm;
const getCookie = (name) => {
  // when rendering this server side, there will be no "document" object.
  if (typeof document === 'undefined') {
    return null;
  }
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  const arr = document.cookie.match(reg);
  if (Array.isArray(arr) && arr.length > 0) {
    return arr[2];
  }
  return null;
};

// export const getLoginUserName = () => (getCookie(config.login.cookie.cookie4userName));
// export const getUserCName = () => (getCookie(config.login.cookie.cookie4userNameCN));
// export const ssoLogin = () => {
//   const redirect = encodeURIComponent(window.location.origin);
//   window.location.href = `http://${config.login.sso.host}${config.login.sso.loginUrl}?service=${config.login.sso.service}&target=${redirect}`;
// };

export const checkSSO = (loginSuccessCallback) => {
  const userName = getLoginUserName();
  const userCName = decodeURIComponent(getUserCName());
  if (userName) {
    loginSuccessCallback(userName, userCName);
  } else {
    ssoLogin();
  }
};

export const initQueryObject = (queryObj) => {
  queryObj.pageNum = 1;
  queryObj.pageSize = 10;
  queryObj.param = {};
  queryObj.extraInfo = {};
};

export const selectOptionMapping = (options) => {
  if (!options) {
    options = [];
  } else {
    options = options.map(item => ({
      key: `${item.value}`,
      value: item.name
    }));
  }
  return options;
};

export const dictToOptions = (dicts) => {
  const dictOptions = [];
  if (dicts) {
    dicts.forEach((item) => {
      dictOptions.push({ key: `${item.value}`, value: item.name });
    });
  }
  return dictOptions;
};

export const dictToMap = (dicts) => {
  const dictMap = new Map();
  if (dicts) {
    dicts.forEach((item) => {
      dictMap.set(`${item.value}`, item.name);
    });
  }
  return dictMap;
};

export function formatDate(date, format) {
  const paddNum = function (num) {
    num += '';
    return num.replace(/^(\d)$/, '0$1');
  };
  // 指定格式字符
  const cfg = {
    yyyy: date.getFullYear(), // 年 : 4位
    yy: date.getFullYear().toString().substring(2), // 年 : 2位
    M: date.getMonth() + 1, // 月 : 如果1位的时候不补0
    MM: paddNum(date.getMonth() + 1), // 月 : 如果1位的时候补0
    d: date.getDate(), // 日 : 如果1位的时候不补0
    dd: paddNum(date.getDate()), // 日 : 如果1位的时候补0
    hh: paddNum(date.getHours()), // 时
    mm: paddNum(date.getMinutes()), // 分
    ss: paddNum(date.getSeconds()) // 秒
  };
  format || (format = 'yyyy-MM-dd hh:mm:ss');
  return format.replace(/([a-z])(\1)*/ig, m => cfg[m]);
}

export function getSort(field, sort) {
  if (!field || !sort) {
    return null;
  }
  return {
    sort: [{
      direction: sort === 'ascend' ? 'ASC' : 'DESC',
      property: field
    }]
  };
}

export const showSuccess = (msg) => {
  notification.success({
    message: '请求成功',
    description: msg,
    duration: 3
  });
};

export const showError = (err) => {
  if (isSSOTimeOutResponse(err)) {
    const btn = (
      <a href='/index' target='_blank'>
        <Button type='primary' size='small'>
           重新登录
        </Button>
      </a>
    );
    notification.error({
      message: '请求失败',
      description: 'sso登录过期，请重新登录',
      btn,
      duration: 40
    });
  } else {
    notification.error({
      message: '请求失败',
      description: err,
      duration: 20
    });
  }
};

export const opaConfirm = (title, content, onOk) => {
  confirm({
    title,
    content,
    onOk,
    onCancel() {}
  });
};
export const checkAuthorization = (authKey, authInfo) => {
  if (!authInfo || !authKey) {
    return false;
  }
  const authKeys = authKey.split('.');
  let innerAuthInfo = authInfo;
  for (let i = 0; i < authKeys.length; ++i) {
    innerAuthInfo = innerAuthInfo[authKeys[i]];
    if (!innerAuthInfo || !innerAuthInfo._key_authorization) {
      return false;
    }
  }
  return true;
};

// 动态设置COUPLESELECT类型字段的coupleKey
export const setCoupleKey = (objArr, valueObj, notUseDefault) => {
  objArr.forEach((item) => {
    if (item.showType === SHOW_TYPE.COUPLESELECT && item.reduxKey && item.reduxKey !== '') {
      item.coupleKey = valueObj[item.reduxKey];
      if (!item.coupleKey && !notUseDefault) item.coupleKey = item.defaultCoupleKey;
      const couples = item.couples;
      if (couples) {
        const keyArr = Object.keys(couples);
        keyArr.forEach((key) => {
          if (couples[key] && Array.isArray(couples[key])) {
            setCoupleKey(couples[key], valueObj);
          }
        });
      }
    }
  });
};

// 为了避免antd design form表单中同名字段动态切换问题 新增一个key包装器方法
export const keyWrapper = key => `${key}__ZA__${Date.now()}`;
// 针对keyWrapper 解析真实的key
export const keyUnWrapper = (key) => {
  const index = key.indexOf('__ZA__');
  return index === -1 ? key : key.substring(0, index);
};
// formValues filter 将keyWrapper替换成真实的key
export const formValuesFilter = (values) => {
  for (const key in values) {
    if (key.indexOf('__ZA__') !== -1) {
      const value = values[key];
      values[keyUnWrapper(key)] = value;
      delete values[key];
    }
  }
};
