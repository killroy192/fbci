import React from 'react';
import PropTypes from 'prop-types';
import helpers from './helpers';
import './market-overview.css';
import 'styles/global.css';

export class Advice extends React.Component {

    render() {
        const currentAdvice = helpers.getAdvice(this.props.data);
        return (
            <div className="charts-say-link">
                <div className="consensus-box">
                    <div className="charts-say-container tc">
                        <h4 style={{ color: '#666666' }}>Charts Say</h4>
                        <h4 style={{ color: '#1a9a92' }} className="consensus-word">{currentAdvice.msg}</h4>
                    </div>
                </div>
            </div>
        );
    }
}
