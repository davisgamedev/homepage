import React from 'react';
import { DebugColorLog } from './DebugTools';
import { DebugList } from './DebugTools';
import WindowDimensions from './WindowDimensions';

export default function ParallaxHandler(props) {

    const {windowWidth, windowHeight} = WindowDimensions();

    const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

    function update() {
        const normal = window.scrollY/(document.body.offsetHeight - window.innerHeight);
        const mapped = map(normal, 0, 1, -25, -windowHeight + 25);
        //document.body.style.backgroundPosition = `0 ${(window.scrollY/max) * 100}%`;
        document.body.style.backgroundPosition = `0 ${Math.floor(mapped)}px`;
    }

    React.useEffect(
        () => {
            setInterval(update, 1000/60);
            return clearInterval(update);
        }
        , [true]);

    return(<div />);
}