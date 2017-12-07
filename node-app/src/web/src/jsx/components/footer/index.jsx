import React from 'react';
import { Layout, Row, Col } from 'antd';
import { Link } from '../link/';

import './footer.css';

export class Footer extends React.Component {
    render() {
        return (
            <Layout.Footer className="container">
                <Row gutter={16}>
                    <Col span={12} className="tc">
                        <Row gutter={16} className="mbbig" >
                            <Link href="#" title="FBCI-20USD" />
                        </Row>
                        <Row gutter={16} className="mbbig" >
                            <Link href="#" title="FBCI-20BTC" />
                        </Row>
                        <Row gutter={16} className="mbbig" >
                            <Link href="#" title="FBCTI-50BTC" />
                        </Row>
                    </Col>
                    <Col span={12} className="tc">
                        <Row gutter={16} className="mbbig" >
                            <Link href="#" title="API" />
                        </Row>
                        <Row gutter={16} className="mbbig" >
                            <Link href="#" title="White Paper" />
                        </Row>
                        <Row gutter={16} className="mbbig" >
                            <Link href="#" title="F.A.Q" />
                        </Row>
                    </Col>
                </Row>
                <div className="tc sub-footer">
                    Bla Bla Bla
                </div>
            </Layout.Footer>
        );
    }
}
