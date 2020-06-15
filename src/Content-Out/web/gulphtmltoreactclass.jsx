import React from 'react';

export default class Gulphtmltoreactclass extends React.Component {

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
<h1 id="gulp-html-to-react-class">Gulp HTML to React Class</h1>
<h2 id="file-conversion-tool">file conversion tool</h2>

</div>
        );
    }
}