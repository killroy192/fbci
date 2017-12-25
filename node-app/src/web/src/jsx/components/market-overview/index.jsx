import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { Advice } from './Advice';

import './market-overview.css';
import 'styles/global.css';


const mockedDate = {
    FBCI20USD: {
        name: 'FBCI20USD',
        value: 1300,
        change: 15,
    },
    FBCI20BTC: {
        name: 'FBCI20BTC',
        value: 1234,
        change: -13,
    },
    FBCTI50: {
        name: 'FBCTI50',
        value: 843,
        change: -27,
    },
};

export class MarketOverView extends React.Component {

    render() {
        return (
            <div className="content-block market-overview">
                <div className="box-tittle">
                    <h1 className="title_left">
                        Market Overview
                    </h1>
                    <p>
                        updated - <span className="recalc-date">{this.props.recalcDate || '08/13'}</span>
                    </p>
                </div>
                <Row className="market-status-information">
                    <Col span={6}>
                        {/* <IndexDate date={this.props.data || mockedDate.FBCI20USD}></IndexDate> */}
                    </Col>
                    <Col span={6}>
                        {/* <IndexDate date={this.props.data || mockedDate.FBCI20BTC}></IndexDate> */}
                    </Col>
                    <Col span={6}>
                        {/* <IndexDate date={this.props.data || mockedDate.FBCTI50}></IndexDate> */}
                    </Col>
                    <Col span={6}>
                        <Advice date={this.props.data || mockedDate} />
                    </Col>
                </Row>
            </div>
        );
    }
}
