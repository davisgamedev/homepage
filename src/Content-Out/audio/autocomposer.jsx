import React from 'react';

export default class Autocomposer extends React.Component {

    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    loadMedia() {
        if(this.ref.current) {
            this.ref.current.querySelectorAll('[data-src]').forEach(e => {
                e.src = e['data-src'];
            });
        }
    }

    render() {
        return (
<div ref={this.ref} loadable-media-container="true">
<h1 id="java-processing-auto--composer">Java Processing Auto -composer</h1>
<h2 id="an-experminent-in-procedural-composition">An Experminent in Procedural Composition</h2>

</div>
        );
    }
}