import React from 'react';

export default class Aquaticgame extends React.Component {

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
<h1 id="untitled-submarine-game">Untitled Submarine Game</h1>
<h2 id="ambience-for-an-underwater-game">Ambience for an underwater game</h2>

</div>
        );
    }
}