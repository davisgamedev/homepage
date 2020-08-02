import React from 'react';
import WindowDimensions from './WindowDimensions';

import Scrollbar from 'react-smooth-scrollbar';

export function SmoothScrollAdapter(props) {

    const {windowWidth, windowHeight} = WindowDimensions();

    return(
    <Scrollbar
    damping={0.1}
    thumbMinSize={20}
    renderByPixels={true}
    alwaysShowTracks={false}
    continuousScrolling={true}
    >
        <div style={{
            width: windowWidth, 
            height: windowHeight}}
        >
            {props.children}
        </div>
    </Scrollbar>
    );

}