import React from 'react';

import * as style from './style.scss';

const Footer = () => (
  <div className={style.footer}>
    基础架构版权所有 © 2015-{(new Date()).getFullYear() + 1}
  </div>
);

export default Footer;
