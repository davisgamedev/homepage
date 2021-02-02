import React from 'react';
import WindowDimensions from './WindowDimensions';
import HeaderHeight from './HeaderHeight';

import Scrollbar from 'react-smooth-scrollbar';
import SmoothScrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';

SmoothScrollbar.use(OverscrollPlugin);

export function SmoothScrollAdapter(props) {

    const {windowWidth, windowHeight} = WindowDimensions();
    const height = HeaderHeight();

    const containerWidth = props.width || windowWidth;
    const containerHeight = props.height || (windowHeight - (props.noCompensate? 0 : height));

    return(
    <Scrollbar
    damping={0.15}
    thumbMinSize={50}
    renderByPixels={true}
    alwaysShowTracks={false}
    continuousScrolling={true}
    >
        <div style={{
            width: containerWidth, 
            height: containerHeight}}
        >
            {props.children}
        </div>
    </Scrollbar>
    );

}