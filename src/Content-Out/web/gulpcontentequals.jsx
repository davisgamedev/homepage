import React from 'react';

export default class Gulpcontentequals extends React.Component {

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
<h1 id="gulp-content--equals">Gulp Content- Equals</h1>
<h2 id="file-comparison-and-branching-in-gulp-tasks">file comparison and branching in gulp tasks</h2>

</div>
        );
    }
}