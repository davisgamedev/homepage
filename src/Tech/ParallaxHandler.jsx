import React from 'react';

export default function ParallaxHandler(props) {

    function update() {
        const max = document.innerHeight - window.innerHeight;
        document.body.style.backgroundPosition = `0 ${(window.scrollY/max) * 100}%`;
    }

    React.useEffect(update, [window.scrollY]);

    return(<div />);
}