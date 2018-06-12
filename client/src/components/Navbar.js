import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu, Avatar, Dropdown, Card, Icon } from 'antd';
const { Header } = Layout;

class Navbar extends Component {
  renderSignOut() {
    const {
      currentUser: { isFetching, auth }
    } = this.props;
    if (!isFetching && typeof auth === 'object') {
      const firstName = auth.userName.split(' ')[0];
      const menu = (
        <Menu>
          <Menu.Item className="m-0 p-0" key="1">
            <Card
              title={`Hello, ${firstName.toUpperCase()}`}
              bordered={false}
              style={{ width: '100%' }}
            >
              <Link to="/settings/profile">
                <p>
                  <Icon type="setting" /> Settings{' '}
                </p>
              </Link>
              <a href="/api/logout" className="text-danger">
                <i className="fas fa-power-off" /> Log Out
              </a>
            </Card>
          </Menu.Item>
        </Menu>
      );
      console.log(this.props.currentUser);
      return (
        <div className="align-middle">
          <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
            {auth.avatar ? (
              <Avatar src={auth.avatar} size="large" />
            ) : (
              <Avatar size="large" style={{ backgroundColor: '#26b2a4' }}>
                {firstName.toUpperCase()}
              </Avatar>
            )}
          </Dropdown>
        </div>
      );
    } else {
      return null;
    }
  }

  greetUser() {
    const {
      currentUser: { isFetching, auth }
    } = this.props;
    const style = {
      font: {
        color: 'white'
      },
      greet: {
        marginLeft: '20px'
      }
    };
    console.log(this.props.currentUser);
    if (!isFetching && typeof auth === 'object') {
      return (
        <Menu.Item style={style.greet}>
          WELCOME, {auth.userName.toUpperCase()}
        </Menu.Item>
      );
    } else {
      return (
        <Menu.Item>
          <Link to="/" style={style.font}>
            REAL ESTATE APP
          </Link>
        </Menu.Item>
      );
    }
  }

  render() {
    const style = {
      menu: {
        lineHeight: '64px'
      }
    };
    return (
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" style={style.menu}>
          {this.greetUser()}
          <Menu.Item className="float-right">{this.renderSignOut()}</Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default Navbar;
