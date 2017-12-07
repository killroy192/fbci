import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import './market-overview.css';
import 'styles/global.css';

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
                        <IndexDate date={this.props.date || mockedDate.FBCI20USD}></IndexDate>
                    </Col>
                    <Col span={6}>
                        <IndexDate date={this.props.date || mockedDate.FBCI20USD}></IndexDate>
                    </Col>
                    <Col span={6}>
                        <IndexDate date={this.props.date || mockedDate.FBCI20USD}></IndexDate>
                    </Col>
                    <Col span={6}>
                        <Advice date={this.props.date || mockedDate} />
                    </Col>
                </Row>
            </div>
        );
    }
}