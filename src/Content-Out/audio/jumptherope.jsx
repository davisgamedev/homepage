import React from 'react';

export default class Jumptherope extends React.Component {

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
<h1 id="jump-the-rope-minigame">Jump The Rope Minigame</h1>
<h2 id="directx-graphics-and-audio-showcase">DirectX Graphics and Audio Showcase</h2>

</div>
        );
    }
}