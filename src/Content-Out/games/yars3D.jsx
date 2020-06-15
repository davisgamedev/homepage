import React from 'react';

export default class Yars3D extends React.Component {

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
<h1 id="yars3d">Yars3D</h1>
<h2 id="a-remake-of-yars-revenge-in-opengl">A Remake of Yar&#39;s Revenge in OpenGL</h2>

</div>
        );
    }
}