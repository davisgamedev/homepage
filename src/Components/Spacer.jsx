import React from 'react';

import HeaderHeight from '../Tech/HeaderHeight';
export default function Spacer(props) {

    const height = HeaderHeight();
    
    return (
        <div style={{minHeight: height}}></div>
    );
}