import React from 'react';
import './link.css';

export class Link extends React.Component {
    render() {
        const linkClasses = this.props.className ? `link ${this.props.className}` : 'link';
        return (
            <a href={this.props.href || '#'} className={linkClasses}>
                {this.props.children || this.props.title || ''}
            </a>
        );
    }
};
