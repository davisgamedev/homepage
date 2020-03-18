import React from 'react';

import HeaderHeight from '../Tech/HeaderHeight';
import DebugLog from '../Tech/DebugLog';

export default function Spacer(props) {

    const height = HeaderHeight();
    
    return (
        <div style={{minHeight: height}}></div>
    );

}