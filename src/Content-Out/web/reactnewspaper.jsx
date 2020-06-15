import React from 'react';

export default class Reactnewspaper extends React.Component {

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
<h1 id="react-newspaper-website">React Newspaper Website</h1>
<h2 id="meta-project-documentation">meta project documentation</h2>

</div>
        );
    }
}