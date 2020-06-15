import React from 'react';

export default class KoCDemos extends React.Component {

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
<h1 id="koc-demos">KoC Demos</h1>
<h2 id="class-materials-for-instructing-java-game-design">Class materials for instructing Java game design</h2>

</div>
        );
    }
}