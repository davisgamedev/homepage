import React from 'react';

export default class Planetsprocessing extends React.Component {

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
<h1 id="procedural-planets---processing">Procedural Planets - Processing</h1>
<h2 id="an-exploration-in-procedural-generation">an exploration in Procedural Generation</h2>

</div>
        );
    }
}