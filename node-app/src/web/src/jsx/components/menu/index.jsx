import React from 'react';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

export class HorizontalMenu extends React.Component {
    render() {
        return (
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.props.current] || ['1']}
              mode="horizontal"
              theme="dark"
              style={{ lineHeight: '64px' }}
            >
                <SubMenu
                  key="sub1"
                  title={<span><Icon type="area-chart" /><span>Indexes</span></span>}
                >
                    <Menu.Item key="1">FBCI-20USD</Menu.Item>
                    <Menu.Item key="2">FBCI-20BTC</Menu.Item>
                    <Menu.Item key="3">FBCTI-50BTC</Menu.Item>
                </SubMenu>
                <Menu.Item key="4">
                    <Icon type="api" />
                    <span>API</span>
                </Menu.Item>
                <Menu.Item key="5">
                    <Icon type="book" />
                    <span>White Paper</span>
                </Menu.Item>
                <Menu.Item key="6">
                    <Icon type="question-circle-o" />
                    <span>F.A.Q</span>
                </Menu.Item>
                <Menu.Item key="7">
                    <Icon type="idcard" />
                    <span>About</span>
                </Menu.Item>
            </Menu>
        );
    }
}
