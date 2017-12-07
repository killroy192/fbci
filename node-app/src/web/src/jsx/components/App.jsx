
import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Col } from 'antd';
import { HorizontalMenu } from './menu';
import { Footer } from './footer';
import { MarketOverView } from './market-overview/';
import 'styles/global.css';

const { Header, Content } = Layout;


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
                <Content className="container content">
                    <MarketOverView />
                </Content>
                <Content className="container content">
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
                </Content>
                <Content className="container content">
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
                </Content>
                <Footer />
            </Layout>
        );
    }
}
