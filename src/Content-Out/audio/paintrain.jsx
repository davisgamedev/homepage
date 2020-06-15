import React from 'react';

export default class Paintrain extends React.Component {

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
<h1 id="pain-train-the-final-heist">Pain Train: The Final Heist</h1>
<h2 id="western-space-jazz-for-a-mobile-arg">Western Space Jazz For a Mobile ARG</h2>

</div>
        );
    }
}