import React, { Component as C } from 'react';
import { object, func, bool } from 'prop-types';
import { Icon, Menu } from 'antd';

import * as style from './aside.scss';
import { menus } from '../../menu';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;


class Aside extends C {
  constructor() {
    super();
    this.matchMenuWithAuthInfo = this.matchMenuWithAuthInfo.bind(this);
    this.generateMenu = this.generateMenu.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    // 如果authinfo不变 就不重新渲染
    return !(this.props.authInfo === nextProps.authInfo && this.props.isFold === nextProps);
  }

  matchMenuWithAuthInfo(_menus, authInfo) {
    const menu = [];
    const { isFold } = this.props;
    if (!authInfo || !authInfo._key_authorization) {
      return (<MenuItem>菜单test ...</MenuItem>);
    }
    _menus.forEach((item) => {
      if (item.key === 'index') {
        menu.push(<MenuItem key={item.key}><span><Icon type={item.icon} /> 首页</span></MenuItem>);
        return;
      }
      const authLevel1 = authInfo[item.key];
      if (authLevel1 && authLevel1._key_authorization) {
        if (item.child && item.child.length > 0) {
          const subMenu = [];
          item.child.forEach((subItem) => {
            const authLevel2 = authLevel1[subItem.key];
            if (authLevel2 && authLevel2._key_authorization) {
              if (subItem.child && subItem.child.length > 0) {
                // TODO 三级目录
              } else {
                subMenu.push(<MenuItem key={subItem.key}>{subItem.name}</MenuItem>);
              }
            }
          });
          if (isFold) {
            menu.push(
              <SubMenu
                className={style.menuItemMargin}
                key={item.key}
                title={<Icon type={item.icon} className={style.iconMargin} />}
              >
                {subMenu}
              </SubMenu>
            );
          } else {
            menu.push(
              <SubMenu
                key={item.key}
                title={<span><Icon type={item.icon} /> {item.name}</span>}
              >
                {subMenu}
              </SubMenu>
            );
          }
        } else {
          menu.push(<MenuItem key={item.key}>{item.name}</MenuItem>);
        }
      }
    });

    return menu;
  }

  generateMenu(authInfo) {
    let menu = (<MenuItem>Loading</MenuItem>);
    if (authInfo) {
      menu = this.matchMenuWithAuthInfo(menus, authInfo);
    }
    // debugger;
    return menu;
  }

  render() {
    const { authInfo, menuClick, isFold } = this.props;

    let selectedMenu = '';
    let subMenu = '';

    if (typeof location !== 'undefined') {
      let url = location.href;
      selectedMenu = url.substr(url.lastIndexOf('/') + 1);
      url = url.substr(0, url.lastIndexOf('/'));
      subMenu = url.substr(url.lastIndexOf('/') + 1);
    }

    return (
      <section>
        <img
          style={{ width: '50px', marginTop: '-20px', marginLeft: '10px' }}
          src='https://preview.pro.ant.design/static/logo.b29324c4.svg'
          alt=''
        />
        <Menu theme='dark' mode={isFold ? 'vertical' : 'inline'} onClick={menuClick} defaultSelectedKeys={[selectedMenu]} defaultOpenKeys={[subMenu]}>
          {this.generateMenu(authInfo)}
        </Menu>

      </section>
    );
  }
}

Aside.defaultProps = {
  authInfo: {},
  menuClick: () => {},
  isFold: false
};

Aside.propTypes = {
  authInfo: object,
  menuClick: func,
  isFold: bool
};

export default Aside;
