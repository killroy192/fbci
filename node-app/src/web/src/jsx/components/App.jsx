
import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Breadcrumb } from 'antd';
import { HorizontalMenu } from "./menu";
const { Header, Content, Footer } = Layout;


export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            collapsed: false,
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        return (
            <Layout className="layout custom-layout">
                <Header className="custom-header">
                    <div className="container spb">
                        <div className="logo" />
                        <HorizontalMenu />
                    </div>
                </Header>
                <Content className="container content-block">
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
                </Content>
                <Content className="container content-block">
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
                </Content>
                <Content className="container content-block">
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
                </Content>
                <Footer style={{ textAlign: 'center' }} className="container">
                    Ant Design ©2016 Created by Ant UED
                </Footer>
            </Layout>
        );
    }
}
