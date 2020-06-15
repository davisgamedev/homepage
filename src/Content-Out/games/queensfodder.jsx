import React from 'react';

export default class Queensfodder extends React.Component {

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
<h1 id="queens-fodder">Queen&#39;s Fodder</h1>
<h2 id="rhythmic-turnbased-game">Rhythmic Turnbased Game</h2>

</div>
        );
    }
}