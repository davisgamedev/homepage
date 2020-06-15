import React from 'react';

export default class Planetsthreejs extends React.Component {

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
<h1 id="procedural-planets---threejs">Procedural Planets - ThreeJS</h1>
<h2 id="procedural-textures-with-threejs">procedural textures with ThreeJS</h2>

</div>
        );
    }
}