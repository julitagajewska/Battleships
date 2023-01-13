import React from 'react';
import './Overlay.css';

export default function Overlay({ children }) {
    return (
        <div className="overlay">
            {children}
        </div>
    )
}
