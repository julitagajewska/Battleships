import React, { Children } from 'react';
import './ButtonOverview.css';

export default function ButtonOverview(props) {
    return (
        <button className="button-overview">
            <div className="button-content" style={{ backgroundColor: props.color }}>
                {props.children}
            </div>
        </button>
    )
}
