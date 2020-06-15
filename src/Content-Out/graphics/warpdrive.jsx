import React from 'react';

export default class Warpdrive extends React.Component {

    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    loadMedia() {
        if(this.ref.current) {
            this.ref.current.querySelectorAll('[data-src]').forEach(e => {
                e.setAttribute('src', e.getAttribute('data-src'));
            });
        }
    }

    render() {
        return (
<div ref={this.ref} loadable-media-container="true">
<h1 id="warpdrive-webgl-animation">WarpDrive WebGL Animation</h1>
<h2 id="an-exploration-in-vanilla-webgl">an exploration in vanilla webgl</h2>

</div>
        );
    }
}