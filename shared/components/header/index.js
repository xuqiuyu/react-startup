import React from 'react';
import { bool, string, func, number } from 'prop-types';
import { Button, Badge } from 'antd';

import * as style from './header.scss';
import User from '../user';

const envMap = {
  '': '',
  dev: '-开发环境',
  test: '-测试环境',
  pre: '-预发环境',
  prd: '-生产环境'
};

const Header = (props) => {
  const {
    isFold, userName, env, toggleMenu, navToIndex, navToMessageList, messageCount
  } = props;

  return (
    <article className={style.content}>
      <div className={style.btnContainer}>
        {/* <Button icon='home' onClick={navToIndex} /> */}
        <Button icon={isFold ? 'menu-unfold' : 'menu-fold'} onClick={toggleMenu} />
      </div>
      {/* <h1 className={style.headerText}>基础架构{envMap[env]}</h1> */}
      <div>
        <Badge count={messageCount}><Button icon='bell' onClick={navToMessageList} /></Badge>
        <User userName={userName} />
      </div>

    </article>
  );
};

Header.defaultProps = {
  messageCount: 0
};

Header.propTypes = {
  isFold: bool.isRequired,
  env: string.isRequired,
  userName: string.isRequired,
  toggleMenu: func.isRequired,
  navToIndex: func.isRequired,
  navToMessageList: func.isRequired,
  messageCount: number
};

export default Header;
