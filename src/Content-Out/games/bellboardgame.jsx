import React from 'react';

export default class Bellboardgame extends React.Component {

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
<h1 id="victorian-board-game">Victorian Board Game</h1>
<h2 id="belle-of-the-ball-part-1">Belle of the Ball Part 1</h2>

</div>
        );
    }
}