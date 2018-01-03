import React from 'react';
import { string } from 'prop-types';
import { Button, Dropdown, Menu, Icon } from 'antd';

const User = (props) => {
  const { userName } = props;

  const menu = (
    <Menu>
      <Menu.Item key='logout'><a href='/api/logout'><Icon type='logout' />  注销</a></Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Button>
        <Icon type='user' />{userName} <Icon type='down' />
      </Button>
    </Dropdown>
  );
};

User.defaultProps = {
  userName: ''
};

User.propTypes = {
  userName: string
};

export default User;
