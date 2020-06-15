import React from 'react';

export default class Planetsweb extends React.Component {

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
<h1 id="procedural-planets---web">Procedural Planets - Web</h1>
<h2 id="3d-math-on-2d-html-canvas">3D math on 2D HTML canvas</h2>

</div>
        );
    }
}